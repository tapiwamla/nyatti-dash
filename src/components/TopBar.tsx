import React, { useState, useRef, useEffect } from 'react';
import { Menu, User, HelpCircle, ChevronDown, Bell } from 'lucide-react';
import ProfileModal from './ProfileModal';
import SupportModal from './SupportModal';
import NotificationModal from './NotificationModal';

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const [currency, setCurrency] = useState('USD');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  
  const profileRef = useRef<HTMLButtonElement>(null);
  const supportRef = useRef<HTMLButtonElement>(null);
  const notificationRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showProfileModal && profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileModal(false);
      }
      if (showSupportModal && supportRef.current && !supportRef.current.contains(event.target as Node)) {
        setShowSupportModal(false);
      }
      if (showNotificationModal && notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotificationModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileModal, showSupportModal, showNotificationModal]);

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
                className="w-8 h-8 rounded-lg"
              />
              <h1 className="text-xl text-gray-900">
                <span className="font-bold">Nyatti Pro</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100 text-sm font-medium"
              >
                <span>{currency}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showCurrencyDropdown && (
                <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button
                    onClick={() => {
                      setCurrency('USD');
                      setShowCurrencyDropdown(false);
                    }}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    USD
                  </button>
                  <button
                    onClick={() => {
                      setCurrency('KES');
                      setShowCurrencyDropdown(false);
                    }}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    KES
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                ref={notificationRef}
                onClick={() => setShowNotificationModal(!showNotificationModal)}
                className="p-2 rounded-md hover:bg-gray-100 relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <NotificationModal 
                isOpen={showNotificationModal}
                onClose={() => setShowNotificationModal(false)}
                anchorRef={notificationRef}
              />
            </div>
            
            <div className="relative">
              <button 
                ref={supportRef}
                onClick={() => setShowSupportModal(!showSupportModal)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </button>
              <SupportModal 
                isOpen={showSupportModal}
                onClose={() => setShowSupportModal(false)}
                anchorRef={supportRef}
              />
            </div>
            
            <div className="relative">
              <button 
                ref={profileRef}
                onClick={() => setShowProfileModal(!showProfileModal)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <User className="w-5 h-5 text-gray-600" />
              </button>
              <ProfileModal 
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
                anchorRef={profileRef}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default TopBar;