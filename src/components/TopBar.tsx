import React, { useState, useEffect } from 'react';
import { Menu, User, HelpCircle, Bell } from 'lucide-react';
import Profile from './Profile';
import Support from './Support';
import Notifications from './Notifications';

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSupportDropdown, setShowSupportDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Close profile dropdown
      if (showProfileDropdown && !target.closest('.profile-dropdown')) {
        setShowProfileDropdown(false);
      }
      
      // Close support dropdown
      if (showSupportDropdown && !target.closest('.support-dropdown')) {
        setShowSupportDropdown(false);
      }
      
      // Close notification dropdown
      if (showNotificationDropdown && !target.closest('.notification-dropdown')) {
        setShowNotificationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileDropdown, showSupportDropdown, showNotificationDropdown]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Nyatti Logo" 
                className="w-8 h-8 rounded-sm"
              />
              <h1 className="text-xl text-gray-900">
                <span className="font-bold">Nyatti</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative notification-dropdown">
              <button 
                onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                className="p-2 rounded-md hover:bg-gray-100 relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <Notifications 
                isOpen={showNotificationDropdown}
                onClose={() => setShowNotificationDropdown(false)}
              />
            </div>
            
            <div className="relative support-dropdown">
              <button 
                onClick={() => setShowSupportDropdown(!showSupportDropdown)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </button>
              <Support 
                isOpen={showSupportDropdown}
                onClose={() => setShowSupportDropdown(false)}
              />
            </div>
            
            <div className="relative profile-dropdown">
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <User className="w-5 h-5 text-gray-600" />
              </button>
              <Profile 
                isOpen={showProfileDropdown}
                onClose={() => setShowProfileDropdown(false)}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default TopBar;