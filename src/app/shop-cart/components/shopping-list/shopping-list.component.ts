import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationStateManagementService } from '../../services/application-state-management.service';
import { ApiCallService } from '../../services/api-call.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  addTocartPageData: Array<Item>;
  cartPageData: Array<Item> = [];
  currentItem: string = '';
  timeoutSubscription: any;
  totalItems: number;

  orderByKey = 'price';
  orderByOrder = false;

  minVal = 0;
  maxVal = 10000;
  constructor(
    private appState: ApplicationStateManagementService,
    private apiCall: ApiCallService
  ) {}

  ngOnInit() {
    this.orderByKey = this.appState.getOderByKeys().orderByKey;
    this.orderByOrder = this.appState.getOderByKeys().orderByOrder;

    this.appState.$orderBySub.subscribe(data => {
      this.orderByKey = data.orderByKey;
      this.orderByOrder = data.orderByOrder;
    });

    this.addTocartPageData = this.appState.getAddTocartPageData();
    this.cartPageData = this.appState.getCartPageData();
    console.log(this.addTocartPageData);
    if (this.addTocartPageData.length === 0) {
      this.apiCall.getAllItems().subscribe((data: Array<Item>) => {
        console.log('Data' +  data);
        this.addTocartPageData = data;
        this.appState.setAddTocartPageData(data);
      });
    }
  }

  addToCart(data) {
    this.cartPageData.push(data);
    this.appState.setCartPageData(this.cartPageData);
  }

  ngOnDestroy() {
    this.appState.setCartPageData(this.cartPageData);
  }
}
