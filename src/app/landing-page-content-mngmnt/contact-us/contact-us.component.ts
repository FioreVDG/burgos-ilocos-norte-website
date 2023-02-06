import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContentService } from 'src/app/services/content/content.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  loading: boolean = true;
  constructor(
    private fb: FormBuilder,
    private content: ContentService,
    private sb: MatSnackBar
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
  }

  addEmails() {
    this.getEmails().push(this.mail);
  }

  deleteNum(i: number) {
    this.getNumbers().removeAt(i);
  }
  deleteMail(i: number) {
    this.getEmails().removeAt(i);
  }

  save() {
    let body = this.contactUs.getRawValue();
    this.content.createContactUs(body).subscribe((res: any) => {
      console.log(res);
      this.sb.open('Saved successfully', 'ok', {
        duration: 5000,
        panelClass: ['snackbar'],
      });
    });
  }

  getContactUs() {
    this.content.getAllContactUs({}).subscribe((res: any) => {
      console.log(res.env.contacts);
      if (res.env.contacts[0]) {
        let contacts = res.env.contacts[0];
        for (let mail of contacts.emails) {
          this.addEmails();
        }
        for (let num of contacts.numbers) {
          this.addNumbers();
        }
        this.contactUs.patchValue(contacts);
      }

      this.loading = false;
    });
  }
}
