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
  selector: 'app-meaning-logo',
  templateUrl: './meaning-logo.component.html',
  styleUrls: ['./meaning-logo.component.scss'],
})
export class MeaningLogoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private content: ContentService,
    private sb: MatSnackBar
  ) {}

  cards: any;
  loading: boolean = true;
  burgosLogo: string = '/assets/images/burgos-logo/burgos-logo.png';
  shield: string = '/assets/images/burgos-logo/shield-color.png';
  light: string = '/assets/images/burgos-logo/light.png';
  lightHouse: string = '/assets/images/burgos-logo/lighthouse.png';
  mountain: string = '/assets/images/burgos-logo/mountain.png';
  sea: string = '/assets/images/burgos-logo/sea.png';

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

  deleteCards(i: number) {
    this.getCards().removeAt(i);
  }

  onSave() {
    let body = this.logo.getRawValue();
    console.log(this.logo.getRawValue());
    this.content.createLogoMeaning(body).subscribe((res: any) => {
      console.log(res);
      this.sb.open('Saved successfully', 'ok', {
        duration: 5000,
        panelClass: ['snackbar'],
      });
    });
  }
}
