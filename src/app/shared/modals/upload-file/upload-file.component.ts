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

  onFileUpload(files: NgxFileDropEntry[]) {
    console.log(files[0]);
    const selectedFirstFile = files[0];

    if (selectedFirstFile) {
      if (selectedFirstFile.fileEntry.isFile) {
        console.log('true');
        const fileEntry = selectedFirstFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {
          const reader = new FileReader();

          reader.readAsDataURL(file);

          const fileType = file.type.split('/')[1];
          console.log(fileType, file);

          if (this.allowedFileTypes.includes(fileType)) {
            reader.onload = () => {
              this.imageB64 = reader.result as string;
              console.log(file);

              // console.log(this.imageB64);
              const path = '/burgos-ilocosnorte/officials/';
              const fileType = file.type.split('/')[1];
              const dateNow = Date.now();
              const name = file.name.split('.')[0];
              const fileName = `${name}-${dateNow}.${fileType}`;

              let body = {
                image: this.imageB64,
                path,
                fileName,
                file,
              };
              console.log('body', body);
              this.dialogRef.close(body);
            };
          } else alert('Invalid file type');
        });
      } else alert('Not a file');
    }
  }
  onClose() {
    this.dialogRef.close();
  }
}
