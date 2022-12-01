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
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { TransparencyService } from 'src/app/services/transparency/transparency.service';

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
  loading: boolean = false;
  transparencyForm: FormGroup = this.fb.group({
    description: new FormControl('', [Validators.required]),
    transparencyType: new FormControl('', [Validators.required]),
  });
  files: Array<any> = [];
  filesArrCopy: Array<any> = [];
  hasChanges: boolean = false;

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
    let temp: any = [];
    if (this.data) {
      this.loading = true;
      this.filesArrCopy = this.data.files;
      this.files = this.data.files;
      this.transparencyForm.controls['description'].setValue(
        this.data.description
      );
      this.transparencyForm.controls['transparencyType'].setValue(
        this.data.transparencyType
      );
      if (this.data.files.length) {
        for (let i of this.data.files) {
          i.rootFile = true;
          this.dropbox
            .getTempLink(i.file?.path_display)
            .subscribe((res: any) => {
              temp.push({ link: res.result });
              if (temp.length === this.data.files.length) this.loading = false;
            });
        }
      }
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
        console.error(err);
        this.saving = false;
        this.dialogRef.close(true);
      }
    );
  }

  addFile() {
    let data: any;
    this.data ? (data = this.data.files) : null;
    let didChange: boolean = false;
    this.dialog
      .open(AddTransparencyFileComponent, {
        width: '100%',
        height: 'auto',
        data: data,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          console.log(res);
          this.files = res;
          let findChanges: any = this.files.find(
            (o: any) => o.rootFile !== true
          );
          didChange = this.compareArr(this.filesArrCopy, this.files);
          console.log(findChanges, didChange);

          if (findChanges || didChange) {
            this.hasChanges = true;
            this.transparencyForm.markAsDirty();
          }
        }
      });
  }

  compareArr(arrCopy: any = [], arrExt: any = []) {
    if (
      arrCopy.length === arrExt.length &&
      arrCopy.every((val: any, i: any) => val === arrCopy[i])
    )
      return false;
    else return true;
  }

  updateTransparency(transparency: any) {
    this.transparency.update(transparency, this.data._id).subscribe(
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
    }
    if (this.data && this.hasChanges) {
      let fileArrCopy: any = [];
      fileArrCopy = this.files;
      console.log(fileArrCopy);
      let filterNewFile: any = this.files.filter(
        (f: any) => f.rootFile !== true
      );
      this.files = this.files.filter((o: any) => o.rootFile === true);
      console.log(filterNewFile);
      console.log(this.files);
      if (filterNewFile.length) {
        filterNewFile.forEach((el: any) => {
          let fileType = el.imgFile.type.split('/')[1];
          let name = el.imgFile.name.split('.')[0];
          const fileName = `${name}-${dateNow}.${fileType}`;
          let tempArr: any = [];
          this.dropbox
            .uploadFile(path, fileName, el.imgFile)
            .subscribe((res: any) => {
              console.log(res);
              this.files.push({ title: el.title, file: res.result });
              tempArr.push(el.title);
              console.log(this.files);
              if (tempArr.length === filterNewFile.length) {
                toSave.files = this.files;
                console.log(toSave);
                this.updateTransparency(toSave);
              }
            });
        });
      } else {
        toSave.files = this.files;
        this.updateTransparency(toSave);
      }
    }

    if (this.data && !this.hasChanges) {
      const toSave: any = {
        ...transparency,
        files: this.files,
      };
      this.updateTransparency(toSave);
    }
  }
}
