import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
declare var CameraCustom: any;
import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2/ngx';
// declare var WifiWizard2:any;
@Component({
  selector: 'app-tuyalock',
  templateUrl: './tuyalock.component.html',
  styleUrls: ['./tuyalock.component.scss'],
})
export class TuyalockComponent implements OnInit {
  show: any;
  constructor(private navCtrl: NavController, public WifiWizard: WifiWizard2) { }

  ngOnInit() {
    this.WifiWizard.getConnectedSSID().then((ssid) => {
      (<HTMLInputElement>document.getElementById("ssid")).value = ssid;
    });
  }
  next() {
    this.show = true;
  }
  navigateNext(ev: any) {
    if (ev.target.checked) {
      let body = {
        ssid: (<HTMLInputElement>document.getElementById('ssid')).value,
        password: (<HTMLInputElement>document.getElementById('password')).value
      }
      CameraCustom.wifilock(body,
        (res: any) => {
          //alert(res);
        }, (err: any) => {
          alert(err);
        })
    }
  }
  devicePage() {
    this.navCtrl.navigateRoot('/mainpage');
  }
}
