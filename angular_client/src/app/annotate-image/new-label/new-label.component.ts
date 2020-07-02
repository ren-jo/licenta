import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-label',
  templateUrl: './new-label.component.html',
  styleUrls: ['./new-label.component.scss']
})
export class NewLabelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewLabelComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

  ngOnInit() {
  }

  addLabel(labelName){
    this.data.list.push(labelName.value);
    this.dialogRef.close();
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close();
  }

}
