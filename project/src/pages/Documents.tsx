import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { File, Upload, Lock, FileSignature, Download, Eye, Trash2, Search } from 'lucide-react';
import SignaturePad from 'react-signature-canvas';
import CryptoJS from 'crypto-js';

interface Document {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  status: 'pending' | 'signed' | 'shared';
  sharedWith: string[];
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Case Brief - Johnson vs. Smith.pdf',
      size: '2.4 MB',
      uploadDate: '2024-03-15',
      status: 'pending',
      sharedWith: ['Sarah Johnson']
    },
    {
      id: '2',
      name: 'Evidence Document A-123.pdf',
      size: '1.8 MB',
      uploadDate: '2024-03-14',
      status: 'signed',
      sharedWith: ['Michael Chen', 'Emily Rodriguez']
    }
  ]);

  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const signaturePadRef = useRef<SignaturePad>(null);

  const encryptFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const encrypted = CryptoJS.AES.encrypt(result, 'your-secret-key').toString();
        resolve(encrypted);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const encrypted = await encryptFile(file);
      // In a real app, you would save the encrypted file to your backend
      const newDocument: Document = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        sharedWith: []
      };
      setDocuments([newDocument, ...documents]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleSign = () => {
    if (!selectedDocument) return;
    setShowSignatureModal(true);
  };

  const saveSignature = () => {
    if (!selectedDocument || !signaturePadRef.current) return;
    
    // In a real app, you would save the signature data
    const signatureData = signaturePadRef.current.toDataURL();
    
    setDocuments(documents.map(doc => 
      doc.id === selectedDocument.id ? { ...doc, status: 'signed' } : doc
    ));
    
    setShowSignatureModal(false);
    setSelectedDocument(null);
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
              <p className="mt-1 text-gray-600">Securely manage and share your legal documents</p>
            </div>
            <div className="mt-4 md:mt-0">
              <label className="relative inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
                <Upload className="w-5 h-5 mr-2" />
                Upload Document
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                />
              </label>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shared With</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <File className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploadDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        doc.status === 'signed' ? 'bg-green-100 text-green-800' :
                        doc.status === 'shared' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.sharedWith.join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Download className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDocument(doc);
                            handleSign();
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FileSignature className="w-5 h-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signature Modal */}
        {showSignatureModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
              <h3 className="text-xl font-semibold mb-4">Sign Document</h3>
              <div className="border border-gray-300 rounded-lg mb-4">
                <SignaturePad
                  ref={signaturePadRef}
                  canvasProps={{
                    className: 'w-full h-64 rounded-lg'
                  }}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    if (signaturePadRef.current) {
                      signaturePadRef.current.clear();
                    }
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowSignatureModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSignature}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Signature
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;