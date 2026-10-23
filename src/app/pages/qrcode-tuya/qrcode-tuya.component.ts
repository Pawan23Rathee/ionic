import { Component, OnInit } from '@angular/core';
import {NgxQrcodeElementTypes,NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';

declare var CameraCustom:any;
declare var WifiWizard2: any;



@Component({
  selector: "app-qrcode-tuya",
  templateUrl: "./qrcode-tuya.component.html",
  styleUrls: ["./qrcode-tuya.component.scss"],
})
export class QrcodeTuyaComponent implements OnInit {
  constructor(private navCtrl: NavController) {}

  createdCode: String = "";
  createCode:any;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  wifiSSID: string = "";
  results:Array<any> = [];
  ngOnInit() {
    
    WifiWizard2.getConnectedSSID().then((ssid:any) => {
      this.wifiSSID=ssid;
    });
    
  }

  getwifidetail() {
    let ssid = prompt("WIFI NAME:", this.wifiSSID);
    if (ssid == null || ssid == "") {
      alert("Please Enter WIFI Name");
    } else {
      debugger
      this.QR(ssid);
      
    }
  }
  QR(ssid:any) {
    debugger
    let body = { ssid: ssid };
    CameraCustom.qrGen(
      body,
      (res:any) => {
        debugger
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
}
