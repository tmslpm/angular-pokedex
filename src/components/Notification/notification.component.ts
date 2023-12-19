import { NotificationDetails } from "@/core/types/NotificationDetails";
import { NotificationService } from "@/services/Notification";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ENotificationType } from "@/core/enums/ENotificationType";

@Component({
  selector: "notification-component", standalone: true, imports: [CommonModule],
  templateUrl: "./notification.component.html", styleUrl: "./notification.component.scss"
})
export class NotificationComponent {
  private readonly _notificationService: NotificationService;

  public constructor(notificationService: NotificationService) {
    this._notificationService = notificationService;
    /**
      for (let index = 0; index < 33;) {
        this._notificationService.addInfo(index++ + " - Hi this is a info notification")
        this._notificationService.addWarn(index++ + " - Alert your password is invalid")
        this._notificationService.addError(index++ + " - Aie error occured")
      }
     */
  }

  public get notifications(): NotificationDetails[] {
    // copy array for prevent Error:NG0100 https://angular.io/errors/NG0100 
    return Array.from(this._notificationService.notifications);
  }

  public notificationType(currentType: ENotificationType): string {
    return (ENotificationType as any)[currentType];
  }

  public onRemoveNotification(uniqueIdentifier: number): void {
    this._notificationService.delete(uniqueIdentifier);
  }

}
