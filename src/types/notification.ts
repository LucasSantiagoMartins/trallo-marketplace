export interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'order' | 'payment' | 'support' | 'shipping';
    isRead: boolean;
    highlightText?: string;
    amount?: string;
}