import React from "react";
import TestimonialCard from "../common/TestimonialCard";

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Recovering Fraud Victim",
      content:
        "Cyber Suraksha was instrumental in helping me report and recover from an online banking fraud. Their team guided me through every step of the process with professionalism and compassion.",
    },
    {
      name: "Rajesh Kumar",
      role: "Small Business Owner",
      content:
        "After my business email was compromised, I was lost until I found Cyber Suraksha. They helped me navigate the reporting process and implement better security measures to prevent future incidents.",
    },
    {
      name: "Anita Desai",
      role: "Senior Citizen",
      content:
        "As someone who isn't tech-savvy, I was devastated after falling victim to an online scam. The team at CyberHelp not only helped me report the fraud but also educated me on staying safe online.",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We&apos;ve helped thousands of individuals and organizations
            navigate cyber fraud incidents. Here are some of their stories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
