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
      url: new FormControl(''),
      image: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      position: info.position,
      misc: info.misc,
    });
  }

  get members(): FormGroup {
    return this.fb.group({
      url: new FormControl(''),
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

  addOffical(position: string) {
    if (position === 'mayor')
      this.getMayor().push(this.public_servant(this.pServants[0]));
    else if (position === 'viceMayor')
      this.getViceMayor().push(this.public_servant(this.pServants[1]));
    else if (position === 'member') this.getMembers().push(this.members);
  }
  removeOfficial(index: number, position: string) {
    if (position === 'mayor') this.getMayor().removeAt(index);
    else if (position === 'viceMayor') this.getViceMayor().removeAt(index);
    else if (position === 'member') this.getMembers().removeAt(index);
  }

  save() {
    let body = this.officials.getRawValue();

    let positions = ['mayor', 'viceMayor', 'members'];
    for (let p of positions) {
      body[p].forEach((e: any) => delete e.url);
    }

    this.content.createOfficial(body).subscribe((res: any) => {
      console.log(res);
      this.sb.open('Saved successfully', 'ok', {
        duration: 5000,
        panelClass: ['snackbar'],
      });
    });

    console.log(body);
  }

  upload(source: string, index: number) {
    this.dialog
      .open(UploadFileComponent, { disableClose: true })
      .afterClosed()
      .subscribe(async (res: any) => {
        console.log(res.path_display);

        let tempImg = await this.getTempLink(res.path_display);
        console.log(tempImg);

        if (source === 'mayor') {
          this.getMayor().at(index).get('url').patchValue(tempImg);
          this.getMayor().at(index).get('image').patchValue(res);
          // console.log(this.getMayor().at(index).get('image').value.image);
        } else if (source === 'viceMayor') {
          this.getViceMayor().at(index).get('url').patchValue(tempImg);
          this.getViceMayor().at(index).get('image').patchValue(res);
        } else if (source === 'members') {
          this.getMembers().at(index).get('url').patchValue(tempImg);
          this.getMembers().at(index).get('image').patchValue(res);
        }
      });
  }

  async getTempLink(data: any) {
    const response = await this.dropbox.getTempLink(data).toPromise();
    return response.result.link;
  }

  getOfficials() {
    this.content.getAllOfficials({}).subscribe(async (res: any) => {
      console.log(res);

      if (res.env.officials[0]) {
        let result = res.env.officials[0];

        this.officials.get('mayor')?.patchValue(result.mayor);
        this.officials.get('viceMayor')?.patchValue(result.viceMayor);
        let positions = ['mayor', 'viceMayor', 'members'];

        for (let p of positions) {
          let index = 0;
          for (let r of result[p]) {
            let tempImg = await this.getTempLink(r.image.path_display);
            if (p == 'mayor') {
              // console.log(this.getMayor().at(index).get('url'));
              this.getMayor().at(index).get('url').patchValue(tempImg);
            } else if (p === 'viceMayor') {
              this.getViceMayor().at(index).get('url').patchValue(tempImg);
            }
            if (p === 'members') {
              this.addOffical('member');
              this.officials.get('members')?.patchValue(result.members);
              this.getMembers().at(index).get('url').patchValue(tempImg);
            }
            index++;
          }
        }

        // this.loading = false;
      }
    });
  }
}
