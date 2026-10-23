import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {UserService} from '../../services/user.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],

})
export class FooterComponent implements OnInit {
  // currentPage: string;
  constructor(
    public navCtrl: NavController,
    public userService:UserService
  ) { }

  ngOnInit() { }
  home() {
    this.userService.currentPage = "home";
    // console.log("this.currentPage",this.currentPage);
    this.navCtrl.navigateRoot('/mainpage');
  }
  modepage() {
    this.userService.currentPage="mode";
    // console.log("this.currentPage",this.currentPage);
    this.navCtrl.navigateRoot("/mode");
  }
  remote() {
    this.userService.currentPage="remote";
    // console.log("this.currentPage",this.currentPage);
    // this.navCtrl.navigateRoot("/ir-remote");
    this.navCtrl.navigateRoot("/ir-product");
  }
  devices() {
    this.userService.currentPage="rooms";
    // console.log("this.currentPage",this.currentPage);
    this.navCtrl.navigateRoot("/rooms");
  }
  settings() {
    this.userService.currentPage="settings";
    // console.log("this.currentPage",this.currentPage);
    this.navCtrl.navigateRoot("/settings");
  }
}
