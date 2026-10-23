import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: "app-consentpage",
  templateUrl: "./consentpage.component.html",
  styleUrls: ["./consentpage.component.scss"],
})
export class ConsentpageComponent implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  routeAlexa() {
    this.navCtrl.navigateRoot("/alexaLink");
  }
  routeGoogle() {
    //this.navCtrl.navigateRoot('/mainpage');
  }
  editName(){}
}
