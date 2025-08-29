import CTASection from "@/components/home/CTASection";
import HeroSection from "@/components/home/HeroSection";
import ReportSection from "@/components/home/ReportSection";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { FileSearch, Shield, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ReportSection />
      <ServicesSection />

      {/* How We Help Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">How We Help</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined process ensures you get the support you need
              quickly and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <FileSearch className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Report the Incident</h3>
              <p className="text-gray-600">
                Fill out our secure complaint form with details about the cyber
                fraud incident you experienced.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Get Expert Guidance</h3>
              <p className="text-gray-600">
                Our team reviews your case and provides personalized guidance on
                next steps and documentation needed.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Resolution Support</h3>
              <p className="text-gray-600">
                We assist in filing reports with appropriate authorities and
                provide support throughout the resolution process.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      <TestimonialsSection />

      {/* Resources Preview Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Cybersecurity Resources</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay informed about the latest cyber threats and learn how to
              protect yourself online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-custom">
              <h3 className="text-xl font-bold mb-3">Latest Cyber Threats</h3>
              <p className="text-gray-600 mb-4">
                Stay updated on emerging cyber threats and scams targeting
                Indian citizens and businesses.
              </p>
              <a
                href="/resources"
                className="text-primary font-medium hover:underline"
              >
                Learn More →
              </a>
            </div>

            <div className="card-custom">
              <h3 className="text-xl font-bold mb-3">Safety Guidelines</h3>
              <p className="text-gray-600 mb-4">
                Practical tips and best practices to protect yourself and your
                data from cyber criminals.
              </p>
              <a
                href="/resources"
                className="text-primary font-medium hover:underline"
              >
                Learn More →
              </a>
            </div>

            <div className="card-custom">
              <h3 className="text-xl font-bold mb-3">
                Official Reporting Channels
              </h3>
              <p className="text-gray-600 mb-4">
                Information on government portals and official channels for
                reporting cybercrime in India.
              </p>
              <a
                href="/resources"
                className="text-primary font-medium hover:underline"
              >
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
