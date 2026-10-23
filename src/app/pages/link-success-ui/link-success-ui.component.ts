import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-link-success-ui',
  templateUrl: './link-success-ui.component.html',
  styleUrls: ['./link-success-ui.component.scss'],
})
export class LinkSuccessUiComponent implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}
  close(){
    this.navCtrl.navigateRoot('/mainpage');
  }
}
