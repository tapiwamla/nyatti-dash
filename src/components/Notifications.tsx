import React from 'react';
import { Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface NotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Website Published',
      message: 'Your portfolio website has been successfully published.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Domain Renewal Reminder',
      message: 'Your domain mystore.com will expire in 30 days.',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Payment Method Update',
      message: 'Please update your payment method to avoid service interruption.',
      time: '3 days ago',
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 w-80">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Notifications</h3>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start space-x-3">
                  {getIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {notifications.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-center text-sm text-primary hover:text-primary-dark">
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;