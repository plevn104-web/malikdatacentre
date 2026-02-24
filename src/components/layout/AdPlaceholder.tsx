interface AdPlaceholderProps {
  position: "header" | "content" | "footer";
}

export const AdPlaceholder = ({ position }: AdPlaceholderProps) => (
  <div
    className="w-full"
    aria-hidden="true"
    data-ad-slot={position}
    style={{ minHeight: 0 }}
  >
    {/* Reserved for future ad placement */}
  </div>
);
