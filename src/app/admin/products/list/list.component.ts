import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  constructor() { }

  public data = [
    {
      title: 'Amsterdam',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      title: 'Buenos Aires',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      title: 'Porto Alegre',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      title: 'Munich',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      title: 'Paris',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      title: 'Madrid',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
  ];

  public results = [...this.data];

  ngOnInit() {}

  HandleChange(e: any) {
    const query = e.target.value.toLowerCase();
    this.results = this.data.filter(
      (r) => r.title.toLowerCase().indexOf(query) > -1
    );
  }

}
