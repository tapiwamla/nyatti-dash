import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShoppingCart,
  CreditCard,
  X,
  User,
  PieChart,
  Tag
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { to: '/', icon: PieChart, label: 'Dashboard' },
    { to: '/shops', icon: ShoppingCart, label: 'Shops' },
    { to: '/plans', icon: Tag, label: 'Plans' },
    { to: '/account', icon: User, label: 'Account' },
    { to: '/billing', icon: CreditCard, label: 'Billing' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
     
      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-full w-64 bg-gray-900 text-white z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>
       
        <nav className="px-4 py-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => onClose()}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;