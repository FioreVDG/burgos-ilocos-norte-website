import {
  UploadFileDropBox,
  GetTempLinkDropBox,
} from './../../../models/api/announcement-service.interface';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { ServiceService } from 'src/app/services/service/service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss'],
})
export class AddServiceComponent implements OnInit {
  isLinear = true;
  acceptedDocs: string = '.png, .jpeg, .jpg, .pdf';
  allowedFileTypes = ['png', 'jpeg', 'jpg', 'pdf'];
  imageFile: File | null;
  imageB64: string = '';
  serviceForm: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  serviceImageForm: FormGroup = this.fb.group({
    file: new FormControl(''),
  });
  saving: boolean = false;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '25rem',
    placeholder: 'Enter description here...',
    translate: 'no',
    defaultParagraphSeparator: '',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['backgroundColor', 'htmlCode', 'insertImage', 'insertVideo', 'htmlCode'],
    ],
    customClasses: [
      {
        name: 'For Heading 1',
        class: 'titleText',
        tag: 'h1',
      },
      {
        name: 'For Heading 2',
        class: 'titleText',
        tag: 'h2',
      },
      {
        name: 'For Heading 3',
        class: 'titleText',
        tag: 'h3',
      },
    ],
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddServiceComponent>,
    private fb: FormBuilder,
    private service: ServiceService,
    private dropbox: DropboxService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.serviceForm.controls['title'].setValue(this.data.title);
      this.serviceForm.controls['description'].setValue(this.data.description);

      if (this.data.file)
        this.dropbox
          .getTempLink(this.data.file.path_lower!)
          .pipe(map((res: GetTempLinkDropBox) => res.result.link))
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

          if (this.allowedFileTypes.includes(fileType)) {
            this.imageFile = file;
            console.log(this.imageFile);
          } else alert('Invalid file type');
        });
      } else alert('Not a file');
    }
  }

  onRemoveImage() {
    this.imageFile = null;
    this.imageB64 = '';
  }

  updateService(service: any) {
    this.service.update(service, this.data._id).subscribe(
      (res: any) => {
        this.saving = false;
        console.log(res);
        this.dialogRef.close(true);
      },
      (err) => {
        console.log(err);
        this.saving = false;
        this.dialogRef.close(true);
      }
    );
  }

  createService(service: any) {
    this.service.create(service).subscribe(
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
      const path = '/burgos-ilocosnorte/services/';
      const fileType = this.imageFile.type.split('/')[1];
      const dateNow = Date.now();
      const name = this.imageFile.name.split('.')[0];
      const fileName = `${name}-${dateNow}.${fileType}`;

      this.dropbox
        .uploadFile(path, fileName, this.imageFile)
        .subscribe((res: UploadFileDropBox) => {
          const imageData = res.result;
          this.serviceImageForm.controls['file'].setValue(imageData);

          const image = this.serviceImageForm.getRawValue();
          const services = this.serviceForm.getRawValue();

          const serviceData: any = {
            ...image,
            ...services,
          };

          if (this.data) this.updateService(serviceData);
          else this.createService(serviceData);
        });
    } else {
      const service = this.serviceForm.getRawValue();
      if (this.data) this.updateService(service);
      else this.createService(service);
    }
  }
}
