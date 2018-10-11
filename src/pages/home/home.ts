import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {firebaseConfig} from '../../constants/constants';
import * as firebase from "firebase";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  firebaseDbref: any;
  searchTerm: string;
  userData = {
    'contact': '',
    'name': '',
    'car_no': ''
  };
  postData: any;
  dbCarRefPath = '/user_data/skrm/car_list/';

  constructor(public navCtrl: NavController) {
    this.firebaseDbref = firebase.apps[0].database();
    this.intializePostData();
  }

  intializePostData() {
    this.postData = {
      'contact': undefined,
      'name': undefined,
      'car_no': undefined
    };
  }

  getUserData() {
    const searchTerm = this.dbCarRefPath + this.convertToUpperCase(this.searchTerm);
    this.firebaseDbref.ref(searchTerm)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          this.userData = snapshot.val();
          this.userData.contact = '+91' + this.userData.contact;
        }
      });
  }

  addUser() {
    this.postData.car_no = this.convertToUpperCase(this.postData.car_no);
    this.firebaseDbref.ref(this.dbCarRefPath + this.postData.car_no).set(this.postData);
    this.intializePostData();
    // db.set(dataToPost);
  }

  convertToUpperCase(carNo) {
    return carNo.toUpperCase();
  }

  // listUser(){
  //   this.firebaseDbref.ref(this.dbCarRefPath)
  //
  // }
}
