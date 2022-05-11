import { DepartmentService } from './../../services/department/department.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  departments: Array<any> = [];
  constructor(private department: DepartmentService) {}

  ngOnInit(): void {
    this.department.getAll({}).subscribe((res: any) => {
      console.log(res);
      this.departments = res.env.departments;
    });
  }
}
