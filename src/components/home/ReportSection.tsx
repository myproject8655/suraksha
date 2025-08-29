import React from "react";
import { Shield } from "lucide-react";
import ReportForm from "../forms/ReportForm";

const ReportSection = () => {
  return (
    <section id="file-report" className="my-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4">File Your Cyber Crime Report</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our team of experts will guide you through the process and help you take the necessary actions to address the incident.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            
            <ReportForm />
      
        </div>
      </div>
    </section>
  );
};

export default ReportSection;
