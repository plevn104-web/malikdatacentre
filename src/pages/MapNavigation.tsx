import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import {
  MapPin, Navigation, Car, Footprints, Bike, Bus,
  ChevronDown, ChevronUp, LocateFixed, Layers, ArrowLeftRight,
  X, Clock, Route, Copy, ExternalLink, AlertTriangle, Loader2,
  RotateCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ── Business location ──────────────────────────────────
const BUSINESS = {
  name: "Malik Data Centre",
  address: "Lahore, Punjab, Pakistan",
  lat: 31.5204,
  lng: 74.3587,
  phone: "+92 300 0000000",
};

// ── Types ──────────────────────────────────────────────
type TravelMode = "driving" | "walking" | "cycling" | "transit";

interface RouteStep {
  instruction: string;
  distance: string;
  duration: string;
}

interface RouteInfo {
  distance: string;
  duration: string;
  steps: RouteStep[];
  geometry: [number, number][];
}

// ── OSRM profile mapping ──────────────────────────────
const osrmProfile: Record<TravelMode, string> = {
  driving: "car",
  walking: "foot",
  cycling: "bike",
  transit: "car",
};

const travelModes: { mode: TravelMode; label: string; icon: React.ReactNode }[] = [
  { mode: "driving", label: "Drive", icon: <Car className="h-4 w-4" /> },
  { mode: "walking", label: "Walk", icon: <Footprints className="h-4 w-4" /> },
  { mode: "cycling", label: "Bike", icon: <Bike className="h-4 w-4" /> },
  { mode: "transit", label: "Transit", icon: <Bus className="h-4 w-4" /> },
];

// ── Helpers ────────────────────────────────────────────
const formatDuration = (seconds: number) => {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  return rem > 0 ? `${hrs}h ${rem}m` : `${hrs}h`;
};

const formatDistance = (meters: number) => {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
};

const decodePolyline = (encoded: string): [number, number][] => {
  const points: [number, number][] = [];
  let index = 0, lat = 0, lng = 0;
  while (index < encoded.length) {
    let b, shift = 0, result = 0;
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    lat += (result & 1) ? ~(result >> 1) : (result >> 1);
    shift = 0; result = 0;
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    lng += (result & 1) ? ~(result >> 1) : (result >> 1);
    points.push([lat / 1e5, lng / 1e5]);
  }
  return points;
};

// ── Route cache (sessionStorage, 5 min TTL) ───────────
const ROUTE_CACHE_KEY = "map_route_cache";
const LOCATION_CACHE_KEY = "map_user_location";

function getCachedRoute(key: string): RouteInfo | null {
  try {
    const cache = JSON.parse(sessionStorage.getItem(ROUTE_CACHE_KEY) || "{}");
    if (cache[key] && Date.now() - cache[key].ts < 5 * 60 * 1000) return cache[key].data;
  } catch {}
  return null;
}

function setCachedRoute(key: string, data: RouteInfo) {
  try {
    const cache = JSON.parse(sessionStorage.getItem(ROUTE_CACHE_KEY) || "{}");
    cache[key] = { data, ts: Date.now() };
    sessionStorage.setItem(ROUTE_CACHE_KEY, JSON.stringify(cache));
  } catch {}
}

function getCachedLocation(): { lat: number; lng: number } | null {
  try {
    const loc = JSON.parse(localStorage.getItem(LOCATION_CACHE_KEY) || "null");
    if (loc && Date.now() - loc.ts < 10 * 60 * 1000) return { lat: loc.lat, lng: loc.lng };
  } catch {}
  return null;
}

function setCachedLocation(lat: number, lng: number) {
  try { localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify({ lat, lng, ts: Date.now() })); } catch {}
}

