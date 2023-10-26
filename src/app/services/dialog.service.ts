import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { CustomAlertComponent } from '../shared/components/custom-alert/custom-alert.component';
import { ConfirmAlertComponent } from '../shared/components/confirm-alert/confirm-alert.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  dialogStatus : Subject<boolean> = new Subject<boolean>();

  constructor(private dialog : MatDialog) { }

  openConfirmDialog (data : any) {
    this.dialog.open(CustomAlertComponent, {data});
  }

  openConfirmDeleteDialog () {
    this.dialog.open(ConfirmAlertComponent);
  }

  setDialogStatus (status : boolean) { 
    this.dialogStatus.next(status);
  }
}
