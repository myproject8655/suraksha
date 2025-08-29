"use client";
import PageHeader from "@/components/common/PageHeader";
import ReportForm from "@/components/forms/ReportForm";

const Report: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Report a Complaint"
        subtitle="Use this secure form to report a cyber fraud incident and get expert assistance."
        bgClass="bg-gradient-to-r from-primary to-accent"
      />

      {/* Form Section */}
      <section className="section-padding">
        <div className="container-custom">
          <ReportForm />
        </div>
      </section>
    </>
  );
};

export default Report;
