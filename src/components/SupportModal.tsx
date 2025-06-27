import React, { useEffect, useState } from 'react';
import { MessageCircle, Book, Mail, Phone } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
}

const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose, anchorRef }) => {
  const [position, setPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (isOpen && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right
      });
    }
  }, [isOpen, anchorRef]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 z-50 w-72"
      style={{ 
        top: `${position.top}px`, 
        right: `${position.right}px` 
      }}
    >
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Help & Support</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-md hover:bg-gray-100 text-left border border-gray-200">
            <MessageCircle className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-gray-900">Live Chat</p>
              <p className="text-sm text-gray-600">Get instant help from our team</p>
            </div>
          </button>
          
          <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-md hover:bg-gray-100 text-left border border-gray-200">
            <Book className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-gray-900">Documentation</p>
              <p className="text-sm text-gray-600">Browse our help articles</p>
            </div>
          </button>
          
          <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-md hover:bg-gray-100 text-left border border-gray-200">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-gray-900">Email Support</p>
              <p className="text-sm text-gray-600">support@nyatti.com</p>
            </div>
          </button>
          
          <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-md hover:bg-gray-100 text-left border border-gray-200">
            <Phone className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-gray-900">Phone Support</p>
              <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportModal;