import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    public dialogRef: MatDialogRef<AddTransparencyFileComponent>,
    private sb: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.filesArr = this.data;
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

  addFile() {
    let findExistingTitle: any = this.filesArr.find(
      (o: any) => o.title === this.fileTitle.value
    );
    if (findExistingTitle)
      this._showSnackBar('Title already exist! provide different title');
    else {
      this.filesArr.push({
        title: this.fileTitle.value,
        file: this.imageB64,
        imgFile: this.imageFile,
      });

      this.fileTitle.setValue('');
      this.imageB64 = '';
    }

    console.log(this.filesArr);
  }

  removeFile(item: any) {
    console.log(item);
    this.filesArr = this.filesArr.filter((el: any) => el.title !== item.title);
    // console.log(this.filesArr);
  }

  proceedAdding() {
    console.log(this.filesArr);
    this.dialogRef.close(this.filesArr);
  }

  private _showSnackBar(message: string, action: string = '') {
    this.sb.open(message, action, {
      duration: 1500,
    });
  }
}
