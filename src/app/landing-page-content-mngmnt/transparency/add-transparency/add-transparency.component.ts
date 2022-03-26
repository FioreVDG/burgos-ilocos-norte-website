import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { TransparencyService } from 'src/app/services/transparency/transparency.service';
import { GetTempLinkDropBox } from 'src/app/models/api/announcement-service.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-transparency',
  templateUrl: './add-transparency.component.html',
  styleUrls: ['./add-transparency.component.scss'],
})
export class AddTransparencyComponent implements OnInit {
  isLinear = true;
  acceptedDocs: string = '.png, .jpeg, .jpg, .pdf';
  allowedFileTypes = ['png', 'jpeg', 'jpg', 'pdf'];
  imageFile: File | null;
  imageB64: string = '';
  types = [
    'Annual Budget',
    'Full Disclosure Policy',
    'Annual Investment Plan',
    'Statement of Debt Service',
    'Annual GAD Accomplishment Report',
    'Bids and Projects Results',
    'Alternative Mode of Procurement',
    'Annual Procurement Plan and Procurement List',
    'Programs and Projects',
    'Awards and Recognition',
  ];

  transparencyForm: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    transparencyType: new FormControl('', [Validators.required]),
  });

  transparencyFileForm: FormGroup = this.fb.group({
    image: new FormControl(''),
  });

  saving: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddTransparencyComponent>,
    private fb: FormBuilder,
    private transparency: TransparencyService,
    private dropbox: DropboxService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.transparencyForm.controls['title'].setValue(this.data.title);
      this.transparencyForm.controls['description'].setValue(
        this.data.description
      );

      this.transparencyForm.controls['transparencyType'].setValue(
        this.data.transparencyType
      );
      if (this.data.file)
        this.dropbox
          .getTempLink(this.data.file.path_lower!)
          .pipe(map((response: GetTempLinkDropBox) => response.result.link))
          .subscribe((link: string) => {
            this.imageB64 = link;
          });
    }
  }

  createTransparency(transparency: any) {
    this.transparency.create(transparency).subscribe(
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

  onRemoveImage() {
    this.imageFile = null;
    this.imageB64 = '';
  }

  updateTransparency(transparency: any) {
    this.transparency.update(transparency, this.data._id).subscribe(
      (res: any) => {
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
          this.transparencyFileForm.controls['image'].setValue(imageData);

          const file = this.transparencyFileForm.getRawValue();
          const legislative = this.transparencyForm.getRawValue();
          const year = new Date().getFullYear();
          const thumbnail = file;

          const legislativeData: any = {
            ...file,
            ...legislative,
            ...thumbnail,
            year,
          };

          if (this.data) this.updateTransparency(legislativeData);
          else this.createTransparency(legislativeData);
        });
    } else {
      const legislative = this.transparencyForm.getRawValue();
      const year = new Date().getFullYear();

      const legislativeData: any = {
        ...legislative,
        year,
      };

      if (this.data) this.updateTransparency(legislativeData);
      else this.createTransparency(legislativeData);
    }
  }
}