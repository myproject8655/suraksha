import React from "react";

import {
  AlertTriangle,
  FileText,
  Book,
  Link as LinkIcon,
  Info,
  ExternalLink,
} from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Link from "next/link";

const Resources: React.FC = () => {
  const educationalResources = [
    {
      title: "Understanding Phishing Attacks",
      description:
        "Learn how to identify and protect yourself from phishing attempts.",
      icon: <AlertTriangle className="text-primary h-6 w-6" />,
      link: "/resources/phishing-awareness",
    },
    {
      title: "Secure Online Banking Practices",
      description:
        "Essential tips for keeping your financial transactions and accounts safe.",
      icon: <FileText className="text-primary h-6 w-6" />,
      link: "/resources/banking-security",
    },
    {
      title: "Identity Theft Prevention Guide",
      description:
        "Comprehensive guide on protecting your identity in the digital age.",
      icon: <Book className="text-primary h-6 w-6" />,
      link: "/resources/identity-protection",
    },
    {
      title: "Social Media Safety Tips",
      description:
        "Best practices for maintaining privacy and security on social platforms.",
      icon: <LinkIcon className="text-primary h-6 w-6" />,
      link: "/resources/social-media-safety",
    },
  ];

  const officialPortals = [
    {
      name: "National Cyber Crime Reporting Portal",
      url: "https://cybercrime.gov.in/",
      description:
        "Official government portal for reporting cyber crimes anywhere in India.",
    },
    {
      name: "RBI Complaint Management System",
      url: "https://cms.rbi.org.in/",
      description:
        "Reserve Bank of India's platform for banking-related complaints.",
    },
    {
      name: "Indian Cyber Crime Coordination Centre (I4C)",
      url: "https://www.mha.gov.in/division_of_mha/cyber-and-information-security-cis-division",
      description:
        "Framework for coordination among law enforcement agencies dealing with cybercrime.",
    },
    {
      name: "CERT-In (Indian Computer Emergency Response Team)",
      url: "https://www.cert-in.org.in/",
      description:
        "Handles cyber security incidents and provides related services.",
    },
  ];

  const recentThreats = [
    {
      title: "QR Code Payment Frauds",
      date: "May 2, 2025",
      description:
        "Scammers are using fake QR codes to steal money from unsuspecting users. Always verify payment recipients carefully.",
    },
    {
      title: "COVID-19 Relief Scam Emails",
      date: "April 28, 2025",
      description:
        "Phishing emails claiming to offer government relief funds are targeting citizens. Official communications never ask for your bank details via email.",
    },
    {
      title: "Remote Work Security Vulnerabilities",
      date: "April 15, 2025",
      description:
        "With continued remote working, hackers are targeting insecure home networks and remote access points. Ensure proper VPN and security protocols.",
    },
  ];

  return (
    <>
      <PageHeader
        title="Cybersecurity Resources"
        subtitle="Educational materials, official reporting channels, and updates on current threats to help you stay safe online."
      />

      {/* Educational Materials */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="section-title">Educational Materials</h2>
          <p className="text-gray-600 mb-10 max-w-3xl">
            Enhance your understanding of cyber security with our collection of
            guides and resources designed to help you navigate the digital world
            safely.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {educationalResources.map((resource, index) => (
              <div key={index} className="card-custom">
                <div className="mb-4">{resource.icon}</div>
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <Link
                  href={resource.link}
                  className="text-primary font-medium inline-flex items-center hover:underline"
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Threats */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">Recent Cyber Threats</h2>
          <p className="text-gray-600 mb-10 max-w-3xl">
            Stay informed about the latest cyber threats and scams targeting
            Indian citizens and organizations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentThreats.map((threat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="bg-red-100 px-4 py-2">
                  <div className="flex items-center">
                    <AlertTriangle className="text-red-600 h-5 w-5 mr-2" />
                    <span className="text-red-600 font-medium">Alert</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{threat.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">
                    Published: {threat.date}
                  </p>
                  <p className="text-gray-600 mb-4">{threat.description}</p>
                  <Link
                    href="/resources"
                    className="text-primary font-medium hover:underline"
                  >
                    Learn more about this threat
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Reporting Portals */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="section-title">Official Reporting Channels</h2>
          <p className="text-gray-600 mb-10 max-w-3xl">
            Links to government-approved platforms for reporting various types
            of cybercrimes and fraud incidents.
          </p>

          <div className="space-y-6">
            {officialPortals.map((portal, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{portal.name}</h3>
                    <p className="text-gray-600 mb-4 md:mb-0">
                      {portal.description}
                    </p>
                  </div>
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white px-6 py-3 rounded-md font-medium inline-flex items-center hover:bg-primary/90 transition-colors whitespace-nowrap"
                  >
                    Visit Portal
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">Essential Cybersecurity Tips</h2>
          <p className="text-gray-600 mb-10 max-w-3xl">
            Follow these important guidelines to enhance your online security
            and protect yourself from cyber threats.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Info className="text-primary h-5 w-5 mr-2" />
                Password Security
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                    1
                  </div>
                  <p className="text-gray-700">
                    Use strong, unique passwords for different accounts.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                    2
                  </div>
                  <p className="text-gray-700">
                    Enable two-factor authentication whenever possible.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                    3
                  </div>
                  <p className="text-gray-700">
                    Consider using a reputable password manager.
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Info className="text-primary h-5 w-5 mr-2" />
                Email Safety
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                    1
                  </div>
                  <p className="text-gray-700">
                    Be cautious of unexpected emails with attachments or links.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                    2
                  </div>
                  <p className="text-gray-700">
                    Verify sender identities before responding to requests for
                    information.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                    3
                  </div>
                  <p className="text-gray-700">
                    Never share sensitive information via email.
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Info className="text-primary h-5 w-5 mr-2" />
                Financial Transactions
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                    1
                  </div>
                  <p className="text-gray-700">
                    Always use secure and trusted payment methods.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                    2
                  </div>
                  <p className="text-gray-700">
                    Verify website security before entering financial details.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                    3
                  </div>
                  <p className="text-gray-700">
                    Regularly monitor your accounts for unauthorized
                    transactions.
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Info className="text-primary h-5 w-5 mr-2" />
                Device Security
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                    1
                  </div>
                  <p className="text-gray-700">
                    Keep your devices updated with the latest security patches.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                    2
                  </div>
                  <p className="text-gray-700">
                    Use anti-virus and anti-malware protection.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                    3
                  </div>
                  <p className="text-gray-700">
                    Enable device encryption and lock screen protection.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">
            Need Personalized Assistance?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            If you&apos;ve been affected by a cyber incident, our experts are
            ready to guide you through the recovery process.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/report" className="btn-secondary">
              Report an Incident
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Resources;
