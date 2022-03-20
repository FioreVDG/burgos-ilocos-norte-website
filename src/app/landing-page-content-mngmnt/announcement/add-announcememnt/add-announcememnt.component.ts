import { DropboxService } from './../../../services/dropbox/dropbox.service';
import { AnnouncementService } from './../../../services/announcement/announcement.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-add-announcememnt',
  templateUrl: './add-announcememnt.component.html',
  styleUrls: ['./add-announcememnt.component.scss'],
})
export class AddAnnouncememntComponent implements OnInit {
  isLinear = true;
  acceptedDocs: string = '.png, .jpeg, .jpg';
  allowedFileTypes = ['png', 'jpeg', 'jpg'];
  imageFile: File;
  imageB64: string = '';

  announcementForm: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  announcementImageForm: FormGroup = this.fb.group({
    image: new FormControl(''),
  });
  saving: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddAnnouncememntComponent>,
    private fb: FormBuilder,
    private announcement: AnnouncementService,
    private dropbox: DropboxService
  ) {}

  ngOnInit(): void {}

  dropped(files: NgxFileDropEntry[]) {
    const selectedFirstFile = files[0];
    console.log('selected File', selectedFirstFile);

    if (selectedFirstFile) {
      if (selectedFirstFile.fileEntry.isFile) {
        const fileEntry = selectedFirstFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {
          const reader = new FileReader();

          reader.onload = () => {
            this.imageB64 = reader.result as string;
          };

          reader.readAsDataURL(file);

          console.log('fileentry file', file);
          const fileType = file.type.split('/')[1];

          if (this.allowedFileTypes.includes(fileType)) this.imageFile = file;
          else alert('Invalid file type');
        });
      } else alert('Not a file');
    }
  }

  save() {
    this.saving = true;
    if (this.imageFile) {
      const path = '/burgos-ilocosnorte/announcements/';
      const fileType = this.imageFile.type.split('/')[1];
      const dateNow = Date.now();
      const name = this.imageFile.name.split('.')[0];
      const fileName = `${name}-${dateNow}.${fileType}`;

      this.dropbox
        .uploadFile(path, fileName, this.imageFile)
        .subscribe((res: any) => {
          const imageData = res.result;
          this.announcementImageForm.controls['image'].setValue(imageData);

          const image = this.announcementImageForm.getRawValue();
          const annoucement = this.announcementForm.getRawValue();

          const announcementData = { ...image, ...annoucement };

          this.announcement.create(announcementData).subscribe(
            (res: any) => {
              console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
        });
    } else {
      let announcementData = this.announcementForm.getRawValue();
      this.announcement.create(announcementData).subscribe(
        (res: any) => {
          console.log(res);
          this.saving = false;
          this.dialogRef.close(true);
        },
        (err) => {
          console.log(err);
          this.saving = false;

          this.dialogRef.close(true);
        }
      );
    }
  }
}
