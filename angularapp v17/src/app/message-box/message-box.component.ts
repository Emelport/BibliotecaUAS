import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [MatDialogModule,MaterialModule,CommonModule],
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent {
  acceptOnly: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<MessageBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.messageType = this.data.type || 'info';
    this.messageTitle = this.data.title || 'Título del mensaje';
    this.messageContent = this.data.message || 'Este es un mensaje de ejemplo que puede variar según el tipo de mensaje';

    if (this.messageType === 'info' || this.messageType === 'error') {
      this.acceptOnly = true;
    }
  }

  messageType: string;
  messageTitle: string;
  messageContent: string;

  getIconClass(type: string): string {
    switch (type) {
      case 'info':
        return 'fas fa-info-circle info-icon';
      case 'warning':
        return 'fas fa-exclamation-triangle warning-icon';
      case 'success':
        return 'fas fa-check-circle success-icon';
      case 'error':
        return 'fas fa-times-circle error-icon';
      default:
        return 'fas fa-info-circle info-icon';
    }
  }

  accept(): void {
    this.dialogRef.close('accept');
  }

  reject(): void {
    this.dialogRef.close('reject');
  }
}
