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
import { GetTempLinkDropBox } from 'src/app/models/api/announcement-service.interface';
import { map } from 'rxjs/operators';
import { AngularEditorConfig } from '@kolkov/angular-editor';

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
  types = ['Ordinance', 'Resolution', 'Executive Order'];

  legislativeForm: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    legislativeType: new FormControl('', [Validators.required]),
  });

  legislativeFileForm: FormGroup = this.fb.group({
    file: new FormControl(''),
  });

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

  saving: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddLegislativeComponent>,
    private fb: FormBuilder,
    private legislative: LegislativeService,
    private dropbox: DropboxService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.legislativeForm.controls['title'].setValue(this.data.title);
      this.legislativeForm.controls['description'].setValue(
        this.data.description
      );
      this.legislativeForm.controls['legislativeType'].setValue(
        this.data.legislativeType
      );

      if (this.data.file)
        this.dropbox
          .getTempLink(this.data.file.path_display)
          .pipe(map((response: GetTempLinkDropBox) => response.result.link))
          .subscribe((link: string) => {
            this.imageB64 = link;
          });
    }
  }

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

  onRemoveImage() {
    this.imageFile = null;
    this.imageB64 = '';
  }

  updateLegislative(legislative: any) {
    this.legislative.update(legislative, this.data._id).subscribe(
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
      const path = '/burgos-ilocosnorte/legislatives/';
      const fileType = this.imageFile.type.split('/')[1];
      const dateNow = Date.now();
      const name = this.imageFile.name.split('.')[0];
      const fileName = `${name}-${dateNow}.${fileType}`;

      this.dropbox
        .uploadFile(path, fileName, this.imageFile)
        .subscribe((res: any) => {
          const imageData = res.result;
          this.legislativeFileForm.controls['file'].setValue(imageData);

          const file = this.legislativeFileForm.getRawValue();
          const legislative = this.legislativeForm.getRawValue();
          const yearPosted = new Date().getFullYear();

          const legislativeData: any = {
            ...file,
            ...legislative,
            yearPosted,
          };

          if (this.data) this.updateLegislative(legislativeData);
          else this.createLegislative(legislativeData);
        });
    } else {
      const legislative = this.legislativeForm.getRawValue();
      const yearPosted = new Date().getFullYear();

      const legislativeData: any = {
        ...legislative,
        yearPosted,
      };

      if (this.data) this.updateLegislative(legislativeData);
      else this.createLegislative(legislativeData);
    }
  }
}
