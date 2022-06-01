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
    bidStatus: new FormControl(''),
  });
  types = [
    'Invitation to Bid',
    'Request for Quotation',
    'Notice of Award',
    'Notice to Proceed',
  ];
  bidStatus = ['Close for bidding', 'Open for bidding'];
  files: Array<any> = [];
  filesArr: Array<any> = [];
  filesArrCopy: Array<any> = [];
  loading: boolean = false;
  hasChanges: boolean = false;
  bidImageForm: FormGroup = this.fb.group({});
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddBidsComponent>,
    private fb: FormBuilder,
    private bid: BidService,
    private dropbox: DropboxService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    let temp: any = [];
    if (this.data) {
      this.loading = true;
      this.filesArrCopy = this.data.files;
      this.files = this.data.files;
      this.bidForm.controls['id'].setValue(this.data.id);
      this.bidForm.controls['description'].setValue(this.data.description);
      this.bidForm.controls['type'].setValue(this.data.type);
      this.bidForm.controls['bidStatus'].setValue(this.data.bidStatus);

      if (this.data.files.length) {
        for (let i of this.data.files) {
          i.rootFile = true;
          this.dropbox
            .getTempLink(i.file?.path_display)
            .subscribe((res: any) => {
              temp.push({ link: res.result });
              if (temp.length === this.data.files.length) this.loading = false;
            });
        }
      }
    }
  }

  addFile() {
    let data: any;
    this.data ? (data = this.data.files) : null;
    let didChange: boolean = false;
    this.dialog
      .open(AddFileComponent, {
        width: '100%',
        height: 'auto',
        data: data,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.files = res;
          console.log(res);
          let findChanges: any = this.files.find(
            (o: any) => o.rootFile !== true
          );
          didChange = this.compareArr(this.filesArrCopy, this.files);
          console.log(findChanges, didChange);

          if (findChanges || didChange) {
            this.hasChanges = true;
            this.bidForm.markAsDirty();
          }
        }
      });
  }

  compareArr(arrCopy: any = [], arrExt: any = []) {
    if (
      arrCopy.length === arrExt.length &&
      arrCopy.every((val: any, i: any) => val === arrCopy[i])
    )
      return false;
    else return true;
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
    this.saving = true;
    const bid = this.bidForm.getRawValue();
    const path = '/burgos-ilocosnorte/bids/';
    const dateNow = Date.now();
    console.log(bid);
    this.saving = true;
    const toSave: any = {
      ...bid,
      files: [],
    };
    console.log(toSave.files.length, this.files.length);
    if (this.files.length && !this.data) {
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
            toSave.files.push({ title: el.title, file: res.result });
            if (this.files.length === toSave.files.length) {
              console.log(toSave);
              this.createBid(toSave);
            }
          });
      });
    }
    if (this.data && this.hasChanges) {
      let fileArrCopy: any = [];
      fileArrCopy = this.files;
      console.log(fileArrCopy);
      let filterNewFile: any = this.files.filter(
        (f: any) => f.rootFile !== true
      );
      this.files = this.files.filter((o: any) => o.rootFile === true);
      console.log(filterNewFile);
      console.log(this.files);
      if (filterNewFile.length) {
        filterNewFile.forEach((el: any) => {
          let fileType = el.imgFile.type.split('/')[1];
          let name = el.imgFile.name.split('.')[0];
          const fileName = `${name}-${dateNow}.${fileType}`;
          let tempArr: any = [];
          this.dropbox
            .uploadFile(path, fileName, el.imgFile)
            .subscribe((res: any) => {
              console.log(res);
              this.files.push({ title: el.title, file: res.result });
              tempArr.push(el.title);
              console.log(this.files);
              if (tempArr.length === filterNewFile.length) {
                toSave.files = this.files;
                console.log(toSave);
                this.updateBid(toSave, this.data._id);
              }
            });
        });
      } else {
        toSave.files = this.files;
        this.updateBid(toSave, this.data._id);
      }
    }

    if (this.data && !this.hasChanges) {
      const toSave: any = {
        ...bid,
        files: this.files,
      };
      this.updateBid(toSave, this.data._id);
    }
  }
}
