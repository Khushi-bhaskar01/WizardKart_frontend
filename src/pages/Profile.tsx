import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import type { User } from '../lib/api';
import { Wand, ScrollText, Sparkles, User as UserIcon } from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await api.getMe();
        setUser(userData);
      } catch (err) {
        console.error('Failed to fetch user', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleReapply = () => {
    navigate('/apply-seller', {
      state: { 
        previousAnswers: user?.sellerApplication?.answers || []
      }
    });
  };

  if (loading) return (
    <div className="text-center p-8 text-white">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mb-4"></div>
      <p>Loading your magical profile...</p>
    </div>
  );

  if (error) return (
    <div className="text-center p-8 text-red-400">
      <p>{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
      >
        Try Again
      </button>
    </div>
  );

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Success message from application submission */}
      {location.state?.success && (
        <div className="bg-green-500/20 border border-green-500 text-green-200 p-4 rounded mb-6">
          {location.state.success}
        </div>
      )}

      <div className="flex items-center mb-6">
        <UserIcon className="h-8 w-8 text-blue-400 mr-2" />
        <h1 className="text-2xl font-bold text-white">Your Wizard Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-white">Account Details</h2>
          <div className="space-y-3">
            <p><span className="font-medium text-gray-400">Name:</span> <span className="text-white">{user.name}</span></p>
            <p><span className="font-medium text-gray-400">Email:</span> <span className="text-white">{user.email}</span></p>
            <p><span className="font-medium text-gray-400">Account Type:</span> 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                user.role === 'admin' ? 'bg-purple-600 text-white' :
                user.isSeller ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
              }`}>
                {user.role === 'admin' ? 'Admin' : user.isSeller ? 'Verified Seller' : 'Wizard Customer'}
              </span>
            </p>
          </div>
        </div>

        {user.sellerApplication && (
          <div className="bg-yellow-500/10 rounded-lg p-6 border border-yellow-500/30">
            <div className="flex items-center mb-3">
              <ScrollText className="h-5 w-5 text-yellow-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Seller Application Status</h2>
            </div>
            <div className="space-y-3">
              <p><span className="font-medium text-gray-400">Status:</span> 
                <span className={`ml-2 capitalize ${
                  user.sellerApplication.status === 'approved' ? 'text-green-400' :
                  user.sellerApplication.status === 'rejected' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {user.sellerApplication.status}
                </span>
              </p>
              {user.sellerApplication.status === 'rejected' && (
                <div>
                  <p className="text-gray-300 text-sm mb-2">
                    You can reapply after improving your application.
                  </p>
                  <button
                    onClick={handleReapply}
                    className="text-sm px-3 py-1 bg-yellow-600/50 hover:bg-yellow-600/70 rounded-md"
                  >
                    Reapply Now
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {user.role === 'user' && !user.isSeller && (
        <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-lg p-6 border border-purple-500/30 mb-8">
          <div className="flex items-center mb-4">
            <Sparkles className="h-5 w-5 text-purple-300 mr-2" />
            <h2 className="text-xl font-semibold text-white">Become a Magical Seller</h2>
          </div>
          <p className="text-gray-300 mb-4">
            Sell your enchanted items to wizards worldwide! Complete our simple application to get started.
          </p>
          <Link 
            to="/apply-seller" 
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-md text-white hover:from-purple-700 hover:to-blue-700 transition-colors"
          >
            <Wand className="h-4 w-4 mr-2" />
            Apply to Sell
          </Link>
        </div>
      )}

      {user.isSeller && (
        <div className="bg-gradient-to-r from-green-900/40 to-teal-900/40 rounded-lg p-6 border border-green-500/30">
          <h2 className="text-xl font-semibold mb-4 text-white">Seller Dashboard</h2>
          <p className="text-gray-300 mb-4">
            Manage your magical products and track your sales.
          </p>
          <Link 
            to="/seller-dashboard" 
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 rounded-md text-white hover:from-green-700 hover:to-teal-700 transition-colors"
          >
            Go to Seller Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;