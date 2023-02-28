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
import { ContentService } from 'src/app/services/content/content.service';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { AlertAreYouSureComponent } from 'src/app/shared/modals/alert-are-you-sure/alert-are-you-sure.component';
import { UploadFileComponent } from 'src/app/shared/modals/upload-file/upload-file.component';

@Component({
  selector: 'app-officials',
  templateUrl: './officials.component.html',
  styleUrls: ['./officials.component.scss'],
})
export class OfficialsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private content: ContentService,
    private dropbox: DropboxService,
    private dialog: MatDialog,
    private sb: MatSnackBar
  ) {}
  loading: boolean = true;
  officials_data: any;

  ngOnInit(): void {
    this.getAllOfficial();
  }

  officials = new FormGroup({
    content: new FormArray([this.rows]),
  });

  get rows(): FormArray {
    return this.fb.array([this.official]);
  }

  get official(): FormGroup {
    return this.fb.group({
      url: new FormControl(''),
      image: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      misc: new FormControl(''),
    });
  }

  getContent(): any {
    return this.officials.get('content') as FormArray;
  }

  getRows(index: number): any {
    return this.getContent().at(index) as FormArray;
  }

  addRow() {
    this.getContent().push(this.rows);
    this.officials.markAsDirty();
  }

  addRowBelow(index: number) {
    this.getContent().insert(index + 1, this.rows);
    this.officials.markAsDirty();
  }

  addCol(index: number) {
    this.getContent().at(index).push(this.official);
    this.officials.markAsDirty();
  }

  removeRow(index: number) {
    this.dialog
      .open(AlertAreYouSureComponent, {
        disableClose: true,
        data: {
          title: 'Delete',
          message: 'Are you sure you want to delete this entire row?',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          //removes the entire row
          this.getContent().removeAt(index);
          this.officials.markAsDirty();
        }
      });
  }

  removeCol(rowNum: number, colNum: number) {
    this.dialog
      .open(AlertAreYouSureComponent, {
        disableClose: true,
        data: {
          title: 'Delete',
          message: 'Are you sure you want to delete this information?',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.getContent().at(rowNum).removeAt(colNum);
          this.officials.markAsDirty();
        }
      });
  }

  save() {
    let body = this.officials.getRawValue();

    for (let row of body.content) {
      for (let col of row) {
        delete col.url;
      }
    }

    console.log(body);

    this.dialog
      .open(AlertAreYouSureComponent, {
        disableClose: true,
        data: {
          title: 'Save',
          message: 'Are you sure you want to save this information?',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.content.createPubServant(body).subscribe((res: any) => {
            console.log(res);
            this.sb.open('Saved successfully', 'okay', {
              duration: 5000,
              panelClass: ['snackbar'],
            });
          });
        }
      });
  }

  async getTempLink(data: any) {
    const response = await this.dropbox.getTempLink(data).toPromise();
    return response.result.link;
  }

  upload(rowNum: number, colNum: number) {
    this.dialog
      .open(UploadFileComponent, { disableClose: true })
      .afterClosed()
      .subscribe(async (res: any) => {
        console.log(res.path_display);

        let tempImg = await this.getTempLink(res.path_display);
        this.getRows(rowNum).at(colNum).get('url').patchValue(tempImg);
        this.getRows(rowNum).at(colNum).get('image').patchValue(res);
      });
  }

  getAllOfficial() {
    this.content.getAllPubServant({}).subscribe(async (res: any) => {
      this.officials_data = res.env.officials[0];
      console.log(this.officials_data);

      this.loading = false;
      let i = 0;
      let j = 0;
      for (let row of this.officials_data.content) {
        if (i != 0) this.getContent().push(this.rows); // will not add at first, since by default the array contains 1 formgroup already
        for (let col of row) {
          if (j != 0) this.getContent().at(i).push(this.official);
          this.officials.patchValue(this.officials_data);
          let tempImg = await this.getTempLink(col.image.path_display);
          this.getRows(i).at(j).get('url').patchValue(tempImg);
          j = j + 1;
        }
        i = i + 1;
        j = 0;
      }
    });
  }
}
