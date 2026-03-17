import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { io, Socket } from "socket.io-client";
import { Notification } from "@/types/notification";
import { useAuth } from "@/context/AuthContext";
import { getNotifications } from "@/services/notification.service";

interface NotificationContextData {
  notifications: Notification[];
  unreadCount: number;
  newNotification: Notification | null;
  socket: Socket | null;
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
  const [socket, setSocket] = useState<Socket | null>(null);

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

    const newSocket = io("http://localhost:9090/notifications", {
      auth: { token: `Bearer ${user.token}` },
    });

    newSocket.on("connect", () => console.log("✅ Connected to Notifications"));

    newSocket.on("notification", (data: Notification) => {
      setNewNotification(data);
      setNotifications((prev) => [data, ...prev]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user?.token]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        newNotification,
        socket,
        setNotifications,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications deve ser usado dentro de um NotificationProvider",
    );
  }
  return context;
};
