import { NotificationType } from "@/enums/notification.enums";

export interface Notification {
    title: string;
    message: string;
    type: NotificationType,
    metadata: any,
    id: string,
    read: boolean,
    createdAt: Date,
}