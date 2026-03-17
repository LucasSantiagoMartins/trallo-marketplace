import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import { Notification } from "@/types/notification";

export async function getNotifications(): Promise<ApiResponse<Notification[]>> {
    const res = await http.get<Notification[]>(endpoints.notifications.list);
    return res;
}

export async function markAsRead(id: string): Promise<ApiResponse<any>> {
    const res = await http.patch<any>(endpoints.notifications.read(id), {});
    return res;
}

export async function deleteNotification(id: string): Promise<ApiResponse<any>> {
    const res = await http.delete<any>(endpoints.notifications.delete(id));
    return res;
}

export async function clearAllNotifications(): Promise<ApiResponse<any>> {
    const res = await http.delete<any>(endpoints.notifications.deleteAll);
    return res;
}