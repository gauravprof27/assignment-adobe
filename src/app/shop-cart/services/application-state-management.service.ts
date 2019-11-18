import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models/item.model';


@Injectable({
  providedIn: 'root'
})
export class ApplicationStateManagementService {
  addTocartPageData: Array<Item> = [];
  cartPageData: Array<Item> = [];

  // For Matianing Sorting State orderByKey: Default Sort Value and orderByOrder: Is the Type of Order Desc or Asyn
  orderByKeys = { orderByKey: 'price', orderByOrder: false };

  // Subject with the type of Observables will be used to inform changes in the diffrent components
  $cartPageDataSub = new Subject<Array<Item>>();
  $orderBySub = new Subject<{ orderByKey: string; orderByOrder: boolean }>();

  constructor() { }

  // Delivering data to State for Shopping list Component
  getAddTocartPageData() {
    return [...this.addTocartPageData];
  }

  // Main Adding data to State for Shopping list Component
  setAddTocartPageData(addTocartPageData) {
    this.addTocartPageData = [...addTocartPageData];
  }

  // Delivering data to Shopping Cart Page
  getCartPageData() {
    return [...this.cartPageData];
  }

  // Adding data to Shopping Cart Page also It will Inform the update to all other compoenents
  setCartPageData(data: Array<Item>) {
    this.cartPageData = [...data];
    this.$cartPageDataSub.next(this.cartPageData);
  }

  // Returing the sorted value
  getOderByKeys() {
    return this.orderByKeys;
  }

  // After sorting it will send data to observalble
  setOrderByKeys(key, order) {
    this.orderByKeys.orderByKey = key;
    this.orderByKeys.orderByOrder = order;

    this.$orderBySub.next(this.orderByKeys);
  }
}
