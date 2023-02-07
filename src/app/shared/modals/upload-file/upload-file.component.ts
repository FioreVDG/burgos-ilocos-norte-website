import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  imageFile: File | null;
  imageB64: string = '';
  allowedFileTypes = ['jpg', 'png'];
  constructor(public dialogRef: MatDialogRef<UploadFileComponent>) {}

  ngOnInit(): void {}
  // onFileUpload(event: any) {
  //   console.log(event);
  // }
  onFileUpload(files: NgxFileDropEntry[]) {
    console.log(files[0]);
    const selectedFirstFile = files[0];

    if (selectedFirstFile) {
      if (selectedFirstFile.fileEntry.isFile) {
        console.log('true');
        const fileEntry = selectedFirstFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {
          const reader = new FileReader();

          reader.onload = () => {
            this.imageB64 = reader.result as string;
          };

          reader.readAsDataURL(file);

          const fileType = file.type.split('/')[1];
          console.log(fileType, file);

          if (this.allowedFileTypes.includes(fileType)) {
            console.log(file);
            // this.imageFile = file;
            const path = '/burgos-ilocosnorte/publicServants/';
            const fileType = file.type.split('/')[1];
            const name = file.name.split('.')[0];

            this.dialogRef.close(file);
          } else alert('Invalid file type');
        });
      } else alert('Not a file');
    }
  }
  onClose() {
    this.dialogRef.close();
  }
}
