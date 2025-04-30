import React from "react";

const Disclaimer = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Disclaimer</h1>

      <p className="mb-4 text-gray-700">
        The information provided by LawConnect is for general informational purposes only and is not legal advice.
        While we strive to ensure the accuracy of the information presented, we make no representations or warranties
        of any kind, express or implied, about the completeness, accuracy, reliability, or suitability with respect
        to the website or the information contained on the website.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Legal Advice</h2>
      <p className="text-gray-700 mb-4">
        LawConnect does not provide legal advice. Any legal consultations or communications facilitated through the
        platform are between the user and the independent legal professionals. We are not liable for any advice or
        services provided by lawyers on our platform.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">No Attorney-Client Relationship</h2>
      <p className="text-gray-700 mb-4">
        Use of this platform does not create an attorney-client relationship unless explicitly agreed upon between
        the user and the lawyer. Any reliance you place on such information is strictly at your own risk.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">External Links</h2>
      <p className="text-gray-700 mb-4">
        This site may contain links to external websites that are not provided or maintained by or in any way
        affiliated with LawConnect. We do not guarantee the accuracy or relevance of any external content.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Limitation of Liability</h2>
      <p className="text-gray-700 mb-4">
        In no event shall LawConnect be liable for any loss or damage including without limitation, indirect or
        consequential loss or damage, arising out of or in connection with the use of this platform.
      </p>

      <p className="text-sm text-gray-500 mt-12">Last updated: April 30, 2025</p>
    </div>
  );
};

export default Disclaimer;
