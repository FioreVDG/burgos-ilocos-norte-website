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
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  loading: boolean = true;
  edited: boolean = false;
  constructor(
    private fb: FormBuilder,
    private content: ContentService,
    private sb: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getContactUs();
  }
  contactUs = new FormGroup({
    address: new FormControl('', [Validators.required]),
    numbers: new FormArray([]),
    emails: new FormArray([]),
  });

  get contactNum(): FormGroup {
    return this.fb.group({
      number: new FormControl('', [Validators.required]),
    });
  }

  get mail(): FormGroup {
    return this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  getNumbers(): any {
    return this.contactUs.get('numbers') as FormArray;
  }

  getEmails(): any {
    return this.contactUs.get('emails') as FormArray;
  }

  addNumbers() {
    this.getNumbers().push(this.contactNum);
    this.contactUs.markAsDirty();
  }

  addEmails() {
    this.getEmails().push(this.mail);
    this.contactUs.markAsDirty();
  }

  deleteNum(i: number) {
    this.dialog
      .open(AlertAreYouSureComponent, {
        data: {
          title: 'Delete',
          message: 'Are you sure you want to delete this number?',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.getNumbers().removeAt(i);
          this.contactUs.markAsDirty();
        }
      });
  }
  deleteMail(i: number) {
    this.dialog
      .open(AlertAreYouSureComponent, {
        data: {
          title: 'Delete',
          message: 'Are you sure you want to delete this email?',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.getEmails().removeAt(i);
          this.contactUs.markAsDirty();
        }
      });
  }

  onChange() {
    this.edited = true;
  }

  save() {
    let body = this.contactUs.getRawValue();

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
          console.log('saveeeddd');
          this.content.createContactUs(body).subscribe((res: any) => {
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

  getContactUs() {
    this.content.getAllContactUs({}).subscribe((res: any) => {
      console.log(res.env.contacts);
      if (res.env.contacts[0]) {
        let contacts = res.env.contacts[0];
        for (let mail of contacts.emails) {
          this.getEmails().push(this.mail);
        }
        for (let num of contacts.numbers) {
          this.getNumbers().push(this.contactNum);
        }
        this.contactUs.patchValue(contacts);
      }

      this.loading = false;
    });
  }
}
