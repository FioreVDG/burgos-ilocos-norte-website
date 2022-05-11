import { AddFileComponent } from './add-file/add-file.component';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { BidService } from 'src/app/services/bid/bid.service';

@Component({
  selector: 'app-add-bids',
  templateUrl: './add-bids.component.html',
  styleUrls: ['./add-bids.component.scss'],
})
export class AddBidsComponent implements OnInit {
  isLinear = true;
  saving: boolean = false;
  bidForm: FormGroup = this.fb.group({
    id: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });
  types = [
    'Invitation to Bid',
    'Request for Quotation',
    'Notice of Award',
    'Notice to proceed',
  ];

  files: Array<any> = [];
  filesArr: Array<any> = [];

  bidImageForm: FormGroup = this.fb.group({});
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddBidsComponent>,
    private fb: FormBuilder,
    private bid: BidService,
    private dropbox: DropboxService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  addFile() {
    this.dialog
      .open(AddFileComponent, { width: '100%', height: 'auto' })
      .afterClosed()
      .subscribe((res: any) => {
        console.log(res);
        this.files = res;
      });
  }

  createBid(bid: any) {
    this.bid.create(bid).subscribe(
      (res: any) => {
        this.saving = false;
        this.dialogRef.close(true);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateBid(bid: any, id: string) {
    this.bid.update(bid, this.data._id).subscribe(
      (res: any) => {
        console.log(res);
        this.saving = false;
        this.dialogRef.close(true);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  save() {
    const bid = this.bidForm.getRawValue();
    const path = '/burgos-ilocosnorte/bids/';
    const dateNow = Date.now();
    console.log(bid);
    this.saving = true;
    if (this.files.length) {
      console.log(this.files);
      this.files.forEach((el: any) => {
        console.log(el.imgFile);
        let fileType = el.imgFile.type.split('/')[1];
        let name = el.imgFile.name.split('.')[0];
        const fileName = `${name}-${dateNow}.${fileType}`;
        this.dropbox
          .uploadFile(path, fileName, el.imgFile)
          .subscribe((res: any) => {
            console.log(res);
            delete el.imgFile;
            delete el.file;
            el.file = res.result;
            console.log(this.filesArr);
          });
      });

      setTimeout(() => {
        const toSave = { ...bid, files: this.files };
        console.log(toSave);
        if (this.data) {
        } else this.createBid(toSave);
      }, 3000);
    } else {
      const toSave = { ...bid, files: this.files };
      console.log(toSave);
      if (this.data) this.updateBid(toSave, this.data._id);
      else this.createBid(toSave);
    }
  }
}
