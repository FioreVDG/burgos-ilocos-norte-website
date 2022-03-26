import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CareerService } from 'src/app/services/career/career.service';

@Component({
  selector: 'app-add-career',
  templateUrl: './add-career.component.html',
  styleUrls: ['./add-career.component.scss'],
})
export class AddCareerComponent implements OnInit {
  careerForm: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required]),
    payGrade: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    monthlySalary: new FormControl('', [Validators.required]),
    education: new FormControl('', [Validators.required]),
    training: new FormControl('', [Validators.required]),
    experience: new FormControl('', [Validators.required]),
    eligibility: new FormControl('', [Validators.required]),
    competency: new FormControl('', [Validators.required]),
  });
  saving: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddCareerComponent>,
    private fb: FormBuilder,
    private career: CareerService
  ) {}

  ngOnInit(): void {}

  createCareer(career: any) {
    this.saving = true;
    this.career.create(career).subscribe(
      (res: any) => {
        this.saving = false;
        this.dialogRef.close(true);
        console.log(res);
      },
      (err) => {
        console.log(err);
        this.saving = false;
        this.dialogRef.close(true);
      }
    );
  }

  updateCareer(career: any) {
    this.saving = true;
    this.career.update(career, this.data._id).subscribe(
      (res: any) => {
        this.saving = false;
        this.dialogRef.close(true);
      },
      (err) => {
        console.log(err);
        this.saving = false;
        this.dialogRef.close(true);
      }
    );
  }

  save() {
    const career = this.careerForm.getRawValue();
    if (this.data) this.updateCareer(career);
    else this.createCareer(career);
  }
}
