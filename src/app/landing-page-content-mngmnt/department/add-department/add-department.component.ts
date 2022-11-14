import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DepartmentService } from 'src/app/services/department/department.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss'],
})
export class AddDepartmentComponent implements OnInit {
  saving: boolean = false;
  departmentForm: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    person: new FormControl(''),
    position: new FormControl(''),
    number: new FormControl(''),
  });
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '25rem',
    placeholder: 'Enter description here...',
    translate: 'no',
    defaultParagraphSeparator: '',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['backgroundColor', 'htmlCode', 'insertImage', 'insertVideo', 'htmlCode'],
    ],
    customClasses: [
      {
        name: 'For Heading 1',
        class: 'titleText',
        tag: 'h1',
      },
      {
        name: 'For Heading 2',
        class: 'titleText',
        tag: 'h2',
      },
      {
        name: 'For Heading 3',
        class: 'titleText',
        tag: 'h3',
      },
    ],
  };
  forms: any = [
    { fcname: 'title' },
    { fcname: 'description' },
    { fcname: 'person' },
    { fcname: 'position' },
    { fcname: 'number' },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddDepartmentComponent>,
    private fb: FormBuilder,
    private department: DepartmentService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.forms.forEach((el: any) => {
        this.departmentForm.controls[el.fcname].setValue(this.data[el.fcname]);
      });
    }
  }

  createDepartment(department: any) {
    this.department.create(department).subscribe(
      (res: any) => {
        this.saving = false;
        this.dialogRef.close(true);
      },
      (err) => {
        console.error(err);
        this.saving = false;
      }
    );
  }

  updateDepartment(department: any) {
    this.department.update(department, this.data._id).subscribe(
      (res: any) => {
        this.saving = false;
        this.dialogRef.close(true);
      },
      (err) => {
        console.error(err);
        this.saving = false;
      }
    );
  }

  save() {
    this.saving = true;
    const department = this.departmentForm.getRawValue();

    if (this.data) this.updateDepartment(department);
    else this.createDepartment(department);
  }
}
