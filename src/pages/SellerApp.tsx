import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../lib/api';
import { Wand, ScrollText, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
const SellerApplication = () => {
  const location = useLocation();
  const previousApplication = location.state?.previousApplication || {
    shopName: '',
    description: '',
    why: ''
  };
  
  const [formData, setFormData] = useState({
    shopName: previousApplication.shopName,
    description: previousApplication.description,
    why: previousApplication.why
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields are filled
    if (!formData.shopName || !formData.description || !formData.why) {
      setError('Please fill out all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await api.applySeller({
        shopName: formData.shopName,
        description: formData.description,
        why: formData.why
      });
      
      navigate('/profile', {
        state: { 
          success: 'Application submitted successfully! Our team will review it shortly.' 
        }
      });
    } catch (err: any) {
      console.error('Application error:', err);
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <Wand className="h-8 w-8 text-purple-500 mr-2" />
        <h1 className="text-2xl font-bold text-white">Become a WizardKart Seller</h1>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded mb-6">
          {error}
        </div>
      )}

      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-6">
        <div className="flex items-start mb-4">
          <Sparkles className="h-5 w-5 text-yellow-400 mt-1 mr-2" />
          <p className="text-gray-300">
            Our seller community specializes in authentic magical artifacts. 
            Please provide the following details for your application.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
          <label htmlFor="shopName" className="block text-lg font-medium text-yellow-400 mb-2">
            Shop Name
          </label>
          <input
            id="shopName"
            name="shopName"
            type="text"
            value={formData.shopName}
            onChange={handleChange}
            className="w-full bg-gray-900/50 text-white border border-gray-700 rounded p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
            minLength={3}
            placeholder="e.g., Ollivanders Wand Shop"
          />
        </div>

        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
          <label htmlFor="description" className="block text-lg font-medium text-yellow-400 mb-2">
            Shop Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-gray-900/50 text-white border border-gray-700 rounded p-3 min-h-[100px] focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
            minLength={20}
            placeholder="Briefly describe your magical shop"
          />
        </div>

        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
          <label htmlFor="why" className="block text-lg font-medium text-yellow-400 mb-2">
            Why do you want to sell on WizardKart?
          </label>
          <textarea
            id="why"
            name="why"
            value={formData.why}
            onChange={handleChange}
            className="w-full bg-gray-900/50 text-white border border-gray-700 rounded p-3 min-h-[100px] focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
            minLength={20}
            placeholder="Explain your motivation for selling magical items"
          />
        </div>

        <div className="flex justify-between items-center">
          <Link 
            to="/profile" 
            className="px-4 py-2 text-gray-300 hover:text-white"
          >
            ← Back to Profile
          </Link>
          
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-md font-medium flex items-center ${
              loading 
                ? 'bg-gray-600 text-gray-400' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerApplication;