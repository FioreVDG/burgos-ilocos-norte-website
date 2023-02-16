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
  selector: 'app-meaning-logo',
  templateUrl: './meaning-logo.component.html',
  styleUrls: ['./meaning-logo.component.scss'],
})
export class MeaningLogoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private content: ContentService,
    private sb: MatSnackBar,
    private dialog: MatDialog
  ) {}

  cards: any;
  loading: boolean = true;
  burgosLogo: string = '/assets/images/burgos-logo/burgos-logo.png';
  shield: string = '/assets/images/burgos-logo/shield-color.png';
  light: string = '/assets/images/burgos-logo/light.png';
  lightHouse: string = '/assets/images/burgos-logo/lighthouse.png';
  mountain: string = '/assets/images/burgos-logo/mountain.png';
  sea: string = '/assets/images/burgos-logo/sea.png';
  edited: boolean = false;

  images = [
    [this.shield],
    [this.lightHouse],
    [this.light],
    [this.mountain, this.sea],
  ];
  ngOnInit(): void {
    this.content.getAllLogoMeaning({}).subscribe((res: any) => {
      if (res.env.logo[0]) {
        this.cards = res.env.logo[0].cards;
        console.log(this.cards);

        for (let c of this.cards) {
          this.addCards();
        }

        this.logo.get('cards')?.patchValue(this.cards);
      }
      this.loading = false;
    });
  }

  logo = new FormGroup({
    cards: new FormArray([]),
  });

  get meaning(): FormGroup {
    return this.fb.group({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
    });
  }

  getCards(): any {
    return this.logo.get('cards') as FormArray;
  }

  addCards(): any {
    this.getCards().push(this.meaning);
  }

  // deleteCards(i: number) {
  //   this.dialog
  //     .open(AlertAreYouSureComponent, {
  //       data: {
  //         title: 'Delete',
  //         message: 'Are you sure you want to delete this?',
  //       },
  //     })
  //     .afterClosed()
  //     .subscribe((res: any) => {
  //       if (res) {
  //         this.getCards().removeAt(i);
  //       }
  //     });
  // }
  onChange() {
    this.edited = true;
  }

  onSave() {
    let body = this.logo.getRawValue();

    this.dialog
      .open(AlertAreYouSureComponent, {
        data: {
          title: 'Save',
          message: 'Are you sure you want to save changes?',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          console.log(this.logo.getRawValue());
          this.content.createLogoMeaning(body).subscribe((res: any) => {
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
}
