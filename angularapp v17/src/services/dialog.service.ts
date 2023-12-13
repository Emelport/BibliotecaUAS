import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from '../app/message-box/message-box.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) { }

  openMessageBox(type: string, title: string, message: string): Promise<string> {
    return new Promise<string>((resolve) => {
      const dialogConfig: MatDialogConfig = {
        data: { type, title, message},
        hasBackdrop: type === 'info', // Hacer clic fuera del diálogo para cerrar solo cuando messageType sea "info"
      };

      const dialogRef = this.dialog.open(MessageBoxComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result: string) => {
        resolve(result);
      });
    });
  }
}
