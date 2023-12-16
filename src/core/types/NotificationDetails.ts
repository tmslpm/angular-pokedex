import { ENotificationType } from "@/core/enums/ENotificationType"

export type NotificationDetails = {
    identifier: number,
    type: ENotificationType,
    text: string
}