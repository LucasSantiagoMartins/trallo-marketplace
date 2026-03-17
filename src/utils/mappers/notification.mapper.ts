import { NotificationType } from "@/enums/notification.enums";

export const notificationVisual: Record<NotificationType, { icon: string; color: string; label: string }> = {
    [NotificationType.ORDER_CREATED]: {
        icon: "package_2",
        color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
        label: "Novo Pedido",
    },
    [NotificationType.ORDER_ACCEPTED]: {
        icon: "check_circle",
        color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        label: "Pedido Aceite",
    },
    [NotificationType.ORDER_REJECTED]: {
        icon: "cancel",
        color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
        label: "Pedido Rejeitado",
    },
    [NotificationType.PAYMENT_CONFIRMED]: {
        icon: "payments",
        color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        label: "Pagamento Confirmado",
    },
    [NotificationType.WITHDRAWAL_CONFIRMED]: {
        icon: "account_balance_wallet",
        color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        label: "Levantamento",
    },
    [NotificationType.SHIPPED]: {
        icon: "local_shipping",
        color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
        label: "Enviado",
    },
    [NotificationType.DELIVERED]: {
        icon: "task_alt",
        color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        label: "Entregue",
    },
    [NotificationType.CHAT_MESSAGE]: {
        icon: "chat",
        color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
        label: "Mensagem",
    },
};

export function getNotificationVisual(type: NotificationType) {
    return notificationVisual[type] || notificationVisual[NotificationType.ORDER_CREATED];
}