// components/NotificationBell.jsx
import { Bell, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNotifications } from "../contexts/NotificationContext";

export function NotificationBell() {
    const { notifications, unreadCount, markAsRead } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-gray-100 rounded-full relative"
            >
                <Bell size={24} />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto">
                    <div className="p-4 border-b">
                        <h3 className="font-semibold">Notifications</h3>
                    </div>

                    {notifications.length === 0 ? (
                        <div className="p-4 text-gray-500">No new notifications</div>
                    ) : (
                        <div className="divide-y">
                            {notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    className={`p-4 hover:bg-gray-50 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
                                    onClick={() => {
                                        markAsRead(notification._id);
                                        // Add navigation logic to the channel if needed
                                    }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-sm font-medium">
                                                {notification.sender} {notification.type === 'mention' ? 'mentioned you' : 'sent a message'}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {notification.content}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-2">
                                                in {notification.channelName}
                                            </p>
                                        </div>
                                        {!notification.read && (
                                            <span className="text-blue-500">
                                                <Check size={16} />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}