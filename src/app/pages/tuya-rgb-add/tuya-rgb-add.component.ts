import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  NavController,
} from "@ionic/angular";

declare var CameraCustom:any;
declare var WifiWizard2: any;

@Component({
  selector: "app-tuya-rgb-add",
  templateUrl: "./tuya-rgb-add.component.html",
  styleUrls: ["./tuya-rgb-add.component.scss"],
})
export class TuyaRgbAddComponent implements OnInit {
  wifiSSID: string = "";
  constructor(public navCtrl: NavController) {}

  ngOnInit() {
    WifiWizard2.getConnectedSSID().then((ssid:any) => {
      this.wifiSSID = ssid;
    });
  }
  
  getwifidetail() {
    let ssid = prompt("WIFI NAME:", this.wifiSSID);
    if (ssid == null || ssid == "") {
      alert("Please Enter WIFI Name");
    } else {
      let password = prompt("WIFI Password:", "");
      if(password==null || password==""){
        alert("Please Enter WIFI passowrd");
      }else{
        let body = { ssid: ssid,password:password };
        CameraCustom.searchDevices(
          body,
          (res:any) => {
            alert("Device added successfully");
            this.navCtrl.navigateRoot("/mainpage");
            //alert(this.createdCode)
          },
          (err:any) => {
            alert(JSON.stringify(err));
            //alert("4 error");
          }
        );
      }
    }
  }
}
