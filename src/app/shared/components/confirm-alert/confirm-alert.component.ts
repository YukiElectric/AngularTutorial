import { Component } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-confirm-alert',
  templateUrl: './confirm-alert.component.html',
  styleUrls: ['./confirm-alert.component.css']
})
export class ConfirmAlertComponent {
  constructor (private dialogService : DialogService) {}
  confirmDelete() {
    this.dialogService.setDialogStatus(true);
  }
}
