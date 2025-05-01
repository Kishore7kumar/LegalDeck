import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy</h1>

      <p className="mb-4 text-gray-700">
        At LawConnect, we take your privacy seriously. This policy outlines how we collect,
        use, and protect your personal information when you use our services.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">1. Information We Collect</h2>
      <ul className="list-disc ml-6 text-gray-700">
        <li>Your name, email, and contact details during registration.</li>
        <li>Booking details including lawyer, date, and consultation data.</li>
        <li>Messages and documents shared during consultations.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 text-gray-700">
        <li>To provide legal consultation and document handling services.</li>
        <li>To contact you regarding appointments or case updates.</li>
        <li>To improve and personalize your experience on the platform.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">3. Data Security</h2>
      <p className="text-gray-700 mb-4">
        We use secure technologies and encryption protocols to protect your personal data. However,
        no digital system is completely secure, and we encourage you to share sensitive data
        responsibly.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">4. Third-Party Services</h2>
      <p className="text-gray-700 mb-4">
        We may use trusted third-party services like video conferencing or payment gateways.
        These services have their own privacy policies, and we encourage you to review them.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">5. Your Rights</h2>
      <p className="text-gray-700 mb-4">
        You have the right to access, update, or delete your personal information at any time.
        Contact our support team for any requests.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">6. Changes to This Policy</h2>
      <p className="text-gray-700 mb-4">
        We may update this Privacy Policy from time to time. Any changes will be posted on this
        page with a revised date.
      </p>

      <p className="text-sm text-gray-500 mt-12">Last updated: April 30, 2025</p>
    </div>
  );
};

export default Privacy;
