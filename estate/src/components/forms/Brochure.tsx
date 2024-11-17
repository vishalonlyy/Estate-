'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface BrochureFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  mobile: string;
  email: string;
  promotions: boolean;
}

export default function BrochureForm({ isOpen, onClose }: BrochureFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    email: '',
    promotions: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const downloadBrochure = () => {
    const driveId = '1QSquIqC3X9Zlr57Q8lKfUfCj_YCj4ICE';
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${driveId}`;
    window.open(downloadUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Save to Firebase
      await addDoc(collection(db, 'brochure-requests'), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      // Download brochure
      downloadBrochure();
      
      // Close form
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        mobile: '',
        email: '',
        promotions: false
      });

    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 mt-[25px]">
      <div className="relative bg-white/90 backdrop-blur-md rounded-xl p-6 w-full max-w-md shadow-xl border border-white/20">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Download Brochure</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter Your Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
            <input 
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              placeholder="Enter Your Mobile Number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter Your Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div className="flex items-start gap-2">
            <input 
              type="checkbox"
              name="promotions"
              checked={formData.promotions}
              onChange={handleChange}
              id="promotions"
              required
              className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label htmlFor="promotions" className="text-sm text-gray-600">
              Yes, I would like to receive updates & promotions from Team Shaurya Infrazone Pvt Ltd Limited.
            </label>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className={`w-full bg-emerald-600 text-white py-2 px-4 rounded-lg 
              transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-700'}`}
          >
            {loading ? 'Processing...' : 'Download Brochure'}
          </button>
        </form>
      </div>
    </div>
  );
}