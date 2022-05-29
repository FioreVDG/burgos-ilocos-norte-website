import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-add-transparency-file',
  templateUrl: './add-transparency-file.component.html',
  styleUrls: ['./add-transparency-file.component.scss'],
})
export class AddTransparencyFileComponent implements OnInit {
  acceptedDocs: string = '.pdf';
  allowedFileTypes = ['pdf'];
  imageFile: File | null;
  imageB64: string = '';
  filesArr: Array<any> = [];
  filesCopy: Array<any>;
  hasChanges: boolean = false;

  fileTitle = new FormControl('');
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddTransparencyFileComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.filesCopy = this.data;
      console.log(this.filesCopy);
      let comp = this.compareArr(this.data, this.data);
      console.log(comp);
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

  compareArr(arrCopy: any, arrExt: any) {
    if (
      arrCopy.length === arrExt.length &&
      arrCopy.every((val: any, i: any) => val === arrCopy[i])
    )
      return false;
    else return true;
  }

  addFile() {
    let fileType: any = this.imageFile?.name.split('.')[1];
    this.filesArr.push({
      title: this.fileTitle.value,
      file: this.imageB64,
      imgFile: this.imageFile,
      fileType: fileType,
    });

    this.fileTitle.setValue('');
    this.imageB64 = '';

    console.log(this.filesArr);
    this.hasChanges = this.compareArr(this.filesCopy, this.filesArr);
    console.log(this.hasChanges);
  }

  proceedAdding() {
    console.log(this.filesArr);
    this.dialogRef.close(this.filesArr);
  }
}
