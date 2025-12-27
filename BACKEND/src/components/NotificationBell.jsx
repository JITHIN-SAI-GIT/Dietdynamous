import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import io from 'socket.io-client';

// Initialize socket outside component to prevent multiple connections
const socket = io('http://localhost:5000', {
  withCredentials: true,
  autoConnect: false // Connect only when authenticated/mounted
});

const NotificationBell = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userId) {
        socket.connect();
        
        socket.on('notification', (notification) => {
            setNotifications(prev => [notification, ...prev]);
            setUnreadCount(prev => prev + 1);
        });

        return () => {
            socket.off('notification');
            socket.disconnect();
        };
    }
  }, [userId]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button 
        onClick={toggleDropdown}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
      >
        <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
          <div className="p-3 border-b border-gray-100 dark:border-gray-700 font-semibold flex justify-between items-center text-gray-800 dark:text-white">
            <span>Notifications</span>
            {unreadCount > 0 && (
                <button className="text-xs text-blue-500 hover:underline" onClick={() => setUnreadCount(0)}>
                    Mark all read
                </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">
                No new notifications
              </div>
            ) : (
              notifications.map((notif, index) => (
                <div key={index} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-50 dark:border-gray-700 last:border-0">
                  <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200">{notif.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
