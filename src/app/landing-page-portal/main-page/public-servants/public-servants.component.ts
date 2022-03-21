import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-servants',
  templateUrl: './public-servants.component.html',
  styleUrls: ['./public-servants.component.scss'],
})
export class PublicServantsComponent implements OnInit {
  _servant: any = [
    {
      content: [
        {
          img: './../../../../assets/images/profile-sample-2.jpg',
          name: 'HON. CRESCENTE N. GARCIA',
          position: 'Municipal Mayor',
          misc: 'OFFICE OF THE MAYOR',
        },
      ],
    },
    {
      content: [
        {
          img: './../../../../assets/images/profile-sample.jpg',
          name: 'HON. RODOLFO L. GARCIA',
          position: 'Municipal Vice Mayor',
          misc: 'OFFICE OF THE SANGGUNIANG BAYAN',
        },
      ],
    },
    {
      content: [
        {
          img: '../../../../assets/images/Blank-Profile.png',
          name: 'HON. JELSON G. ESPEJO',
          position: 'Sangguniang Bayan Member',
        },
        {
          img: '../../../../assets/images/profile-female.jpg',
          name: 'HON. SUSAN G. SANTIAGO',
          position: 'Sangguniang Bayan Member',
        },
        {
          img: '../../../../assets/images/Blank-Profile.png',
          name: 'HON. RAPONSEL G. JIMENEZ',
          position: 'Sangguniang Bayan Member',
        },
        {
          img: '../../../../assets/images/Blank-Profile.png',
          name: 'HON. FLORENTINO A. CAMPAÑANO',
          position: 'Sangguniang Bayan Member',
        },
      ],
    },
    {
      content: [
        {
          img: '../../../../assets/images/Blank-Profile.png',
          name: 'HON. KERVIN G. GUINTO',
          position: 'Sangguniang Bayan Member',
        },
        {
          img: '../../../../assets/images/Blank-Profile.png',
          name: 'HON. RODEL T. DALO',
          position: 'Sangguniang Bayan Member',
        },
        {
          img: '../../../../assets/images/Blank-Profile.png',
          name: 'HON. EFREN A. SAGUITGUIT',
          position: 'Sangguniang Bayan Member',
        },
        {
          img: '../../../../assets/images/Blank-Profile.png',
          name: 'HON. ARISTEDES M. PANTE',
          position: 'Sangguniang Bayan Member',
        },
      ],
    },
    {
      content: [
        {
          img: '../../../../assets/images/Blank-Profile.png',
          name: 'HON. CELERINO D. ABAD',
          position: 'Ex-Officio Member/Liga ng Mga Barangay President',
        },
        {
          img: '../../../../assets/images/Blank-Profile.png',
          name: 'HON. RODEL T. DALO',
          position: 'Ex-Officio Member/Liga ng Mga Barangay President',
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
