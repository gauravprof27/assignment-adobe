import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss']
})
export class PriceFilterComponent implements OnInit {

  constructor() { }
  someRange=[1, 50];



  ngOnInit() {

  }

  onChange(event){
    console.log(event);
  }
}
