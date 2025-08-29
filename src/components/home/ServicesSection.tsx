import React from "react";
import { ShieldCheck, FileSearch, Briefcase, Globe } from "lucide-react";
import ServiceCard from "../common/ServiceCard";

const ServicesSection: React.FC = () => {
  const services = [
    {
      title: "Online Fraud Complaint",
      description:
        "We help you report and track online fraud complaints, from e-commerce scams to social media fraud.",
      icon: <Globe className="text-primary h-8 w-8" />,
      link: "/services#online-fraud",
    },
    {
      title: "Banking Fraud Assistance",
      description:
        "Get expert guidance on reporting unauthorized transactions, phishing, and other banking-related fraud.",
      icon: <ShieldCheck className="text-primary h-8 w-8" />,
      link: "/services#banking-fraud",
    },
    {
      title: "Cyber Crime Reporting",
      description:
        "We assist in proper documentation and reporting of cyber crimes to the appropriate authorities.",
      icon: <FileSearch className="text-primary h-8 w-8" />,
      link: "/services#cybercrime",
    },
    {
      title: "Legal Consultation",
      description:
        "Connect with legal experts specializing in cyber law to understand your rights and options.",
      icon: <Briefcase className="text-primary h-8 w-8" />,
      link: "/services#legal",
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive assistance to help you navigate through
            cyber fraud incidents and ensure your rights are protected.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
