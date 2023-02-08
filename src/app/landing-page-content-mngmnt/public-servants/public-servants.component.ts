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

  addMember() {
    this.getMembers().push(this.members);
  }
  removeMember(index: number) {
    this.getMembers().removeAt(index);
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
      .open(UploadFileComponent, {})
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
    this.content.getAllOfficials({}).subscribe((res: any) => {
      if (res.env.officials[0]) {
        console.log(res.env.officials[0]);
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
