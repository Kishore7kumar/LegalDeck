import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Camera,
  MessageSquare,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  CreditCard,
  DollarSign,
  Shield,
} from "lucide-react";
import {
  LiveKitRoom,
  VideoConference,
  ControlBar,
  useTracks,
} from "@livekit/components-react";
import "@livekit/components-styles";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

const Consultation = () => {
  const { roomName } = useParams();
  const liveKitUrl = import.meta.env.VITE_LIVEKIT_URL;
  const token = import.meta.env.VITE_LIVEKIT_TOKEN;

  const { lawyerId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");

  // Mocked consultation details
  const consultation = {
    lawyer: {
      name: "Sarah Johnson",
      expertise: "Criminal Law",
      hourlyRate: 200,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    },
    duration: 60, // minutes
    totalAmount: 200,
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Math.random().toString(),
      sender: "You",
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handlePayment = async () => {
    // In a real app, integrate with Stripe or other payment gateway
    console.log("Processing payment with", selectedPaymentMethod);
    setShowPaymentModal(false);
  };
  if (!liveKitUrl || !token) {
    return <p>Error: LiveKit URL or token is missing</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Conference */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <LiveKitRoom serverUrl={liveKitUrl} token={token} connect={true}>
                <VideoConference />
                <ControlBar />
              </LiveKitRoom>
            </div>
          </div>

          {/* Chat and Payment */}
          <div className="space-y-8">
            {/* Consultation Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={consultation.lawyer.image}
                  alt={consultation.lawyer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">
                    {consultation.lawyer.name}
                  </h3>
                  <p className="text-gray-600">
                    {consultation.lawyer.expertise}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">
                    {consultation.duration} minutes
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rate</span>
                  <span className="font-medium">
                    ${consultation.lawyer.hourlyRate}/hour
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold">
                  <span>Total Amount</span>
                  <span>${consultation.totalAmount}</span>
                </div>
              </div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Process Payment
              </button>
            </div>

            {/* Chat */}
            <div className="bg-white rounded-xl shadow-lg h-[400px] flex flex-col">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Chat</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "You" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "You"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-75 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Amount to Pay</h4>
                  <div className="text-2xl font-bold text-indigo-600">
                    ${consultation.totalAmount}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Select Payment Method</h4>
                  <div className="space-y-2">
                    {["credit_card", "upi", "net_banking"].map((method) => (
                      <label
                        key={method}
                        className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="radio"
                          name="payment_method"
                          value={method}
                          checked={selectedPaymentMethod === method}
                          onChange={(e) =>
                            setSelectedPaymentMethod(e.target.value)
                          }
                          className="mr-3"
                        />
                        <span className="capitalize">
                          {method.replace("_", " ")}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2" />
                  Secure payment processed by Stripe
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePayment}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Consultation;
