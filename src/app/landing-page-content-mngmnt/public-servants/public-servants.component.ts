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
import { UploadFileComponent } from 'src/app/shared/modals/upload-file/upload-file.component';

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
    private dialog: MatDialog
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
      // image:new FormControl(''),
      name: new FormControl('', [Validators.required]),
      position: info.position,
      misc: info.misc,
    });
  }

  get members(): FormGroup {
    return this.fb.group({
      // image:new FormControl(''),
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

  upload() {
    this.dialog
      .open(UploadFileComponent, {})
      .afterClosed()
      .subscribe((res: any) => {
        console.log(res);
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
