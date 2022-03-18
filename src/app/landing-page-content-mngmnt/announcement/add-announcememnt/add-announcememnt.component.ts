import { AnnouncementService } from './../../../services/announcement/announcement.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-announcememnt',
  templateUrl: './add-announcememnt.component.html',
  styleUrls: ['./add-announcememnt.component.scss'],
})
export class AddAnnouncememntComponent implements OnInit {
  announcementForm: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddAnnouncememntComponent>,
    private fb: FormBuilder,
    private announcement: AnnouncementService
  ) {}

  ngOnInit(): void {}

  save() {
    let toAddData = this.announcementForm.getRawValue();
    console.log(toAddData);
    toAddData.image = 'asdadads';
    console.log(toAddData);
    this.announcement.create(toAddData).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
