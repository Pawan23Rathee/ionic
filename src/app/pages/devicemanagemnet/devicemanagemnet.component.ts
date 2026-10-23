import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-devicemanagemnet',
  templateUrl: './devicemanagemnet.component.html',
  styleUrls: ['./devicemanagemnet.component.scss'],
})
export class DevicemanagemnetComponent implements OnInit {

  constructor(private navCtrl: NavController,) { }

  ngOnInit() {}



  gotowifipage(){
      this.navCtrl.navigateRoot('/wifi');
  }

  gotoAddedModule(){
    this.navCtrl.navigateRoot('/allmodule'); 
  }

}
