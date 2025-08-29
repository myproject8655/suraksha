import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  bgClass?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  bgClass = "bg-primary",
}) => {
  return (
    <div className={`${bgClass} text-white py-16 md:py-24`}>
      <div className="container-custom text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl max-w-3xl mx-auto">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
