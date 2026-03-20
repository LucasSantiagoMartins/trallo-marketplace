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
import { BASE_URL } from "@/api/endpoints";

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
    const newSocket = io(`${BASE_URL}/notifications`, {
      auth: { token: `Bearer ${user.token}` },
      transports: ["polling", "websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
    });

    newSocket.on("connect", () => {
      console.log("Conectado ao Socket no Mobile/Desktop");
    });

    newSocket.on("notification", (data: Notification) => {
      setNewNotification(data);
      setNotifications((prev) => {
        const exists = prev.find((n) => n.id === data.id);
        if (exists) return prev;
        return [data, ...prev];
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.off("notification");
      newSocket.off("connect");
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
