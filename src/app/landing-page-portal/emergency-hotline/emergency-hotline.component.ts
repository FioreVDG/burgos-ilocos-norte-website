import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content/content.service';

@Component({
  selector: 'app-emergency-hotline',
  templateUrl: './emergency-hotline.component.html',
  styleUrls: ['./emergency-hotline.component.scss'],
})
export class EmergencyHotlineComponent implements OnInit {
  hotlines: any;
  // hotlines = [
  //   {
  //     label: 'Municipal Disaster and Risk Reduction Management Office (MDRRMO)',
  //     contact: ['0951-722-7630 ', '0951-722-7632'],
  //   },
  //   {
  //     label: 'Municipal Social Welfare and Development Office (MSWDO)',
  //     contact: ['0908-817-1697'],
  //   },
  //   {
  //     label: 'Philippine National Police (PNP)',
  //     contact: ['0917-792-0056'],
  //   },
  //   {
  //     label: 'Bureau of Fire Protection (BFP)',
  //     contact: ['0917-186-2811'],
  //   },
  //   {
  //     label: 'Municipal Health Office (MHO)',
  //     contact: ['0917-874-6227'],
  //   },
  //   {
  //     label: 'Ambulance',
  //     contact: ['0915-616-2201', '0995-784-9466'],
  //   },
  // ];

  constructor(private content: ContentService) {}

  ngOnInit(): void {
    this.getAllHotline();
  }

  getAllHotline() {
    this.content.getAllHotline({}).subscribe((res: any) => {
      console.log(res);
      // let hotline_len = res.env.hotlines.length;

      this.hotlines = res.env.hotlines[0].hotlines;
    });
  }
}
