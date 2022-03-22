import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { LegislativeService } from 'src/app/services/legislative/legislative.service';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-add-legislative',
  templateUrl: './add-legislative.component.html',
  styleUrls: ['./add-legislative.component.scss'],
})
export class AddLegislativeComponent implements OnInit {
  isLinear = true;
  acceptedDocs: string = '.png, .jpeg, .jpg, .pdf';
  allowedFileTypes = ['png', 'jpeg', 'jpg', 'pdf'];
  imageFile: File | null;
  imageB64: string = '';
  types = ['Internal Procedure', 'Ordinance', 'Resolution'];

  legislativeForm: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    legislativeType: new FormControl('', [Validators.required]),
  });

  legislativeFileForm: FormGroup = this.fb.group({
    image: new FormControl(''),
  });

  saving: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddLegislativeComponent>,
    private fb: FormBuilder,
    private legislative: LegislativeService,
    private dropbox: DropboxService
  ) {}

  ngOnInit(): void {}

  createLegislative(legislative: any) {
    this.legislative.create(legislative).subscribe(
      (res: any) => {
        this.saving = false;
        this.dialogRef.close(true);
        console.log(res);
      },
      (err) => {
        console.log(err);
        this.saving = false;
        this.dialogRef.close(true);
      }
    );
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
          this.legislativeFileForm.controls['image'].setValue(imageData);

          const image = this.legislativeFileForm.getRawValue();
          const legislative = this.legislativeForm.getRawValue();
          const yearPosted = new Date().getFullYear();

          const legislativeData: any = {
            ...image,
            ...legislative,
            yearPosted,
          };

          if (this.data) {
          } else this.createLegislative(legislativeData);
        });
    } else {
      const legislative = this.legislativeForm.getRawValue();
      const yearPosted = new Date().getFullYear();

      const legislativeData: any = {
        ...legislative,
        yearPosted,
      };

      if (this.data) {
      } else this.createLegislative(legislativeData);
    }
  }
}
