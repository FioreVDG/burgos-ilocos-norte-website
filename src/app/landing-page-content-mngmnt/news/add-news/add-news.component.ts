import { UploadFileDropBox } from './../../../models/api/announcement-service.interface';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { GetTempLinkDropBox } from 'src/app/models/api/announcement-service.interface';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { NewsService } from 'src/app/services/news/news.service';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss'],
})
export class AddNewsComponent implements OnInit {
  isLinear = true;
  acceptedDocs: string = '.png, .jpeg, .jpg';
  allowedFileTypes = ['png', 'jpeg', 'jpg'];
  imageFile: File | null;
  imageB64: string = '';

  newsForm: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  newsImageForm: FormGroup = this.fb.group({
    image: new FormControl(''),
  });
  saving: boolean = false;

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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddNewsComponent>,
    private fb: FormBuilder,
    private news: NewsService,
    private dropbox: DropboxService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.newsForm.controls['title'].setValue(this.data.title);
      this.newsForm.controls['description'].setValue(this.data.description);

      if (this.data.image)
        this.dropbox
          .getTempLink(this.data.image.path_lower!)
          .pipe(map((response: GetTempLinkDropBox) => response.result.link))
          .subscribe((link: string) => {
            this.imageB64 = link;
          });
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

  updateNews(news: any) {
    this.news.update(news, this.data._id).subscribe(
      (res: any) => {
        this.saving = false;
        // console.log(res);
        this.dialogRef.close(true);
      },
      (err) => {
        console.error(err);
        this.saving = false;
        this.dialogRef.close(true);
      }
    );
  }

  createNews(news: any) {
    this.news.create(news).subscribe(
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
      const path = '/burgos-ilocosnorte/news/';
      const fileType = this.imageFile.type.split('/')[1];
      const dateNow = Date.now();
      const name = this.imageFile.name.split('.')[0];
      const fileName = `${name}-${dateNow}.${fileType}`;

      this.dropbox
        .uploadFile(path, fileName, this.imageFile)
        .subscribe((res: UploadFileDropBox) => {
          const imageData = res.result;
          this.newsImageForm.controls['image'].setValue(imageData);

          const image = this.newsImageForm.getRawValue();
          const news = this.newsForm.getRawValue();

          const newsData: any = {
            ...image,
            ...news,
          };

          if (this.data) this.updateNews(newsData);
          else this.createNews(newsData);
        });
    } else {
      const news = this.newsForm.getRawValue();
      if (this.data) this.updateNews(news);
      else this.createNews(news);
    }
  }
}
