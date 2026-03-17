import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import NotificationCard from "@/components/NotificationCard";
import PageHeader from "@/components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";
import Loader from "@/components/Loader";
import { Notification } from "@/types/notification";
import { useNotifications } from "@/hooks/useNotifications";
import {
  getNotifications,
  markAsRead,
  deleteNotification,
  clearAllNotifications,
} from "@/services/notification.service";

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const { newNotification } = useNotifications();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await getNotifications();
        console.log(res)
        if (res.success) setNotifications(res.data);
      } catch (err: any) {
        toast.error(err.message || "Falha ao carregar notificações");
      } finally {
        setIsPageLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (newNotification) {
      setNotifications((prev) => [newNotification, ...prev]);
      toast.success("Nova notificação recebida!");
    }
  }, [newNotification]);

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await markAsRead(id);
      if (res.success) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
        );
        toast.success(res.message);
      }
    } catch (err: any) {
      toast.error("Erro ao marcar como lida");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteNotification(id);
      if (res.success) {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        toast.success(res.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Erro ao deletar");
    }
  };

  const handleClearAll = async () => {
    try {
      const res = await clearAllNotifications();
      if (res.success) {
        setNotifications([]);
        toast.success(res.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Erro ao limpar notificações");
    }
  };

  if (isPageLoading) return <Loader size="lg" />;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-2xl mx-auto min-h-screen flex flex-col relative">
        <PageHeader
          title="Notificações"
          showUser={true}
          rightElement={
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 text-xs font-black text-rose-500 px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
            >
              <span className="material-symbols-outlined text-xl">
                delete_sweep
              </span>
              <span className="hidden sm:inline">LIMPAR TUDO</span>
            </button>
          }
        />

        <main className="flex-1 px-4 pt-24 pb-8 space-y-4 overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="flex flex-col gap-2">
              {notifications.map((item) => (
                <NotificationCard
                  key={item.id}
                  notification={item}
                  onDelete={() => handleDelete(item.id)}
                  onRead={() => handleMarkAsRead(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 text-slate-400">
              <span className="material-symbols-outlined text-5xl mb-2 block opacity-20">
                notifications_off
              </span>
              Nenhuma notificação por aqui.
            </div>
          )}
          <div className="h-28"></div>
        </main>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default NotificationsScreen;
