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
import {
  Announcement,
  AnnouncementBody,
  GetTempLinkDropBox,
  UploadFileDropBox,
} from 'src/app/models/api/announcement-service.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-announcememnt',
  templateUrl: './add-announcememnt.component.html',
  styleUrls: ['./add-announcememnt.component.scss'],
})
export class AddAnnouncememntComponent implements OnInit {
  isLinear = true;
  acceptedDocs: string = '.png, .jpeg, .jpg';
  allowedFileTypes = ['png', 'jpeg', 'jpg'];
  imageFile: File | null;
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
    @Inject(MAT_DIALOG_DATA) public data: Announcement,
    public dialogRef: MatDialogRef<AddAnnouncememntComponent>,
    private fb: FormBuilder,
    private announcement: AnnouncementService,
    private dropbox: DropboxService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.announcementForm.controls['title'].setValue(this.data.title);
      this.announcementForm.controls['description'].setValue(
        this.data.description
      );

      if (this.data.image)
        this.dropbox
          .getTempLink(this.data.image.path_lower!)
          .pipe(map((response: GetTempLinkDropBox) => response.result.link))
          .subscribe((link: string) => {
            this.imageB64 = link;
          });
    }
  }

  dropped(files: NgxFileDropEntry[]) {
    const selectedFirstFile = files[0];

    if (selectedFirstFile) {
      if (selectedFirstFile.fileEntry.isFile) {
        const fileEntry = selectedFirstFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {
          const reader = new FileReader();

          reader.onload = () => {
            this.imageB64 = reader.result as string;
          };

          reader.readAsDataURL(file);

          const fileType = file.type.split('/')[1];
          console.log(fileType);

          if (this.allowedFileTypes.includes(fileType)) this.imageFile = file;
          else alert('Invalid file type');
        });
      } else alert('Not a file');
    }
  }

  onRemoveImage() {
    this.imageFile = null;
    this.imageB64 = '';
  }

  updateAnnouncement(announcement: AnnouncementBody) {
    this.announcement.update(announcement, this.data._id).subscribe(
      (_) => {
        this.saving = false;
        this.dialogRef.close(true);
      },
      (err) => {
        console.error(err);
        this.saving = false;
        this.dialogRef.close(true);
      }
    );
  }

  createAnnouncement(announcement: AnnouncementBody) {
    this.announcement.create(announcement).subscribe(
      (_) => {
        this.saving = false;
        this.dialogRef.close(true);
      },
      (err) => {
        console.error(err);
        this.saving = false;
        this.dialogRef.close(true);
      }
    );
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
        .subscribe((res: UploadFileDropBox) => {
          const imageData = res.result;
          this.announcementImageForm.controls['image'].setValue(imageData);

          const image = this.announcementImageForm.getRawValue();
          const annoucement = this.announcementForm.getRawValue();

          const announcementData: AnnouncementBody = {
            ...image,
            ...annoucement,
          };

          if (this.data) this.updateAnnouncement(announcementData);
          else this.createAnnouncement(announcementData);
        });
    } else {
      const annoucement = this.announcementForm.getRawValue();

      if (this.data) this.updateAnnouncement(annoucement);
      else this.createAnnouncement(annoucement);
    }
  }
}
