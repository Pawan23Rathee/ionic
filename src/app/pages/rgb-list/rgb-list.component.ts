import { Component, OnInit, NgZone } from '@angular/core';
import { NavController } from "@ionic/angular";
import { UserService } from "src/app/services/user.service";
import { NavigationExtras } from "@angular/router";
declare var CameraCustom:any;

@Component({
  selector: "app-rgb-list",
  templateUrl: "./rgb-list.component.html",
  styleUrls: ["./rgb-list.component.scss"],
})
export class RgbListComponent implements OnInit {
  rgbComponents:Array<any>=[];
  constructor(
    private navCtrl: NavController,
    private zone: NgZone,
    public user: UserService
  ) { }

  ngOnInit() {
    this.getTuyahome();
  }

  modepage() {
    this.navCtrl.navigateRoot("/mode");
  }
  securitylockpage() {
    this.navCtrl.navigateRoot("/securitylock");
  }
  mainpage() {
    this.navCtrl.navigateRoot("/mainpage");
  }
  rgbpage() { }
  
  getTuyahome() {
    console.log("testing8-1");
    CameraCustom.home(
      "body",
      (res:any) => {
        console.log("testing8");
        console.log(res);
        console.log(JSON.stringify(res));
        let temp = res.substring(6);
        this.user.homeId = temp;
        //alert("Tuya homeIdRes:" + JSON.stringify(res));
        //alert("Tuya homeIdRes:" + JSON.stringify(this.user.homeId));
        this.getTuyaDevices();
      },
      (err:any) => {
        console.log("testing8-2");
        console.log(JSON.stringify(err));
        alert("TuyaHomeIdError:" + JSON.stringify(err));
      }
    );
  }
  getTuyaDevices() {
    console.log("testing9-1");
    CameraCustom.devicelist(
      "body",
      (res:any) => {
        console.log("testing9");
        console.log(res);
        console.log(JSON.stringify(res));
        this.rgbComponents = [];
        this.user.tuyaDevices = res;
        this.zone.run(() => {
          for (let i = 0; i < this.user.tuyaDevices.length; i++) {
            if (this.user.tuyaDevices[i]["category"] == "dj") {
              this.rgbComponents.push(this.user.tuyaDevices[i]);
            }
          }
        });

        console.log(JSON.stringify(this.user.tuyaDevices));
        //alert("abcd List"+JSON.stringify(this.user.tuyaDevices))
      },
      (err:any) => {
        console.log("testing9-2");
        console.log(JSON.stringify(err));
        alert("TuyaListError:" + JSON.stringify(err.error));
      }
    );
  }
  goToTuyaSettings(name:any, icon:any, id:any, isOnline:any) {
    // alert(name)
    this.user.tuyaDeviceName = name;
    this.user.tuyaDeviceIcon = icon;
    this.user.tuyaDeviceId = id;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
        name: name,
        isOnline: isOnline
      },
    };

    this.navCtrl.navigateRoot("/rgb-control", navigationExtras);
  }
  backbutton() {
    this.user.showDevice = false;
    this.user.showRoom = true;
  }
}
