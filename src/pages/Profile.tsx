import React, { useState } from 'react';
import { User, Crown, Shield, BookOpen, Sparkles, Award, Package, Settings, LogOut } from 'lucide-react';
import { HOUSES } from '../utils/constants';

const Profile: React.FC = () => {
  const [selectedHouse, setSelectedHouse] = useState<string>('GRYFFINDOR');
  const [activeTab, setActiveTab] = useState('profile');

  const userStats = {
    totalOrders: 12,
    loyaltyPoints: 2847,
    housePride: 95,
    magicalLevel: 'Advanced Wizard'
  };

  const recentOrders = [
    { id: '001', date: '2025-01-15', items: 3, total: 299.99, status: 'Delivered' },
    { id: '002', date: '2025-01-10', items: 1, total: 1499.99, status: 'Processing' },
    { id: '003', date: '2025-01-05', items: 2, total: 189.98, status: 'Delivered' }
  ];

  const getHouseIcon = (house: string) => {
    switch (house) {
      case 'GRYFFINDOR': return <Crown className="h-6 w-6" />;
      case 'SLYTHERIN': return <Shield className="h-6 w-6" />;
      case 'RAVENCLAW': return <BookOpen className="h-6 w-6" />;
      case 'HUFFLEPUFF': return <Sparkles className="h-6 w-6" />;
      default: return <Crown className="h-6 w-6" />;
    }
  };

  const getHouseColor = (house: string) => {
    switch (house) {
      case 'GRYFFINDOR': return 'from-red-600 to-yellow-600';
      case 'SLYTHERIN': return 'from-green-600 to-gray-400';
      case 'RAVENCLAW': return 'from-blue-600 to-yellow-600';
      case 'HUFFLEPUFF': return 'from-yellow-600 to-gray-800';
      default: return 'from-red-600 to-yellow-600';
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-black/80 to-purple-900/60 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-16 w-16 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r bg-red-600 rounded-full flex items-center justify-center border-4 border-black">
                {getHouseIcon(selectedHouse)}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Harry Potter
              </h1>
              <p className="text-xl text-gray-300 mb-4">{userStats.magicalLevel}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-black/40 px-4 py-2 rounded-lg border border-yellow-500/30">
                  <div className="text-yellow-400 font-bold">{userStats.totalOrders}</div>
                  <div className="text-gray-300 text-sm">Orders</div>
                </div>
                <div className="bg-black/40 px-4 py-2 rounded-lg border border-purple-500/30">
                  <div className="text-purple-400 font-bold">{userStats.loyaltyPoints}</div>
                  <div className="text-gray-300 text-sm">Loyalty Points</div>
                </div>
                <div className="bg-black/40 px-4 py-2 rounded-lg border border-green-500/30">
                  <div className="text-green-400 font-bold">{userStats.housePride}%</div>
                  <div className="text-gray-300 text-sm">House Pride</div>
                </div>
              </div>
            </div>

            {/* House Selection */}
            <div className="text-center">
              <h3 className="text-lg font-bold text-white mb-4">Your House</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(HOUSES).map(([key, house]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedHouse(key)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedHouse === key
                        ? `border-yellow-400 bg-gradient-to-br ${getHouseColor(key)}`
                        : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                    }`}
                  >
                    <div className={`flex flex-col items-center space-y-1 ${
                      selectedHouse === key ? 'text-white' : 'text-gray-400'
                    }`}>
                      {getHouseIcon(key)}
                      <span className="text-xs font-medium">{house.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-black/40 rounded-lg p-1">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'orders', label: 'Orders', icon: Package },
              { id: 'achievements', label: 'Achievements', icon: Award },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-yellow-500 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'profile' && (
              <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value="Harry"
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value="Potter"
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value="harry.potter@hogwarts.edu"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Owl Post Address
                    </label>
                    <textarea
                      rows={3}
                      value="4 Privet Drive, Little Whinging, Surrey"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
                
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg border border-yellow-500/20 p-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div>
                          <h3 className="font-bold text-white">Order #{order.id}</h3>
                          <p className="text-gray-300 text-sm">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-yellow-400 font-bold">${order.total}</p>
                          <p className="text-gray-300 text-sm">{order.items} items</p>
                        </div>
                        <div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'Delivered'
                              ? 'bg-green-600/50 text-green-200'
                              : 'bg-yellow-600/50 text-yellow-200'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Magical Achievements</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'First Purchase', description: 'Made your first magical purchase', earned: true },
                    { title: 'House Loyalty', description: 'Purchased 5 items from your house', earned: true },
                    { title: 'Potion Master', description: 'Collected 10 different potions', earned: false },
                    { title: 'Wand Collector', description: 'Own 3 different wands', earned: true },
                    { title: 'Magical Scholar', description: 'Purchased 20 magical books', earned: false },
                    { title: 'Quidditch Champion', description: 'Own a complete Quidditch set', earned: false }
                  ].map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        achievement.earned
                          ? 'bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-yellow-500/30'
                          : 'bg-gray-800/40 border-gray-600/30'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Award className={`h-8 w-8 ${
                          achievement.earned ? 'text-yellow-400' : 'text-gray-600'
                        }`} />
                        <div>
                          <h3 className={`font-bold ${
                            achievement.earned ? 'text-yellow-400' : 'text-gray-400'
                          }`}>
                            {achievement.title}
                          </h3>
                          <p className="text-gray-300 text-sm">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div className="border-b border-gray-600 pb-6">
                    <h3 className="text-lg font-bold text-white mb-4">Notifications</h3>
                    <div className="space-y-3">
                      {[
                        'Order updates via owl post',
                        'New magical item arrivals',
                        'House event notifications',
                        'Loyalty point updates'
                      ].map((setting, index) => (
                        <label key={index} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            defaultChecked={index < 2}
                            className="w-4 h-4 text-yellow-400 bg-gray-800 border-gray-600 rounded focus:ring-yellow-400"
                          />
                          <span className="text-gray-300">{setting}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-b border-gray-600 pb-6">
                    <h3 className="text-lg font-bold text-white mb-4">Privacy</h3>
                    <div className="space-y-3">
                      {[
                        'Make profile visible to other wizards',
                        'Share house achievements',
                        'Allow friend recommendations'
                      ].map((setting, index) => (
                        <label key={index} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            defaultChecked={index === 0}
                            className="w-4 h-4 text-yellow-400 bg-gray-800 border-gray-600 rounded focus:ring-yellow-400"
                          />
                          <span className="text-gray-300">{setting}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Danger Zone</h3>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200">
                      <LogOut className="h-4 w-4" />
                      <span>Delete Account</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* House Card */}
            <div className={`bg-gradient-to-br ${getHouseColor(selectedHouse)} p-6 rounded-xl border border-yellow-500/30`}>
              <div className="text-center text-white">
                <div className="mb-4">
                  {getHouseIcon(selectedHouse)}
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {HOUSES[selectedHouse as keyof typeof HOUSES].name}
                </h3>
                <div className="text-3xl font-bold mb-2">{userStats.housePride}%</div>
                <div className="text-sm opacity-90">House Pride</div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${userStats.housePride}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Loyalty Points */}
            <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Loyalty Rewards</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {userStats.loyaltyPoints}
                </div>
                <div className="text-gray-300 text-sm mb-4">Total Points</div>
                <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200">
                  Redeem Points
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 text-left">
                  Track Order
                </button>
                <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 text-left">
                  Return Item
                </button>
                <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 text-left">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;