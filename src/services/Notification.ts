import { ENotificationType } from "@/core/enums/ENotificationType";
import { NotificationDetails } from "@/core/types/NotificationDetails";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class NotificationService {
    private readonly _notifications: Map<number, NotificationDetails>;
    private _uniqueIdentifier: number;

    public constructor() {
        this._uniqueIdentifier = 0;
        this._notifications = new Map();
    }

    public addInfo(notificationText: string) {
        this.add(ENotificationType.INFO, notificationText);
    }

    public addWarn(notificationText: string) {
        this.add(ENotificationType.WARN, notificationText);
    }

    public addError(notificationText: string) {
        this.add(ENotificationType.ERROR, notificationText);
    }

    public addNetworkError() {
        this.addError("Aie! An network error has occurred, we're sorry.")
    }

    private add(notificationType: ENotificationType, notificationText: string): number {
        const currentIdentifier = this._uniqueIdentifier++;
        this._notifications.set(currentIdentifier, { identifier: currentIdentifier, type: notificationType, text: notificationText });
        return currentIdentifier;
    }

    public delete(uniqueIdentifier: number): void {
        if (this._notifications.has(uniqueIdentifier)) {
            this._notifications.delete(uniqueIdentifier);
        }
    }

    public get notifications(): IterableIterator<NotificationDetails> {
        return this._notifications.values();
    }

}