// ── Debounce hook ─────────────────────────────────────
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ── Custom marker icons ────────────────────────────────
const createIcon = (color: string) =>
  L.divIcon({
    className: "",
    html: `<div style="width:36px;height:36px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 4px 14px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
    </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });

const businessIcon = createIcon("hsl(189 100% 40%)");
const userIcon = createIcon("hsl(263 70% 50%)");

// ── Geocode via Nominatim ──────────────────────────────
async function geocode(query: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
    const data = await res.json();
    if (data.length > 0) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    return null;
  } catch { return null; }
}

// ── Fetch route from OSRM (with cache) ────────────────
async function fetchRoute(
  start: { lat: number; lng: number },
  end: { lat: number; lng: number },
  mode: TravelMode
): Promise<RouteInfo | null> {
  const cacheKey = `${start.lat.toFixed(4)},${start.lng.toFixed(4)}-${end.lat.toFixed(4)},${end.lng.toFixed(4)}-${mode}`;
  const cached = getCachedRoute(cacheKey);
  if (cached) return cached;

  try {
    const profile = osrmProfile[mode];
    const url = `https://router.project-osrm.org/route/v1/${profile}/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=polyline&steps=true`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.code !== "Ok" || !data.routes?.length) return null;
    const route = data.routes[0];
    const geometry = decodePolyline(route.geometry);
    const steps: RouteStep[] = route.legs[0].steps.map((s: any) => ({
      instruction: s.maneuver?.type
        ? `${s.maneuver.type.replace(/_/g, " ")}${s.name ? ` onto ${s.name}` : ""}`
        : s.name || "Continue",
      distance: formatDistance(s.distance),
      duration: formatDuration(s.duration),
    }));
    const result: RouteInfo = {
      distance: formatDistance(route.distance),
      duration: formatDuration(route.duration),
      steps,
      geometry,
    };
    setCachedRoute(cacheKey, result);
    return result;
  } catch { return null; }
}

// ── Tile layers ───────────────────────────────────────
const TILE_DARK = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_SAT = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const TILE_LABELS = "https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png";

