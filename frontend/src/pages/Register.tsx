import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [lawyerForm, setLawyerForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    experience: '',
    fees: '',
    documents: [],
  });

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    if (clientForm.password !== clientForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await axios.post('/api/auth/register', {
        ...clientForm,
        isLawyer: false,
      });
      toast.success('Client registered successfully');
      navigate('/login');
    } catch (err) {
      toast.error('Registration failed');
    }
  };

  const handleLawyerSubmit = async (e) => {
    e.preventDefault();
    if (lawyerForm.password !== lawyerForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const token = localStorage.getItem('token'); // ✅ Retrieve JWT token from localStorage

    if (!token) {
      toast.error('You must be logged in to register as a lawyer.');
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(lawyerForm).forEach(([key, value]) => {
        if (key === 'documents') {
          value.forEach((file) => formData.append('documents', file));
        } else {
          formData.append(key, value);
        }
      });

      formData.append('isLawyer', true);

      await axios.post('http://localhost:5000/api/auth/register-lawyer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // ✅ Attach token here
        },
      });

      toast.success('Lawyer registered successfully');
      navigate('/login');
    } catch (err) {
      toast.error('Registration failed');
    }
  };

  if (!userType) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl mb-4">Register as:</h2>
        <button
          className="mb-2 px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={() => setUserType('client')}
        >
          Client
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => setUserType('lawyer')}
        >
          Lawyer
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">
        {userType === 'client' ? 'Client Registration' : 'Lawyer Registration'}
      </h2>
      <form onSubmit={userType === 'client' ? handleClientSubmit : handleLawyerSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full p-2 border rounded"
          value={userType === 'client' ? clientForm.name : lawyerForm.name}
          onChange={(e) =>
            userType === 'client'
              ? setClientForm({ ...clientForm, name: e.target.value })
              : setLawyerForm({ ...lawyerForm, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
          value={userType === 'client' ? clientForm.email : lawyerForm.email}
          onChange={(e) =>
            userType === 'client'
              ? setClientForm({ ...clientForm, email: e.target.value })
              : setLawyerForm({ ...lawyerForm, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
          value={userType === 'client' ? clientForm.password : lawyerForm.password}
          onChange={(e) =>
            userType === 'client'
              ? setClientForm({ ...clientForm, password: e.target.value })
              : setLawyerForm({ ...lawyerForm, password: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          required
          className="w-full p-2 border rounded"
          value={userType === 'client' ? clientForm.confirmPassword : lawyerForm.confirmPassword}
          onChange={(e) =>
            userType === 'client'
              ? setClientForm({ ...clientForm, confirmPassword: e.target.value })
              : setLawyerForm({ ...lawyerForm, confirmPassword: e.target.value })
          }
        />

        {userType === 'lawyer' && (
          <>
            <input
              type="text"
              placeholder="Specialization"
              required
              className="w-full p-2 border rounded"
              value={lawyerForm.specialization}
              onChange={(e) => setLawyerForm({ ...lawyerForm, specialization: e.target.value })}
            />

            <input
              type="number"
              placeholder="Experience (years)"
              required
              className="w-full p-2 border rounded"
              value={lawyerForm.experience}
              onChange={(e) => setLawyerForm({ ...lawyerForm, experience: e.target.value })}
            />

            <input
              type="number"
              placeholder="Fees (in USD)"
              required
              className="w-full p-2 border rounded"
              value={lawyerForm.fees}
              onChange={(e) => setLawyerForm({ ...lawyerForm, fees: e.target.value })}
            />

            <input
              type="file"
              multiple
              required
              className="w-full p-2"
              onChange={(e) =>
                setLawyerForm({ ...lawyerForm, documents: Array.from(e.target.files) })
              }
            />
          </>
        )}

        <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
