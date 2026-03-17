import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Notification } from '@/types/notification';
import { useAuth } from '@/context/AuthContext';

export const useNotifications = () => {
  const { user } = useAuth();
  const [newNotification, setNewNotification] = useState<Notification | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!user?.token) return;

    const newSocket = io('http://localhost:9090/notifications', {
      auth: {
        token: `Bearer ${user.token}`
      }
    });

    newSocket.on('connect', () => console.log('✅ Connected to Notifications'));

    newSocket.on('notification', (data: Notification) => {
      setNewNotification(data);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user?.token]);

  return { newNotification, socket };
};