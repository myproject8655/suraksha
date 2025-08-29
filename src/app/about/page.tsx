import React from "react";

import { Check, Shield } from "lucide-react";
import TestimonialCard from "@/components/common/TestimonialCard";
import PageHeader from "@/components/common/PageHeader";

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Anand Sharma",
      role: "Founder & CEO",
      bio: "Former cybersecurity expert with 15+ years of experience in handling digital fraud cases and cyber law.",
    },
    {
      name: "Dr. Meera Patel",
      role: "Legal Director",
      bio: "Seasoned legal professional specializing in cyber law with experience in handling complex cyber fraud cases.",
    },
    {
      name: "Vikram Singh",
      role: "Technical Director",
      bio: "Cybersecurity specialist with expertise in digital forensics and cyber threat intelligence.",
    },
    {
      name: "Neha Gupta",
      role: "Client Relations Manager",
      bio: "Dedicated professional focused on ensuring seamless communication and support for all clients.",
    },
  ];

  const partners = [
    {
      name: "National Cybercrime Coordination Center",
      description:
        "Official collaboration for streamlined reporting of cyber incidents.",
    },
    {
      name: "Indian Cyber Law Association",
      description:
        "Partnership for legal expertise and advocacy in cyber law matters.",
    },
    {
      name: "Digital Security Alliance of India",
      description: "Cooperation for awareness and education on digital safety.",
    },
    {
      name: "Banking Security Forum",
      description:
        "Collaboration on financial fraud prevention and resolution.",
    },
  ];

  const testimonials = [
    {
      name: "Amit Desai",
      role: "Business Owner",
      content:
        "After our company email was compromised leading to a significant financial loss, Cyber Suraksha provided invaluable guidance that helped us recover most of the funds and strengthen our security measures.",
    },
    {
      name: "Sunita Agarwal",
      role: "Retired Teacher",
      content:
        "When I fell victim to an online shopping scam, I was lost until I found Cyber Suraksha. Their patient and compassionate team guided me through every step of the reporting process.",
    },
    {
      name: "Karan Shah",
      role: "IT Professional",
      content:
        "Despite being tech-savvy, I became a victim of sophisticated identity theft. Cyber Suraksha's expertise in navigating the legal aspects of my case was crucial to resolving the situation quickly.",
    },
  ];

  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="Learn about our mission, team, and commitment to helping victims of cyber fraud."
      />

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At Cyber Suraksha, our mission is to provide accessible support
                and guidance to individuals and organizations affected by cyber
                fraud, bridging the gap between victims and legal authorities.
              </p>
              <p className="text-gray-600 mb-6">
                We believe that every person deserves expert assistance in
                navigating the complex process of reporting and resolving cyber
                incidents, regardless of their technical expertise.
              </p>
              <p className="text-gray-600">
                Through education, advocacy, and direct support, we aim to
                create a safer digital environment for all Indian citizens and
                contribute to the fight against cybercrime.
              </p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <Shield className="text-primary h-10 w-10 mr-4" />
                <h3 className="text-2xl font-bold text-gray-800">Our Values</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="text-secondary h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Integrity</h4>
                    <p className="text-gray-600">
                      We maintain the highest ethical standards in all our
                      operations and client interactions.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="text-secondary h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Compassion</h4>
                    <p className="text-gray-600">
                      We approach each case with empathy, understanding the
                      distress cyber fraud causes.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="text-secondary h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Excellence</h4>
                    <p className="text-gray-600">
                      We strive for the highest quality in our services and
                      continuous improvement.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="text-secondary h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Accessibility
                    </h4>
                    <p className="text-gray-600">
                      We make our services understandable and available to
                      people of all technical backgrounds.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the experts dedicated to helping you navigate cyber fraud
              incidents with confidence and clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="bg-primary/10 h-32 flex items-center justify-center">
                  <div className="bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-secondary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Partnerships & Affiliations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We collaborate with leading organizations and authorities to
              ensure comprehensive support for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {partner.name}
                </h3>
                <p className="text-gray-600">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Client Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Read what our clients have to say about their experience working
              with Cyber Suraksha.
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

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Work with Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Our expert team is ready to assist you with any cyber fraud related
            concerns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="/contact" className="btn-secondary">
              Contact Our Team
            </a>
            <a
              href="/services"
              className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              Explore Our Services
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
