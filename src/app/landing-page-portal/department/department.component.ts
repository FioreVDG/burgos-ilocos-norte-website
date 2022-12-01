import { DepartmentService } from './../../services/department/department.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  search: string = '';
  departments: Array<any> = [];
  loading: boolean = false;
  constructor(private department: DepartmentService) {}

  ngOnInit(): void {
    this.loading = true;
    this.department.getAll({}).subscribe((res: any) => {
      this.departments = res.env.departments;
      this.departments.forEach(async (el: any) => {
        el.layout = await this.stringToHTMLconverter(el.description);
      });
      this.loading = false;
    });
  }

  async stringToHTMLconverter(str: any) {
    let dom = document.createElement('div');
    dom.innerHTML = str;
    return dom.textContent || dom.innerText || '';
  }

  onSearch(){}
}
