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
import { TourismService } from 'src/app/services/tourism/tourism.service';
import { GetTempLinkDropBox } from 'src/app/models/api/announcement-service.interface';
import { map } from 'rxjs/operators';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AddImageComponent } from './add-image/add-image.component';

@Component({
  selector: 'app-add-tourism',
  templateUrl: './add-tourism.component.html',
  styleUrls: ['./add-tourism.component.scss'],
})
export class AddTourismComponent implements OnInit {
  isLinear = true;
  acceptedDocs: string = '.png, .jpeg, .jpg';
  allowedFileTypes = ['png', 'jpeg', 'jpg'];
  imageFile: File | null;
  imageB64: string = '';

  touristForm: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  touristImageForm: FormGroup = this.fb.group({
    image: new FormControl(''),
  });
  saving: boolean = false;
  subImages: Array<any> = [];
  types = ['Tourist Spot', 'Festival'];

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
    public dialogRef: MatDialogRef<AddTourismComponent>,
    private fb: FormBuilder,
    private tourist: TourismService,
    private dropbox: DropboxService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.touristForm.controls['title'].setValue(this.data.title);
      this.touristForm.controls['description'].setValue(this.data.description);
      this.touristForm.controls['location'].setValue(this.data.location);
      this.touristForm.controls['longitude'].setValue(this.data.longitude);
      this.touristForm.controls['latitude'].setValue(this.data.latitude);
      this.touristForm.controls['type'].setValue(this.data.type);

      this.touristImageForm.controls['image'].setValue(this.data.image);
      console.log(this.touristForm);
      console.log(this.touristImageForm);
      if (this.data.image)
        this.dropbox
          .getTempLink(this.data.image.path_display)
          .pipe(map((response: GetTempLinkDropBox) => response.result.link))
          .subscribe((link: string) => {
            this.imageB64 = link;
          });
    }
  }

  createTouristSpot(touristSpot: any) {
    console.log(touristSpot);
    this.tourist.create(touristSpot).subscribe(
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

          if (this.allowedFileTypes.includes(fileType)) this.imageFile = file;
          else alert('Invalid file type');

          console.log(this.imageFile);
        });
      } else alert('Not a file');
    }
  }

  onRemoveImage() {
    this.imageFile = null;
    this.imageB64 = '';
  }

  addPhoto() {
    this.dialog
      .open(AddImageComponent, { width: '100%', height: 'auto' })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          console.log(res);
          this.subImages = res;
        }
      });
  }

  updateTouristSpot(touristSpot: any) {
    console.log(touristSpot);
    this.tourist.update(touristSpot, this.data._id).subscribe(
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

  save() {
    this.saving = true;
    if (this.touristImageForm.value.image !== '' || this.imageFile) {
      const path = '/burgos-ilocosnorte/tourism/';
      const fileType = this.imageFile?.type.split('/')[1];
      const dateNow = Date.now();
      const name = this.imageFile?.name.split('.')[0];
      const fileName = `${name}-${dateNow}.${fileType}`;

      this.dropbox
        .uploadFile(path, fileName, this.imageFile)
        .subscribe((res: any) => {
          const imageData = res.result;
          this.touristImageForm.controls['image'].setValue(imageData);

          const image = this.touristImageForm.getRawValue();
          const tourist = this.touristForm.getRawValue();

          const touristData: any = {
            ...image,
            ...tourist,
            subImages: [],
          };

          if (this.subImages.length) {
            this.subImages.forEach((el: any) => {
              const name = el.img.name.split('.')[0];
              const fileType = el.img.type.split('/')[1];
              const fileName = `${name}-${dateNow}.${fileType}`;
              this.dropbox
                .uploadFile(path, fileName, el.img)
                .subscribe((res: any) => {
                  console.log(res);
                  touristData.subImages.push({
                    img: res.result,
                  });
                  if (this.subImages.length === touristData.subImages.length) {
                    console.log(touristData);
                    if (this.data) this.updateTouristSpot(touristData);
                    else this.createTouristSpot(touristData);
                  }
                });
            });
          }
          console.log(touristData);
        });
    } else {
      const tourist = this.touristForm.getRawValue();
      const touristData: any = {
        ...tourist,
      };

      if (this.data) this.updateTouristSpot(touristData);
      else this.createTouristSpot(touristData);
    }
  }
}
