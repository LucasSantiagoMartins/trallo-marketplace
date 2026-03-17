import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { io } from "socket.io-client";
import { Notification } from "@/types/notification";
import { useAuth } from "@/context/AuthContext";
import { getNotifications } from "@/services/notification.service";

interface NotificationContextData {
  notifications: Notification[];
  unreadCount: number;
  newNotification: Notification | null;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData,
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newNotification, setNewNotification] = useState<Notification | null>(
    null,
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const refreshNotifications = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res = await getNotifications();
      if (res.success) setNotifications(res.data);
    } catch (err) {
      console.error("Erro ao carregar notificações:", err);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshNotifications();
  }, [refreshNotifications]);

  useEffect(() => {
    if (!user?.token) return;

    const socket = io("http://localhost:9090/notifications", {
      auth: { token: `Bearer ${user.token}` },
    });

    socket.on("notification", (data: Notification) => {
      setNewNotification(data);
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.close();
    };
  }, [user?.token]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        newNotification,
        setNotifications,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
