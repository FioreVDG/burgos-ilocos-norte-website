import { DepartmentService } from './../../services/department/department.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentInfoDialogComponent } from './department-info-dialog/department-info-dialog.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  search: string = '';
  departments: Array<any> = [];
  loading: boolean = false;

  clipArt: string = '/assets/images/clip-art/courthouse.png';
  constructor(
    private department: DepartmentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.department.getAll({}).subscribe((res: any) => {
      this.departments = res.env.departments;

      this.departments.forEach(async (el: any) => {
        el.layout = await this.stringToHTMLconverter(el.description);
      });

      console.log(this.departments);
      this.loading = false;
    });
  }

  async stringToHTMLconverter(str: any) {
    let dom = document.createElement('div');
    dom.innerHTML = str;
    return dom.textContent || dom.innerText || '';
  }

  openInfoDialog(department: any) {
    this.dialog.open(DepartmentInfoDialogComponent, {
      data: { department },
      width: '80%',
    });
  }

  onSearch() {}
}
