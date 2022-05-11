import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss'],
})
export class AddImageComponent implements OnInit {
  acceptedDocs: string = '.png, .jpeg, .jpg';
  allowedFileTypes = ['png', 'jpeg', 'jpg'];
  imageFile: File | null;
  imageB64: string = '';
  imagesArr: Array<any> = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddImageComponent>
  ) {}

  ngOnInit(): void {}

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

  addImage() {
    this.imagesArr.push({
      file: this.imageB64,
      img: this.imageFile,
    });

    this.imageB64 = '';
  }

  proceedAdding() {
    console.log(this.imagesArr);
    this.dialogRef.close(this.imagesArr);
  }
}
