import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

@Injectable({
  providedIn: "root"
})

export class ModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: {modalResponse:string}) {}

  onNoClick(): boolean {
    this.dialogRef.close();
    return false;
  }

  onYesClick(): boolean {
    this.dialogRef.close();
    return true;
  }

}