import Image from "next/image";
import React from "react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  image?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  content,
  image,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="mr-4">
          {image ? (
            <Image
              src={image}
              alt={name}
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-500">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div>
          <h4 className="font-bold text-lg">{name}</h4>
          <p className="text-gray-600">{role}</p>
        </div>
      </div>
      <blockquote>
        <p className="text-gray-700 italic">&quot;{content}&quot;</p>
      </blockquote>
    </div>
  );
};

export default TestimonialCard;
