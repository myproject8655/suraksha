import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { AlertTriangle } from "lucide-react";

const CTASection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-accent text-white py-16 md:py-20">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Are You a Victim of Cyber Fraud?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
          Don&apos;t navigate this alone. Our team of experts is ready to guide
          you through the reporting and resolution process.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/report">
            <Button className="btn-primary w-full sm:w-auto text-lg px-8 py-6">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Report an Incident
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              className="text-black border-white hover:bg-white/10 w-full sm:w-auto text-lg px-8 py-6"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
