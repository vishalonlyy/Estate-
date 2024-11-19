import { useState } from "react";
import { db } from '@/lib/firebase';
import { collection, addDoc } from "firebase/firestore";
import { X } from "lucide-react";

interface FormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  mobile: string;
  message: string;
  promotions: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
  message?: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  mobile: "",
  message: "",
  promotions: false,
};

const Forms = ({ isOpen, onClose }: FormProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "enquiries"), {
        ...formData,
        timestamp: new Date(),
      });
      
      setFormData(initialFormData);
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 1500);
      
    } catch (error) {
      console.error("Error adding document: ", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 mt-[25px]">
      <div className="relative bg-white/90 backdrop-blur-md rounded-xl p-6 w-full max-w-md shadow-xl border border-white/20">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
          disabled={isSubmitting}
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Enquire Form</h2>

        {submitStatus === 'success' && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            Form submitted successfully!
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            Failed to submit form. Please try again.
            {/* Error message */}
            
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input 
              id="name"
              name="name"
              type="text"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input 
              id="email"
              name="email"
              type="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile
            </label>
            <input 
              id="mobile"
              name="mobile"
              type="tel"
              placeholder="Enter Your Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
            {errors.mobile && (
              <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea 
              id="message"
              name="message"
              placeholder="Your Message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox"
              id="promotions"
              name="promotions"
              checked={formData.promotions}
              onChange={handleChange}
              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              disabled={isSubmitting}
            />
            <label htmlFor="promotions" className="text-sm text-gray-600">
              Yes, I would like to receive updates & promotions
            </label>
          </div>

          <button 
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 
              transition-colors disabled:bg-emerald-400 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forms;