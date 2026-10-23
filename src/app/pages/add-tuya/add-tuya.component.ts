import { Component, OnInit } from '@angular/core';
//import { NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

//import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import {NgxQrcodeElementTypes,NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';
declare var CameraCustom:any;
declare var WifiWizard2: any;

@Component({
  selector: "app-add-tuya",
  templateUrl: "./add-tuya.component.html",
  styleUrls: ["./add-tuya.component.scss"],
})
export class AddTuyaComponent implements OnInit {
  createdCode: String = "";
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  //width:number=0.5;
  wifiSSID: string = "";
  constructor(public navCtrl: NavController) {}

  ngOnInit() {
    WifiWizard2.getConnectedSSID(this.ssidHandler, this.ssidFailed);
  }
  ssidHandler(s:any) {
    //alert(s);
    this.wifiSSID = s;
  }
  ssidFailed(err:any) {
    //alert(err);
  }
  getwifidetail() {
    let ssid = prompt("WIFI NAME:", this.wifiSSID);
    if (ssid == null || ssid == "") {
      alert("Please Enter WIFI Name");
    } else {
      //let pass = prompt("WIFI PASSWORD:", "");
      // if (pass == null || pass == "") {
      //   alert("Please Enter WIFI Password")
      // } else {
      this.QR(ssid);
      // }
    }
  }

  QR(ssid:any) {
    let body = { ssid: ssid };
    CameraCustom.qrGen(
      body,
      (res:any) => {
        this.createdCode = res;
        //alert(this.createdCode)
      },
      (err:any) => {
        alert(JSON.stringify(err));
        //alert("4 error");
      }
    );
  }
  navigateToHome(ev:any) {
    //alert(ev.target.checked)
    this.navCtrl.navigateRoot("/mainpage");
  }
  navigateNext(ev:any) {
    this.navCtrl.navigateRoot("/tuyaQr");
  }
}
