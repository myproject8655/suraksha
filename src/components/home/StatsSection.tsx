import React from "react";

const StatsSection: React.FC = () => {
  const stats = [
    {
      value: "5000+",
      label: "Cases Handled",
    },
    {
      value: "98%",
      label: "Success Rate",
    },
    {
      value: "24/7",
      label: "Support Available",
    },
    {
      value: "50+",
      label: "Legal Experts",
    },
  ];

  return (
    <section className="bg-primary text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
