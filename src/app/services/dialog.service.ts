import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { CustomAlertComponent } from '../shared/components/custom-alert/custom-alert.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog : MatDialog) { }

  openConfirmDialog (data : any) {
    this.dialog.open(CustomAlertComponent, {data});
  }
}
