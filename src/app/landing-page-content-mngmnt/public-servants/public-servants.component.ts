import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { ContentService } from 'src/app/services/content/content.service';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { UploadFileComponent } from 'src/app/shared/modals/upload-file/upload-file.component';
import { UploadFileDropBox } from 'src/app/models/api/announcement-service.interface';
@Component({
  selector: 'app-public-servants',
  templateUrl: './public-servants.component.html',
  styleUrls: ['./public-servants.component.scss'],
})
export class PublicServantsComponent implements OnInit {
  pServants = [
    { position: 'Municipal Mayor', misc: 'Office of the Mayor' },
    {
      position: 'Municipal Vice Mayor',
      misc: 'Office of the Sangguniang Bayan',
    },
  ];
  imageFile: File | null;
  imageB64: string = '';
  allowedFileTypes = ['jpg', 'png'];
  constructor(
    private fb: FormBuilder,
    private content: ContentService,
    private sb: MatSnackBar,
    private dialog: MatDialog,
    private dropbox: DropboxService
  ) {}

  ngOnInit(): void {
    this.getOfficials();
  }

  officials = new FormGroup({
    mayor: new FormArray([this.public_servant(this.pServants[0])]),
    viceMayor: new FormArray([this.public_servant(this.pServants[1])]),
    members: new FormArray([]),
  });

  public_servant(info: any): FormGroup {
    return this.fb.group({
      image: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      position: info.position,
      misc: info.misc,
    });
  }

  get members(): FormGroup {
    return this.fb.group({
      image: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
    });
  }

  getMayor(): any {
    return this.officials.get('mayor') as FormArray;
  }
  getViceMayor(): any {
    return this.officials.get('viceMayor') as FormArray;
  }
  getMembers(): any {
    return this.officials.get('members') as FormArray;
  }

  addMember() {
    this.getMembers().push(this.members);
  }
  removeMember(index: number) {
    this.getMembers().removeAt(index);
  }

  save() {
    //loop through arrays then mag upload sa db before saving sa database
    for (let mayor of this.getMayor().controls) {
      // console.log(mayor.value.image.file);
      // console.log(mayor.value.image.path);
      // console.log(mayor.value.image.fileName);

      let file = mayor.value.image.file;
      let filename = mayor.value.image.fileName;
      let path = mayor.value.image.path;

      this.uploadDropbox(file, path, filename);
    }

    // for (let mayor of this.getViceMayor().controls) {
    //   console.log(mayor.value.image.file);
    //   console.log(mayor.value.image.path);
    //   console.log(mayor.value.image.fileName);
    // }

    // for (let mayor of this.getMembers().controls) {
    //   console.log(mayor.value.image.file);
    //   console.log(mayor.value.image.path);
    //   console.log(mayor.value.image.fileName);
    // }

    // this.dropbox.uploadFile()
    // let body = this.officials.getRawValue();
    // this.content.createOfficial(body).subscribe((res: any) => {
    //   console.log(res);
    //   this.sb.open('Saved successfully', 'ok', {
    //     duration: 5000,
    //     panelClass: ['snackbar'],
    //   });
    // });

    console.log(this.officials.getRawValue());
  }

  uploadDropbox(file: any, path: string, filename: string) {
    this.dropbox
      .uploadFile(path, filename, file)
      .subscribe((res: UploadFileDropBox) => {
        console.log(res);
        let result = res.result;
      });
  }

  upload(source: string, index: number) {
    this.dialog
      .open(UploadFileComponent, {})
      .afterClosed()
      .subscribe((res: any) => {
        // console.log(res);

        if (source === 'mayor') {
          this.getMayor().at(index).get('image').patchValue(res);
          // console.log(this.getMayor().at(index).get('image').value.image);
        } else if (source === 'viceMayor') {
          this.getViceMayor().at(index).get('image').patchValue(res);
        } else if (source === 'members') {
          this.getMembers().at(index).get('image').patchValue(res);
        }
      });
  }

  getOfficials() {
    this.content.getAllOfficials({}).subscribe((res: any) => {
      if (res.env.officials[0]) {
        for (let r of res.env.officials[0].members) {
          this.addMember();
        }

        this.officials.get('mayor')?.patchValue(res.env.officials[0].mayor);
        this.officials
          .get('viceMayor')
          ?.patchValue(res.env.officials[0].viceMayor);
        this.officials.get('members')?.patchValue(res.env.officials[0].members);
        // this.loading = false;
      }
    });
  }
}
