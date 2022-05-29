import { AddTransparencyFileComponent } from './add-transparency-file/add-transparency-file.component';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { TransparencyService } from 'src/app/services/transparency/transparency.service';
import { GetTempLinkDropBox } from 'src/app/models/api/announcement-service.interface';
import { map } from 'rxjs/operators';
import { AngularEditorConfig } from '@kolkov/angular-editor';

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
    'Programs and Projects',
    'Awards and Recognition',
    'Annual Procurement Plan',
  ];

  transparencyForm: FormGroup = this.fb.group({
    // title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    transparencyType: new FormControl('', [Validators.required]),
  });

  files: Array<any> = [];

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
    public dialogRef: MatDialogRef<AddTransparencyComponent>,
    private fb: FormBuilder,
    private transparency: TransparencyService,
    private dropbox: DropboxService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      // this.transparencyForm.controls['title'].setValue(this.data.title);
      this.transparencyForm.controls['description'].setValue(
        this.data.description
      );
      this.transparencyForm.controls['transparencyType'].setValue(
        this.data.transparencyType
      );
      this.files = this.data.files;
      console.log(this.files);
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

  addFile() {
    let data: any;
    this.data ? (data = this.data.files) : null;
    this.dialog
      .open(AddTransparencyFileComponent, {
        width: '100%',
        height: 'auto',
        data: data,
      })
      .afterClosed()
      .subscribe((res: any) => {
        console.log(res);
        this.files = res;
      });
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
    const transparency = this.transparencyForm.getRawValue();
    const path = '/burgos-ilocosnorte/transparencies/';
    const dateNow = Date.now();
    console.log(transparency);
    this.saving = true;
    const toSave: any = {
      ...transparency,
      files: [],
    };

    if (this.files.length && !this.data) {
      console.log(this.files);
      this.files.forEach((el: any) => {
        console.log(el.imgFile);
        let fileType = el.fileType;
        let name = el.imgFile.name.split('.')[0];
        const fileName = `${name}-${dateNow}.${fileType}`;
        this.dropbox
          .uploadFile(path, fileName, el.imgFile)
          .subscribe((res: any) => {
            console.log(res);
            toSave.files.push({ title: el.title, file: res.result });
            if (this.files.length === toSave.files.length) {
              console.log(toSave);
              this.createTransparency(toSave);
            }
          });
      });
    } else {
      const toSave = { ...transparency, files: this.files };
      console.log(toSave);
      if (this.data) this.updateTransparency(toSave);
      else this.createTransparency(toSave);
    }

    // this.saving = true;
    // if (this.imageFile) {
    //   const path = '/burgos-ilocosnorte/transparencies/';
    //   const fileType = this.imageFile.type.split('/')[1];
    //   const dateNow = Date.now();
    //   const name = this.imageFile.name.split('.')[0];
    //   const fileName = `${name}-${dateNow}.${fileType}`;

    //   this.dropbox
    //     .uploadFile(path, fileName, this.imageFile)
    //     .subscribe((res: any) => {
    //       const imageData = res.result;
    //       this.transparencyFileForm.controls['file'].setValue(imageData);

    //       const file = this.transparencyFileForm.getRawValue();
    //       const legislative = this.transparencyForm.getRawValue();
    //       const year = new Date().getFullYear();
    //       const thumbnail = file;

    //       const legislativeData: any = {
    //         ...file,
    //         ...legislative,
    //         ...thumbnail,
    //         year,
    //       };
    //       console.log(legislativeData);
    //       if (this.data) this.updateTransparency(legislativeData);
    //       else this.createTransparency(legislativeData);
    //     });
    // } else {
    //   const legislative = this.transparencyForm.getRawValue();
    //   const year = new Date().getFullYear();

    //   const legislativeData: any = {
    //     ...legislative,
    //     year,
    //   };

    //   if (this.data) this.updateTransparency(legislativeData);
    //   else this.createTransparency(legislativeData);
    // }
  }
}
