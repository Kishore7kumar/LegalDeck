import React from "react";

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Services Section */}
      <section className="py-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer hover:bg-indigo-700 hover:text-white"
          >
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </section>

      
      
    </div>
  );
};

const services = [
  {
    title: "Lawyer Discovery & Consultation",
    description: "Find experienced lawyers and schedule consultations online."
    
  },
  {
    title: "Legal Case Management",
    description: "Manage and track your legal cases with ease."
  },
  {
    title: "Legal Document Services",
    description: "Access and generate legal documents efficiently."
  },
  {
    title: "Online Dispute Resolution",
    description: "Resolve legal disputes through online mediation."
  },
  {
    title: "Legal Education & Awareness",
    description: "Learn about your legal rights and obligations."
  }
];

export default Services;
