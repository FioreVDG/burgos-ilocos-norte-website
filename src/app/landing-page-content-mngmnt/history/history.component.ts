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
import { AlertAreYouSureComponent } from 'src/app/shared/modals/alert-are-you-sure/alert-are-you-sure.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private content: ContentService,
    private sb: MatSnackBar,
    private dialog: MatDialog
  ) {}
  loading: boolean = true;
  edited: boolean = false;
  ngOnInit(): void {
    this.getBurgos_Mayors();
  }

  officials = new FormGroup({
    mayors: new FormArray([]),
  });

  get mayor(): FormGroup {
    return this.fb.group({
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });
  }

  getMayors() {
    return this.officials.get('mayors') as FormArray;
  }

  addMayor() {
    this.getMayors().insert(0, this.mayor);
    this.officials.markAsDirty();
    // this.getMayors().push(this.mayor);
  }

  deleteMayor(index: number) {
    this.dialog
      .open(AlertAreYouSureComponent, {
        data: {
          title: 'Delete',
          message: 'Are you sure you want to delete this?',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.getMayors().removeAt(index);
          this.officials.markAsDirty();
        }
      });
  }

  submit() {
    let body = this.officials.getRawValue();

    this.dialog
      .open(AlertAreYouSureComponent, {
        data: {
          title: 'Submit',
          message: 'Are you sure you want to save changes?',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.content.createHistory(body).subscribe((res: any) => {
            console.log(res);
            this.sb.open('Saved successfully', 'ok', {
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

  getBurgos_Mayors() {
    this.content.getAllHistory({}).subscribe((res: any) => {
      // console.log(res.env.history[0].mayors);
      if (res.env.history[0]) {
        for (let r of res.env.history[0].mayors) {
          this.getMayors().push(this.mayor);
        }

        this.officials.get('mayors')?.patchValue(res.env.history[0].mayors);
        this.loading = false;
      }
    });
  }
}
