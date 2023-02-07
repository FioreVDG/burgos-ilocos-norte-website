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
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private content: ContentService,
    private sb: MatSnackBar
  ) {}
  loading: boolean = true;
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
    // this.getMayors().push(this.mayor);
  }

  deleteMayor(index: number) {
    this.getMayors().removeAt(index);
  }

  submit() {
    let body = this.officials.getRawValue();
    this.content.createHistory(body).subscribe((res: any) => {
      console.log(res);
      this.sb.open('Saved successfully', 'ok', {
        duration: 5000,
        panelClass: ['snackbar'],
      });
    });
  }

  getBurgos_Mayors() {
    this.content.getAllHistory({}).subscribe((res: any) => {
      // console.log(res.env.history[0].mayors);
      if (res.env.history[0]) {
        for (let r of res.env.history[0].mayors) {
          this.addMayor();
        }

        this.officials.get('mayors')?.patchValue(res.env.history[0].mayors);
        this.loading = false;
      }
    });
  }
}
