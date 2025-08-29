import React from "react";

import { Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-primary text-white overflow-hidden">
      {/* Background Overlay Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="container-custom py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Shield className="text-secondary h-8 w-8 mr-3" />
              <span className="text-xl font-medium text-secondary">
                Cyber Suraksha
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Expert Solutions for Cyber Fraud Recovery
            </h1>

            <p className="text-lg mb-8 text-white/80 max-w-lg mx-auto md:mx-0">
              We provide expert guidance and support to help individuals and organizations report, resolve, and recover from cyber fraud incidents effectively.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/#file-report">
                <Button className="text-black bg-white border-white hover:bg-white/90 w-full sm:w-auto ">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Report an Incident
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className=" w-full sm:w-auto btn-primary"
                >
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative w-150 h-100">
              <Image
                src="https://images.unsplash.com/photo-1588058365815-c96ac30ee30f?w=600&auto=format&fit=crop&q=80"
                alt="Cybersecurity Protection"
                className="rounded-lg shadow-lg mx-auto aspect-auto"
                fill
              />
              <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground p-4 rounded-lg shadow-lg">
                <p className="font-bold text-xl">98%</p>
                <p className="text-sm">Successful Case Resolution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
