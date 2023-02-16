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
  selector: 'app-geographic-info',
  templateUrl: './geographic-info.component.html',
  styleUrls: ['./geographic-info.component.scss'],
})
export class GeographicInfoComponent implements OnInit {
  loading: boolean = true;
  edited: boolean = false;
  constructor(
    private fb: FormBuilder,
    private content: ContentService,
    private sb: MatSnackBar,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getGeographicInfo();
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
    this.geographic.markAsDirty();
  }

  removeGeoInfo(index: number) {
    this.dialog
      .open(AlertAreYouSureComponent, {
        data: {
          title: 'Delete',
          message: 'Are you sure you want to delete this information?',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.getGeoInfo().removeAt(index);
          this.geographic.markAsDirty();
        }
      });
  }

  submit() {
    let body = this.geographic.getRawValue();

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
          this.content.createGeographic(body).subscribe((res: any) => {
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

  getGeographicInfo() {
    this.content.getAllGeographic({}).subscribe((res: any) => {
      if (res.env.geographics[0]) {
        console.log(res.env.geographics[0]);
        let geoInfo = res.env.geographics[0];

        for (let i in geoInfo.geographical_info) {
          this.getGeoInfo().push(this.geo_info);
        }
        this.geographic.patchValue(geoInfo);
      }

      this.loading = false;
    });
  }

  onChange() {
    console.log('changeee');
    this.edited = true;
  }
}
