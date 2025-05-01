import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  FileText, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Bell,
  Upload,
  Download,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

interface CaseUpdate {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'document' | 'update' | 'court_date' | 'completed';
}

interface CaseDocument {
  id: string;
  name: string;
  uploadedBy: string;
  date: Date;
  size: string;
  type: string;
}

const CaseTracking = () => {
  const [activeTab, setActiveTab] = useState<'updates' | 'documents'>('updates');
  
  // Mock data
  const caseDetails = {
    caseNumber: "2024-CR-1234",
    title: "Johnson vs. Smith - Property Dispute",
    status: "In Progress",
    lawyer: "Sarah Johnson",
    startDate: new Date(2024, 2, 1),
    nextHearing: new Date(2024, 4, 15)
  };

  const updates: CaseUpdate[] = [
    {
      id: '1',
      title: 'Initial Documentation Completed',
      description: 'All required documents have been filed with the court.',
      date: new Date(2024, 2, 1),
      type: 'document'
    },
    {
      id: '2',
      title: 'Court Date Scheduled',
      description: 'First hearing scheduled for May 15, 2024',
      date: new Date(2024, 2, 15),
      type: 'court_date'
    },
    {
      id: '3',
      title: 'Evidence Review',
      description: 'New evidence documents uploaded for review.',
      date: new Date(2024, 3, 1),
      type: 'update'
    }
  ];

  const documents: CaseDocument[] = [
    {
      id: '1',
      name: 'Initial Complaint.pdf',
      uploadedBy: 'Sarah Johnson',
      date: new Date(2024, 2, 1),
      size: '2.4 MB',
      type: 'PDF'
    },
    {
      id: '2',
      name: 'Evidence Photos.zip',
      uploadedBy: 'Client',
      date: new Date(2024, 2, 5),
      size: '15.7 MB',
      type: 'ZIP'
    },
    {
      id: '3',
      name: 'Court Summons.pdf',
      uploadedBy: 'Sarah Johnson',
      date: new Date(2024, 2, 10),
      size: '1.2 MB',
      type: 'PDF'
    }
  ];

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success('Document uploaded successfully');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUpdateIcon = (type: CaseUpdate['type']) => {
    switch (type) {
      case 'document':
        return <FileText className="w-6 h-6 text-blue-600" />;
      case 'court_date':
        return <Calendar className="w-6 h-6 text-purple-600" />;
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-green-600" />;
      default:
        return <AlertCircle className="w-6 h-6 text-orange-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Case Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{caseDetails.title}</h1>
              <div className="mt-2 flex flex-wrap gap-4">
                <span className="text-gray-600">Case #{caseDetails.caseNumber}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(caseDetails.status)}`}>
                  {caseDetails.status}
                </span>
              </div>
            </div>
            <button
              className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={() => toast.success('Notifications enabled')}
            >
              <Bell className="w-5 h-5 mr-2" />
              Enable Notifications
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Start Date</p>
                <p className="font-medium">{format(caseDetails.startDate, 'MMM d, yyyy')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Next Hearing</p>
                <p className="font-medium">{format(caseDetails.nextHearing, 'MMM d, yyyy')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Assigned Lawyer</p>
                <p className="font-medium">{caseDetails.lawyer}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b">
            <div className="flex">
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'updates'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('updates')}
              >
                Case Updates
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'documents'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('documents')}
              >
                Documents
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'updates' ? (
              <div className="space-y-6">
                {updates.map((update) => (
                  <div key={update.id} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      {getUpdateIcon(update.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{update.title}</h3>
                        <span className="text-sm text-gray-500">
                          {format(update.date, 'MMM d, yyyy')}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-600">{update.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="flex justify-end mb-6">
                  <label className="relative inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Document
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleDocumentUpload}
                    />
                  </label>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded By</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FileText className="w-5 h-5 text-gray-400 mr-2" />
                              <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {doc.uploadedBy}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {format(doc.date, 'MMM d, yyyy')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {doc.size}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button className="text-indigo-600 hover:text-indigo-900">
                                <Eye className="w-5 h-5" />
                              </button>
                              <button className="text-indigo-600 hover:text-indigo-900">
                                <Download className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseTracking;