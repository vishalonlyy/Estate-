"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface SiteVisitFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  mobile: string;
  email: string;
  visitDate: string;
  visitTime: string;
  visitType: "virtual" | "physical";
  message: string;
  promotions: boolean;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  email?: string;
  visitDate?: string;
  visitTime?: string;
  message?: string;
}

export default function SiteVisitForm({ isOpen, onClose }: SiteVisitFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    visitDate: "",
    visitTime: "",
    visitType: "physical",
    message: "",
    promotions: false,
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Visit date validation
    if (!formData.visitDate) {
      newErrors.visitDate = "Visit date is required";
    } else {
      const selectedDate = new Date(formData.visitDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.visitDate = "Visit date cannot be in the past";
      }
    }

    // Visit time validation
    if (!formData.visitTime) {
      newErrors.visitTime = "Visit time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "site-visits"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: "pending",
      });

      setSuccess(true);
      setFormData({
        name: "",
        mobile: "",
        email: "",
        visitDate: "",
        visitTime: "",
        visitType: "physical",
        message: "",
        promotions: false,
      });
      
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);

    } catch (err) {
      setError("Failed to submit form. Please try again.");
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 mt-[25px]">
      <div className="relative scale-y-[0.9] bg-white/90 backdrop-blur-md rounded-xl p-6 w-full max-w-md shadow-xl border border-white/20">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
          disabled={loading}
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Schedule Site Visit
        </h2>

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            Site visit scheduled successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter Your Name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="grid xxsm:grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile *
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                  ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter Your Mobile Number"
              />
              {errors.mobile && (
                <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                  ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter Your Email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid xxsm:grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Visit Date *
              </label>
              <input
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                  ${errors.visitDate ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.visitDate && (
                <p className="mt-1 text-sm text-red-500">{errors.visitDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Visit Time *
              </label>
              <input
                type="time"
                name="visitTime"
                value={formData.visitTime}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                  ${errors.visitTime ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.visitTime && (
                <p className="mt-1 text-sm text-red-500">{errors.visitTime}</p>
              )}
            </div>
          </div>

          <div className="text-gray-800 text-sm">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Visit Type *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="visitType"
                  value="physical"
                  checked={formData.visitType === "physical"}
                  onChange={handleChange}
                  className="mr-2 text-emerald-600"
                />
                Physical Visit
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="visitType"
                  value="virtual"
                  checked={formData.visitType === "virtual"}
                  onChange={handleChange}
                  className="mr-2 text-emerald-600"
                />
                Virtual Visit
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Any specific requirements or questions?"
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="promotions"
              checked={formData.promotions}
              onChange={handleChange}
              id="promotions"
              className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label htmlFor="promotions" className="text-sm text-gray-600">
              Yes, I would like to receive updates & promotions
            </label>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-emerald-600 text-white py-2 px-4 rounded-lg 
              transition-colors ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-emerald-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}