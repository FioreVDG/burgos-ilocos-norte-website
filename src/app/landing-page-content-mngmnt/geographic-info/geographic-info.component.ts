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
  selector: 'app-geographic-info',
  templateUrl: './geographic-info.component.html',
  styleUrls: ['./geographic-info.component.scss'],
})
export class GeographicInfoComponent implements OnInit {
  constructor(private fb: FormBuilder, private content: ContentService) {}
  year: any;
  ngOnInit(): void {
    // this.geographic.get('year')?.valueChanges.subscribe((data: any) => {
    //   this.year = data;
    //   // console.log(this.year);
    // });
  }

  geographic = new FormGroup({
    population: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    barangay: new FormControl('', [Validators.required]),
    totalLandArea: new FormControl('', [Validators.required]),
    geographical_info: new FormArray([]),
  });

  get geo_info(): FormGroup {
    return this.fb.group({
      title: '',
      body: '',
    });
  }

  getGeoInfo(): any {
    return this.geographic.get('geographical_info') as FormArray;
  }

  addGeoInfo() {
    this.getGeoInfo().push(this.geo_info);
  }

  removeGeoInfo(index: number) {
    this.getGeoInfo().removeAt(index);
  }

  submit() {
    let body = this.geographic.getRawValue();
    console.log('geographic', this.geographic.getRawValue());
    this.content.createGeographic(body).subscribe((res: any) => {
      console.log(res);
    });
  }
}
