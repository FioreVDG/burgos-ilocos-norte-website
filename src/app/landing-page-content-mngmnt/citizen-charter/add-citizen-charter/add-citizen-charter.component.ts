import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { config } from 'rxjs';
import { CitizenCharterService } from 'src/app/services/citizen-charter/citizen-charter.service';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { map } from 'rxjs/operators';
import { GetTempLinkDropBox } from 'src/app/models/api/announcement-service.interface';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
@Component({
  selector: 'app-add-citizen-charter',
  templateUrl: './add-citizen-charter.component.html',
  styleUrls: ['./add-citizen-charter.component.scss'],
})
export class AddCitizenCharterComponent implements OnInit {
  isLinear = true;
  acceptedDocs: string = '.pdf';
  allowedFileTypes = ['pdf'];
  imageFile: File | null;
  imageB64: string = '';
  citizenCharterForm: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  citizenCharterFileForm: FormGroup = this.fb.group({
    file: new FormControl(''),
  });
  saving: boolean = false;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '25rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [[]],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddCitizenCharterComponent>,
    private fb: FormBuilder,
    private citizen: CitizenCharterService,
    private dropbox: DropboxService
  ) {}

  ngOnInit(): void {
    // console.log(this.data);
    if (this.data) {
      this.citizenCharterForm.controls['title'].setValue(this.data.title);
      this.citizenCharterForm.controls['description'].setValue(
        this.data.description
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

  createCitizenCharter(charter: any) {
    this.citizen.create(charter).subscribe(
      (res: any) => {
        this.saving = false;
        this.dialogRef.close(true);
        // console.log(res);
      },
      (err) => {
        console.error(err);
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
          // console.log(fileType);

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

  updateCitizenCharter(citizen: any) {
    this.citizen.update(citizen, this.data._id).subscribe(
      (res: any) => {
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
      const path = '/burgos-ilocosnorte/citizen-charter/';
      const fileType = this.imageFile.type.split('/')[1];
      const dateNow = Date.now();
      const name = this.imageFile.name.split('.')[0];
      const fileName = `${name}-${dateNow}.${fileType}`;

      this.dropbox
        .uploadFile(path, fileName, this.imageFile)
        .subscribe((res: any) => {
          const imageData = res.result;
          this.citizenCharterFileForm.controls['file'].setValue(imageData);

          const file = this.citizenCharterFileForm.getRawValue();
          const citizen = this.citizenCharterForm.getRawValue();
          const yearPosted = new Date().getFullYear();

          const citizenData: any = {
            ...file,
            ...citizen,
            yearPosted,
          };
          if (this.data) this.updateCitizenCharter(citizenData);
          else this.createCitizenCharter(citizenData);
        });
    } else {
      const citizen = this.citizenCharterForm.getRawValue();

      const legislativeData: any = {
        ...citizen,
      };

      if (this.data) this.updateCitizenCharter(legislativeData);
      else this.createCitizenCharter(legislativeData);
    }
  }
}
