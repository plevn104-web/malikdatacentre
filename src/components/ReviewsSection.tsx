import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed K.",
    role: "YouTube Creator",
    content: "My channel got monetized in just 2 weeks! The watch time and subscribers were delivered smoothly. Highly recommend their services!",
    rating: 5,
  },
  {
    name: "Sarah M.",
    role: "Content Creator",
    content: "Best AI tools provider in Pakistan. I've been using their ChatGPT and CapCut Pro subscriptions for months. Great prices and instant delivery!",
    rating: 5,
  },
  {
    name: "Ali R.",
    role: "Freelancer",
    content: "The monetization package was worth every penny. Got my AdSense approved and now I'm earning from my channel. Thank you!",
    rating: 5,
  },
  {
    name: "Fatima S.",
    role: "Digital Marketer",
    content: "Their Semrush and VidIQ subscriptions helped me 10x my client results. Fast delivery and excellent customer support.",
    rating: 5,
  },
  {
    name: "Hassan T.",
    role: "Video Editor",
    content: "Adobe Creative Cloud at these prices is unbeatable! The quality is premium and the service is always reliable.",
    rating: 5,
  },
  {
    name: "Zara A.",
    role: "YouTuber",
    content: "From 0 to monetized in 3 weeks. The team was super helpful throughout the process. 100% trusted service!",
    rating: 5,
  },
];

export const ReviewsSection = () => {
  return (
    <section className="cgi-section relative overflow-hidden py-24">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-transparent" />
      
      <div className="container relative z-10 px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Testimonials
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Join hundreds of satisfied clients who have achieved their goals with our services.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card-hover group relative p-6"
            >
              {/* Quote icon */}
              <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/10" />

              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              {/* Content */}
              <p className="mb-6 text-muted-foreground">&quot;{testimonial.content}&quot;</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-primary-foreground">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
