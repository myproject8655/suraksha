import React from "react";

import { ShieldCheck, FileSearch, Briefcase, Globe, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageHeader from "@/components/common/PageHeader";

const Services: React.FC = () => {
  const services = [
    {
      id: "online-fraud",
      title: "Online Fraud Complaint Handling",
      icon: <Globe className="text-primary h-10 w-10" />,
      description:
        "We offer complete support for victims of online fraud. Our service includes expert guidance on documentation, reporting to the right platforms, and diligent follow-up to help you resolve your case.",
      features: [
        "E-commerce scam reporting and resolution",
        "Social media fraud assistance",
        "Phishing and identity theft reporting",
        "Investigation coordination with platforms",
        "Recovery process guidance",
      ],
    },
    {
      id: "banking-fraud",
      title: "Banking Fraud Complaint Assistance",
      icon: <ShieldCheck className="text-primary h-10 w-10" />,
      description:
        "Don't let banking fraud overwhelm you. We simplify the complex process of reporting unauthorized transactions, account breaches, and other financial crimes.",
      features: [
        "Unauthorized transaction reporting",
        "Account breach documentation",
        "Coordination with banking institutions",
        "RBI guidelines compliance assistance",
        "Fund recovery follow-up support",
      ],
    },
    {
      id: "cybercrime",
      title: "Cyber Crime Reporting",
      icon: <FileSearch className="text-primary h-10 w-10" />,
      description:
        "Our experts guide you through the proper channels for reporting cyber crimes to law enforcement and regulatory bodies.",
      features: [
        "Documentation preparation for police complaints",
        "National Cyber Crime Portal submission assistance",
        "Evidence collection and preservation guidance",
        "Case status tracking and follow-up",
        "Coordination with cybercrime investigation units",
      ],
    },
    {
      id: "legal",
      title: "Legal Consultation Coordination",
      icon: <Briefcase className="text-primary h-10 w-10" />,
      description:
        "Access expert legal advice. We connect you with a network of experienced cyber law specialists who can provide tailored advice for your unique situation.",
      features: [
        "Access to network of cyber law experts",
        "Legal rights and options assessment",
        "Case strength evaluation",
        "Documentation review for legal proceedings",
        "Representation coordination for court cases",
      ],
    },
  ];

  const faqs = [
    {
      question: "How soon should I report a cyber fraud incident?",
      answer:
        "It's crucial to report a cyber fraud incident as soon as possible, ideally within 24-48 hours. Early reporting increases the chances of successful resolution and fund recovery in financial fraud cases.",
    },
    {
      question: "What information do I need to provide when reporting a fraud?",
      answer:
        "You should provide detailed transaction information, communication records with the fraudster, screenshots of relevant webpages or messages, your personal and banking details that were compromised, and any other evidence related to the fraud.",
    },
    {
      question: "Is there a fee for using Cyber Suraksha's services?",
      answer:
        "Cyber Suraksha offers free initial consultations and basic guidance. For comprehensive case handling and legal coordination, we have transparent fee structures that vary based on the complexity of your case.",
    },
    {
      question: "Can you guarantee recovery of my lost funds?",
      answer:
        "While we cannot guarantee full recovery in all cases, our experienced team has a high success rate in helping clients recover funds, especially when incidents are reported promptly and sufficient evidence is available.",
    },
    {
      question: "Do I need to visit your office in person?",
      answer:
        "Most of our services can be provided remotely through phone, email, and video consultations. However, for complex cases or formal legal proceedings, an in-person meeting might be recommended.",
    },
  ];

  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Navigate cyber fraud with confidence. We provide comprehensive assistance to help you resolve incidents and protect your rights."
      />

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`py-10 ${
                index !== services.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <div className="flex items-center mb-6">
                    <div className="mr-4 bg-primary/10 p-3 rounded-full">
                      {service.icon}
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-gray-600 mb-6 text-lg">
                    {service.description}
                  </p>

                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    What We Offer:
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="text-secondary h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-5 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    How It Works
                  </h3>

                  <div className="space-y-4">
                    <div className="flex">
                      <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Initial Consultation
                        </h4>
                        <p className="text-gray-600 text-sm">
                          We assess your case and provide initial guidance.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Documentation
                        </h4>
                        <p className="text-gray-600 text-sm">
                          We help gather and organize all necessary evidence.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Reporting</h4>
                        <p className="text-gray-600 text-sm">
                          We guide you through reporting to the appropriate
                          authorities.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Follow-up & Resolution
                        </h4>
                        <p className="text-gray-600 text-sm">
                          We provide continuous support until your case is
                          resolved.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services and cyber
              fraud reporting process.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Don&apos;t navigate cybercrime alone. Our experts are ready to
            assist you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="/report" className="btn-secondary text-black">
              Report an Incident
            </a>
            <a
              href="/contact"
              className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
