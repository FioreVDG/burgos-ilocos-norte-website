import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { UploadFileDropBox } from 'src/app/models/api/announcement-service.interface';
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  uploading: boolean = true;
  imageFile: File | null;
  imageB64: string = '';
  allowedFileTypes = ['jpg', 'png', 'jpeg'];
  constructor(
    public dialogRef: MatDialogRef<UploadFileComponent>,
    private dropbox: DropboxService
  ) {}

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
          console.log(fileType);
          console.log(fileType, file);

          if (this.allowedFileTypes.includes(fileType)) {
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
            this.uploading = false;
            this.dropbox
              .uploadFile(path, fileName, file)
              .subscribe((res: UploadFileDropBox) => {
                // console.log(res.result);

                this.dialogRef.close(res.result);
              });
          } else alert('Invalid file type');
        });
      } else alert('Not a file');
    }
  }
  onClose() {
    this.dialogRef.close();
  }
}
