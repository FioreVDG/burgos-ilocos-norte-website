import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { config } from 'rxjs';
import { CitizenCharterService } from 'src/app/services/citizen-charter/citizen-charter.service';

@Component({
  selector: 'app-add-citizen-charter',
  templateUrl: './add-citizen-charter.component.html',
  styleUrls: ['./add-citizen-charter.component.scss'],
})
export class AddCitizenCharterComponent implements OnInit {
  citizenCharterForm: FormGroup = this.fb.group({
    description: new FormControl(''),
  });
  saving: boolean = false;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '25rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [[]],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddCitizenCharterComponent>,
    private fb: FormBuilder,
    private citizen: CitizenCharterService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.citizenCharterForm.controls['description'].setValue(
        this.data.description.innerHtml
      );
    }
  }

  createCitizenCharter(charter: any) {
    this.citizen.create(charter).subscribe(
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

  save() {
    if (this.data) {
    } else this.createCitizenCharter(this.citizenCharterForm.getRawValue());
  }
}