// ══════════════════════════════════════════════════════
// COMPONENT
// ══════════════════════════════════════════════════════
const MapNavigation = () => {
  const isMobile = useIsMobile();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const routeLayer = useRef<L.Polyline | null>(null);
  const routeGlow = useRef<L.Polyline | null>(null);
  const userMarker = useRef<L.Marker | null>(null);
  const darkLayer = useRef<L.TileLayer | null>(null);
  const satLayer = useRef<L.TileLayer | null>(null);
  const labelsLayer = useRef<L.TileLayer | null>(null);

  const [mapReady, setMapReady] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState<TravelMode>("driving");
  const [startInput, setStartInput] = useState("");
  const [destInput, setDestInput] = useState(BUSINESS.address);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locPermission, setLocPermission] = useState<"granted" | "denied" | "pending">("pending");
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isSatellite, setIsSatellite] = useState(false);

  const debouncedStart = useDebounce(startInput, 400);
  const debouncedDest = useDebounce(destInput, 400);

  // ── Init map ────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [BUSINESS.lat, BUSINESS.lng],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    L.control.zoom({ position: "topright" }).addTo(map);
    L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);

    // Dark tile layer (default)
    darkLayer.current = L.tileLayer(TILE_DARK, {
      attribution: '&copy; <a href="https://carto.com">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      maxZoom: 20,
    }).addTo(map);

    // Satellite layer (hidden by default)
    satLayer.current = L.tileLayer(TILE_SAT, {
      attribution: "&copy; Esri",
      maxZoom: 19,
    });

    // Labels overlay for satellite
    labelsLayer.current = L.tileLayer(TILE_LABELS, {
      attribution: '&copy; CARTO',
      maxZoom: 20,
      pane: "overlayPane",
    });

    // Business marker
    L.marker([BUSINESS.lat, BUSINESS.lng], { icon: businessIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family:system-ui;min-width:180px;padding:4px 0">
          <strong style="font-size:14px;color:#0ff">${BUSINESS.name}</strong><br/>
          <span style="font-size:12px;color:#999">${BUSINESS.address}</span><br/>
          <span style="font-size:12px;color:#999">${BUSINESS.phone}</span>
        </div>
      `);

    mapInstance.current = map;

    // Small delay to ensure tiles start loading
    setTimeout(() => setMapReady(true), 800);

    return () => { map.remove(); mapInstance.current = null; };
  }, []);

  // ── Toggle satellite ────────────────────────────
  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !mapReady) return;

    if (isSatellite) {
      if (darkLayer.current) map.removeLayer(darkLayer.current);
      if (satLayer.current && !map.hasLayer(satLayer.current)) satLayer.current.addTo(map);
      if (labelsLayer.current && !map.hasLayer(labelsLayer.current)) labelsLayer.current.addTo(map);
    } else {
      if (satLayer.current) map.removeLayer(satLayer.current);
      if (labelsLayer.current) map.removeLayer(labelsLayer.current);
      if (darkLayer.current && !map.hasLayer(darkLayer.current)) darkLayer.current.addTo(map);
    }
  }, [isSatellite, mapReady]);

  // ── Request geolocation ─────────────────────────
  const requestLocation = useCallback(() => {
    // Check cache first
    const cached = getCachedLocation();
    if (cached) {
      setUserLocation(cached);
      setLocPermission("granted");
      setStartInput("My Location");
      if (mapInstance.current) {
        if (userMarker.current) userMarker.current.remove();
        userMarker.current = L.marker([cached.lat, cached.lng], { icon: userIcon })
          .addTo(mapInstance.current)
          .bindPopup("You are here");
      }
    }

    if (!navigator.geolocation) { setLocPermission("denied"); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setLocPermission("granted");
        setStartInput("My Location");
        setCachedLocation(loc.lat, loc.lng);
        if (mapInstance.current) {
          if (userMarker.current) userMarker.current.remove();
          userMarker.current = L.marker([loc.lat, loc.lng], { icon: userIcon })
            .addTo(mapInstance.current)
            .bindPopup("You are here");
        }
      },
      () => setLocPermission("denied"),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  useEffect(() => { if (mapReady) requestLocation(); }, [mapReady, requestLocation]);

  // ── Recenter ────────────────────────────────────
  const recenter = () => {
    const map = mapInstance.current;
    if (!map) return;
    const target = userLocation || { lat: BUSINESS.lat, lng: BUSINESS.lng };
    map.flyTo([target.lat, target.lng], 15, { duration: 1.2 });
  };

  // ── Get directions ──────────────────────────────
  const getDirections = async (modeOverride?: TravelMode) => {
    const mode = modeOverride || selectedMode;
    setError(null);
    setLoading(true);
    setRouteInfo(null);

    let start: { lat: number; lng: number } | null = null;
    if (startInput === "My Location" && userLocation) {
      start = userLocation;
    } else if (startInput.trim()) {
      start = await geocode(startInput);
    }

    let end: { lat: number; lng: number } | null = null;
    if (destInput === BUSINESS.address) {
      end = { lat: BUSINESS.lat, lng: BUSINESS.lng };
    } else if (destInput.trim()) {
      end = await geocode(destInput);
    }

    if (!start) { setError("Could not find starting location. Try a different address."); setLoading(false); return; }
    if (!end) { setError("Could not find destination. Try a different address."); setLoading(false); return; }

    const route = await fetchRoute(start, end, mode);
    if (!route) { setError("Could not calculate route. Try a different mode or address."); setLoading(false); return; }

    setRouteInfo(route);
    setPanelOpen(true);

    // Draw route on map
    if (mapInstance.current) {
      if (routeGlow.current) routeGlow.current.remove();
      if (routeLayer.current) routeLayer.current.remove();

      // Glow effect (wider, transparent)
      routeGlow.current = L.polyline(route.geometry, {
        color: "hsl(189, 100%, 50%)",
        weight: 12,
        opacity: 0.2,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(mapInstance.current);

      // Main line
      routeLayer.current = L.polyline(route.geometry, {
        color: "hsl(189, 100%, 45%)",
        weight: 5,
        opacity: 0.9,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(mapInstance.current);

      mapInstance.current.fitBounds(routeLayer.current.getBounds(), {
        padding: [60, isMobile ? 40 : 420],
        animate: true,
        duration: 1,
      });
    }

    setLoading(false);
  };

  // ── Swap ────────────────────────────────────────
  const swapLocations = () => {
    setStartInput(destInput);
    setDestInput(startInput);
  };

  // ── Clear ───────────────────────────────────────
  const clearRoute = () => {
    if (routeGlow.current) routeGlow.current.remove();
    if (routeLayer.current) routeLayer.current.remove();
    setRouteInfo(null);
    setActiveStep(null);
    setError(null);
  };

  // ── Share ───────────────────────────────────────
  const shareRoute = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS.lat},${BUSINESS.lng}`;
    navigator.clipboard.writeText(url);
  };

  // ── Step click ──────────────────────────────────
  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
    if (routeInfo && mapInstance.current) {
      const geoIdx = Math.min(idx * 5, routeInfo.geometry.length - 1);
      mapInstance.current.flyTo(routeInfo.geometry[geoIdx], 17, { duration: 0.8 });
    }
  };

  // ── Reset view ──────────────────────────────────
  const resetView = () => {
    mapInstance.current?.flyTo([BUSINESS.lat, BUSINESS.lng], 14, { duration: 1.2 });
  };

  // ── Panel content ───────────────────────────────
  const PanelContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-bold text-foreground">Get Directions</h2>
          {isMobile && (
            <button onClick={() => setPanelOpen(!panelOpen)} className="p-1">
              {panelOpen ? <ChevronDown className="h-5 w-5 text-muted-foreground" /> : <ChevronUp className="h-5 w-5 text-muted-foreground" />}
            </button>
          )}
        </div>

        {/* Travel mode tabs */}
        <div className="flex gap-1 bg-muted/50 rounded-xl p-1">
          {travelModes.map(({ mode, label, icon }) => (
            <button
              key={mode}
              onClick={() => { setSelectedMode(mode); if (routeInfo) getDirections(mode); }}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all",
                selectedMode === mode
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {icon}
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="p-4 space-y-3">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-secondary" />
          <Input
            value={startInput}
            onChange={(e) => setStartInput(e.target.value)}
            placeholder={locPermission === "denied" ? "Enter starting location" : "Your location"}
            className="pl-9 bg-muted/30 border-border/50"
          />
        </div>

        <div className="flex justify-center">
          <button onClick={swapLocations} className="p-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors">
            <ArrowLeftRight className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>

        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-primary" />
          <Input
            value={destInput}
            onChange={(e) => setDestInput(e.target.value)}
            placeholder="Destination"
            className="pl-9 bg-muted/30 border-border/50"
          />
        </div>

        {locPermission === "denied" && (
          <p className="text-xs text-amber-500 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Location access denied. Enter your address manually.
          </p>
        )}

        {error && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> {error}
          </p>
        )}

        <div className="flex gap-2">
          <Button onClick={() => getDirections()} disabled={loading} className="flex-1">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Route className="h-4 w-4" />}
            {loading ? "Calculating..." : "Get Directions"}
          </Button>
          {routeInfo && (
            <Button variant="outline" size="icon" onClick={clearRoute}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {routeInfo && (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={shareRoute} className="flex-1 text-xs">
              <Copy className="h-3 w-3 mr-1" /> Copy Link
            </Button>
            <Button variant="ghost" size="sm" asChild className="flex-1 text-xs">
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${BUSINESS.lat},${BUSINESS.lng}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" /> Google Maps
              </a>
            </Button>
          </div>
        )}
      </div>

      {/* Route info */}
      {routeInfo && (
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center gap-4 px-4 py-3 bg-primary/5 border-y border-border/30">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm text-foreground">{routeInfo.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Route className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm text-foreground">{routeInfo.distance}</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Step-by-step directions
            </h3>
            {routeInfo.steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => handleStepClick(idx)}
                className={cn(
                  "w-full text-left flex items-start gap-3 p-2.5 rounded-lg transition-colors",
                  activeStep === idx ? "bg-primary/10" : "hover:bg-muted/30"
                )}
              >
                <div className={cn(
                  "flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold",
                  activeStep === idx ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground capitalize">{step.instruction}</p>
                  <p className="text-xs text-muted-foreground">{step.distance} · {step.duration}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 relative mt-16 md:mt-20">
        {/* Loading overlay */}
        <AnimatePresence>
          {!mapReady && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 bg-background flex flex-col items-center justify-center"
            >
              <div className="h-12 w-12 border-3 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-muted-foreground text-sm">Loading map...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map container */}
        <div ref={mapRef} className="absolute inset-0 z-0" />

        {/* Floating action buttons */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          <Button variant="glass" size="icon" onClick={recenter} title="Recenter">
            <LocateFixed className="h-4 w-4" />
          </Button>
          <Button variant="glass" size="icon" onClick={() => setIsSatellite(!isSatellite)} title={isSatellite ? "Dark map" : "Satellite view"}>
            <Layers className="h-4 w-4" />
          </Button>
          <Button variant="glass" size="icon" onClick={resetView} title="Reset view">
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Business info floating card */}
        {!panelOpen && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-card/90 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-xl max-w-sm w-[90vw]"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-foreground">{BUSINESS.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{BUSINESS.address}</p>
              </div>
              <Button size="sm" onClick={() => setPanelOpen(true)}>
                <Navigation className="h-3.5 w-3.5 mr-1" /> Navigate
              </Button>
            </div>
          </motion.div>
        )}

        {/* Desktop: Side panel */}
        {!isMobile && (
          <AnimatePresence>
            {panelOpen && (
              <motion.div
                initial={{ x: -400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -400, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 250 }}
                className="absolute top-0 left-0 bottom-0 z-20 w-[380px] bg-card/95 backdrop-blur-xl border-r border-border/50 shadow-2xl flex flex-col overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                  <span className="text-xs font-medium text-muted-foreground">NAVIGATION</span>
                  <button onClick={() => setPanelOpen(false)} className="p-1 rounded-lg hover:bg-muted/50 transition-colors">
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <PanelContent />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Mobile: Bottom sheet */}
        {isMobile && (
          <>
            {!panelOpen && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="absolute bottom-0 left-0 right-0 z-20 bg-card/95 backdrop-blur-xl border-t border-border/50 rounded-t-2xl shadow-xl"
              >
                <div className="flex flex-col items-center pt-2 pb-4 px-4">
                  <div className="w-10 h-1 bg-muted rounded-full mb-3" />
                  <div className="flex items-center gap-3 w-full">
                    <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-foreground">{BUSINESS.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{BUSINESS.address}</p>
                    </div>
                    <Button size="sm" onClick={() => setPanelOpen(true)}>
                      <Navigation className="h-3.5 w-3.5 mr-1" /> Go
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {panelOpen && (
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 250 }}
                  className="absolute bottom-0 left-0 right-0 z-20 bg-card/95 backdrop-blur-xl border-t border-border/50 rounded-t-2xl shadow-xl max-h-[85vh] flex flex-col overflow-hidden"
                >
                  <div className="flex flex-col items-center pt-2 px-4">
                    <button onClick={() => setPanelOpen(false)} className="w-10 h-1 bg-muted rounded-full mb-2" />
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <PanelContent />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default MapNavigation;
