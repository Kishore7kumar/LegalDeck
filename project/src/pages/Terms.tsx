import React from "react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Terms of Service</h1>

      <p className="mb-4 text-gray-700">
        Welcome to LawConnect. By accessing or using our services, you agree to the following terms and conditions.
        Please read them carefully.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">1. Acceptance of Terms</h2>
      <p className="text-gray-700 mb-4">
        By using this website, you acknowledge that you have read, understood, and agree to be bound by these terms.
        If you do not agree, please do not use our services.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">2. User Accounts</h2>
      <p className="text-gray-700 mb-4">
        You are responsible for maintaining the confidentiality of your account credentials and for all activities
        that occur under your account.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">3. Legal Consultations</h2>
      <p className="text-gray-700 mb-4">
        LawConnect connects users with independent lawyers. We are not responsible for the advice provided by
        lawyers through our platform.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">4. Payments</h2>
      <p className="text-gray-700 mb-4">
        All payments for consultations are processed securely through our third-party payment providers.
        We do not store payment information.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">5. Prohibited Conduct</h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>Using the platform for illegal or unauthorized purposes</li>
        <li>Harassing or abusing any user or lawyer</li>
        <li>Uploading harmful or malicious content</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">6. Limitation of Liability</h2>
      <p className="text-gray-700 mb-4">
        We are not liable for any damages arising from your use of the platform, including reliance on any legal
        advice received through the service.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">7. Modifications</h2>
      <p className="text-gray-700 mb-4">
        We reserve the right to modify or terminate our services at any time, without notice.
      </p>

      <p className="text-sm text-gray-500 mt-12">Last updated: April 30, 2025</p>
    </div>
  );
};

export default Terms;
