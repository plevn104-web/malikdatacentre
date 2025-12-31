import { memo } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Khan",
    role: "E-commerce Owner",
    content: "The website they built for my store increased my sales by 200%. Absolutely professional work and great communication throughout the project.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Startup Founder",
    content: "Best investment I made for my startup. The design is stunning and the website performs amazingly on all devices.",
    rating: 5,
  },
  {
    name: "Muhammad Ali",
    role: "Digital Agency",
    content: "We've partnered with Malik Data Centre for multiple client projects. Their quality and delivery time is unmatched.",
    rating: 5,
  },
  {
    name: "Fatima Hassan",
    role: "Content Creator",
    content: "My portfolio website looks incredible! They understood my vision perfectly and delivered beyond expectations.",
    rating: 5,
  },
  {
    name: "Omar Rashid",
    role: "Restaurant Owner",
    content: "Our online orders tripled after launching the new website. The team was responsive and professional.",
    rating: 5,
  },
  {
    name: "Ayesha Malik",
    role: "Freelancer",
    content: "Quick turnaround, beautiful design, and excellent support. Highly recommend for any business website needs!",
    rating: 5,
  },
];

const ReviewsSectionComponent = () => {
  return (
    <section className="py-24 section-gradient-alt">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real feedback from clients who trusted us with their digital presence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-6 relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/90 text-sm leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ReviewsSection = memo(ReviewsSectionComponent);
