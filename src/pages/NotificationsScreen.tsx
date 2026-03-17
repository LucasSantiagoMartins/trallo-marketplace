import React, { useState, useEffect } from "react";
import NotificationCard from "@/components/NotificationCard";
import PageHeader from "@/components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";
import ConfirmAction from "@/components/ConfirmAction";
import Loader from "@/components/Loader";
import { Notification } from "@/types/notification";

const INITIAL_MOCK: { section: string; data: Notification[] }[] = [
  {
    section: "Hoje",
    data: [
      {
        id: "1",
        title: "Pedido Confirmado",
        description: "O seu pedido foi processado com sucesso.",
        time: "14:30",
        type: "order",
        isRead: false,
        highlightText: "#TR1234",
      },
      {
        id: "2",
        title: "Pagamento Recebido",
        description: "Confirmamos o recebimento da compra.",
        time: "10:15",
        type: "payment",
        isRead: false,
        amount: "R$ 254,90",
      },
    ],
  },
  {
    section: "Ontem",
    data: [
      {
        id: "4",
        title: "Ticket Respondido",
        description: "Suporte respondeu ao seu chamado.",
        time: "18:20",
        type: "support",
        isRead: true,
      },
    ],
  },
];

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<
    { section: string; data: Notification[] }[]
  >([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    id?: string;
    type: "single" | "all";
  } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(INITIAL_MOCK);
      setIsPageLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((group) => ({
        ...group,
        data: group.data.map((item) =>
          item.id === id ? { ...item, isRead: true } : item,
        ),
      })),
    );
  };

  const triggerRemoveSingle = (id: string) => {
    setPendingAction({ id, type: "single" });
    setIsConfirmOpen(true);
  };

  const triggerRemoveAll = () => {
    setPendingAction({ type: "all" });
    setIsConfirmOpen(true);
  };

  const confirmAction = () => {
    if (!pendingAction) return;

    setIsActionLoading(true);

    setTimeout(() => {
      if (pendingAction.type === "single" && pendingAction.id) {
        setNotifications((prev) =>
          prev
            .map((group) => ({
              ...group,
              data: group.data.filter((item) => item.id !== pendingAction.id),
            }))
            .filter((group) => group.data.length > 0),
        );
      } else if (pendingAction.type === "all") {
        setNotifications([]);
      }

      setIsActionLoading(false);
      setIsConfirmOpen(false);
      setPendingAction(null);
    }, 1000);
  };

  if (isPageLoading) {
    return <Loader size="lg" />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-2xl mx-auto min-h-screen flex flex-col relative">
        <PageHeader
          title="Notificações"
          showUser={true}
          rightElement={
            <button
              onClick={triggerRemoveAll}
              className="flex items-center gap-1.5 text-xs font-black text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 px-3 py-2 rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-xl">
                delete_sweep
              </span>
              <span className="hidden sm:inline">LIMPAR TUDO</span>
            </button>
          }
        />

        <main className="flex-1 px-4 py-8 space-y-10 overflow-x-hidden overflow-y-auto">
          {notifications.map((group) => (
            <section key={group.section}>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5 px-2">
                {group.section}
              </h3>
              <div className="space-y-4">
                {group.data.map((item) => (
                  <NotificationCard
                    key={item.id}
                    notification={item}
                    onDelete={() => triggerRemoveSingle(item.id)}
                    onRead={() => handleMarkAsRead(item.id)}
                  />
                ))}
              </div>
            </section>
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              Nenhuma notificação por aqui.
            </div>
          )}
          <div className="h-24"></div>
        </main>

        <BottomNavigation />

        <ConfirmAction
          isOpen={isConfirmOpen}
          isLoading={isActionLoading}
          onClose={() => {
            if (!isActionLoading) {
              setIsConfirmOpen(false);
              setPendingAction(null);
            }
          }}
          onConfirm={confirmAction}
          title={
            pendingAction?.type === "all"
              ? "Limpar todas?"
              : "Apagar notificação?"
          }
          description={
            pendingAction?.type === "all"
              ? "Você está prestes a remover todas as suas notificações permanentemente."
              : "Esta ação não poderá ser desfeita e a notificação será removida da sua lista."
          }
          confirmText={
            pendingAction?.type === "all" ? "Sim, limpar tudo" : "Sim, apagar"
          }
          variant="danger"
          icon={pendingAction?.type === "all" ? "delete_sweep" : "delete"}
        />
      </div>
    </div>
  );
};

export default NotificationsScreen;
