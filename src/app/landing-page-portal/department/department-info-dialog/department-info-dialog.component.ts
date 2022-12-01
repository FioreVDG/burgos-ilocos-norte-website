import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-department-info-dialog',
  templateUrl: './department-info-dialog.component.html',
  styleUrls: ['./department-info-dialog.component.scss'],
})
export class DepartmentInfoDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DepartmentInfoDialogComponent>
  ) {
    // console.log(data);
  }

  ngOnInit(): void {}
}
