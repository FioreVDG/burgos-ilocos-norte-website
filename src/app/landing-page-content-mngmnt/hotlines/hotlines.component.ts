import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { AlertAreYouSureComponent } from 'src/app/shared/modals/alert-are-you-sure/alert-are-you-sure.component';

@Component({
  selector: 'app-hotlines',
  templateUrl: './hotlines.component.html',
  styleUrls: ['./hotlines.component.scss'],
})
export class HotlinesComponent implements OnInit {
  //
  constructor(
    private fb: FormBuilder,
    private content: ContentService,
    private sb: MatSnackBar,
    private dialog: MatDialog
  ) {}
  hotlines: any;
  loading: boolean = true;
  edited: boolean = false;

  ngOnInit(): void {
    this.getAllHotlines();
  }

  contacts = new FormGroup({
    hotlines: new FormArray([]),
  });

  get numbers(): FormGroup {
    return this.fb.group({
      name: new FormControl('', [Validators.required]),
      contact_nums: new FormArray([]),
    });
  }

  get contact(): FormGroup {
    return this.fb.group({
      numbers: new FormControl('', [Validators.required]),
    });
  }
  getHotlines(): any {
    return this.contacts.get('hotlines') as FormArray;
  }

  number(index: number): any {
    return this.getHotlines().at(index).get('contact_nums') as FormArray;
  }

  addNumber(index: number) {
    this.number(index).push(this.contact);
    this.contacts.markAsDirty();
  }

  addHotlineBelow(index: number) {
    this.getHotlines().insert(index + 1, this.numbers);
    this.contacts.markAsDirty();
  }

  addHotlineAbove() {
    this.getHotlines().insert(0, this.numbers);
    this.contacts.markAsDirty();
  }
  deleteHotline(index: number) {
    this.dialog
      .open(AlertAreYouSureComponent, {
        disableClose: true,
        data: {
          title: 'Delete',
          message: 'Are you sure you want to delete this hotline?',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.getHotlines().removeAt(index);
          this.contacts.markAsDirty();
        }
      });
  }

  removeNum(hotlineNum: number, num_index: number) {
    this.dialog
      .open(AlertAreYouSureComponent, {
        disableClose: true,
        data: {
          title: 'Delete',
          message: 'Are you sure you want to delete this number?',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          const num = this.contacts.get('hotlines') as FormArray;
          (num.at(hotlineNum).get('contact_nums') as FormArray).removeAt(
            num_index
          );
          this.contacts.markAsDirty();
        }
      });
  }
  submit() {
    let body = this.contacts.getRawValue();

    this.dialog
      .open(AlertAreYouSureComponent, {
        disableClose: true,
        data: {
          title: 'Delete',
          message: 'Are you sure you want to save?',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.content.createHotline(body).subscribe((res: any) => {
            console.log(res);
            this.sb.open('Saved successfully', 'okay', {
              duration: 5000,
              panelClass: ['snackbar'],
            });
            this.edited = false;
          });
        }
      });
  }

  onChange() {
    this.edited = true;
  }
  getAllHotlines() {
    this.content.getAllHotline({}).subscribe((res: any) => {
      console.log(res);
      if (res.env.hotlines[0]) {
        this.hotlines = res.env.hotlines[0];

        for (let i in this.hotlines.hotlines) {
          this.getHotlines().push(this.numbers);
          for (let j in this.hotlines.hotlines[i].contact_nums) {
            this.number(Number(i)).push(this.contact);
          }
        }

        this.contacts.get('hotlines')?.patchValue(this.hotlines.hotlines);
      }

      this.loading = false;
    });
  }
}
