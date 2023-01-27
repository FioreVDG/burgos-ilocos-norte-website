import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContentService } from 'src/app/services/content/content.service';

@Component({
  selector: 'app-hotlines',
  templateUrl: './hotlines.component.html',
  styleUrls: ['./hotlines.component.scss'],
})
export class HotlinesComponent implements OnInit {
  constructor(private fb: FormBuilder, private content: ContentService) {}
  hotlines: any;
  loading: boolean = true;

  ngOnInit(): void {
    this.getAllHotlines();
  }

  contacts = new FormGroup({
    hotlines: new FormArray([]),
  });

  get numbers(): FormGroup {
    return this.fb.group({
      name: '',
      contact_nums: new FormArray([]),
    });
  }

  get contact(): FormGroup {
    return this.fb.group({
      numbers: '',
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
  }

  addHotline() {
    this.getHotlines().push(this.numbers);
  }

  deleteHotline(index: number) {
    this.getHotlines().removeAt(index);
  }

  removeNum(hotlineNum: number, num_index: number) {
    const num = this.contacts.get('hotlines') as FormArray;
    (num.at(hotlineNum).get('contact_nums') as FormArray).removeAt(num_index);
  }
  submit() {
    let body = this.contacts.getRawValue();
    console.log(body);

    this.content.createHotline(body).subscribe((res: any) => {
      console.log(res);
    });

    // this.content
    //     .updateHotline(body, this.hotlines._id)
    //     .subscribe((res: any) => {
    //       console.log(res);
    //     });
  }

  getAllHotlines() {
    this.content.getAllHotline({}).subscribe((res: any) => {
      console.log(res);

      this.hotlines = res.env.hotlines[0];
      console.log(this.hotlines._id);

      for (let i in this.hotlines.hotlines) {
        this.addHotline();
        for (let j in this.hotlines.hotlines[i].contact_nums) {
          this.addNumber(Number(i));
        }
      }
      this.loading = false;
      this.contacts.get('hotlines')?.patchValue(this.hotlines.hotlines);
      this.contacts.getRawValue();
    });
  }
}
