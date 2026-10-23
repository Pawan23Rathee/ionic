import { Component, OnInit,NgZone } from '@angular/core';
import { NavController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { NavigationExtras } from "@angular/router";

@Component({
  selector: "app-water-list",
  templateUrl: "./water-list.component.html",
  styleUrls: ["./water-list.component.scss"],
})
export class WaterListComponent implements OnInit {
  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    public user: UserService,
    private ngZone: NgZone
  ) {}
  devices:any;
  ngOnInit() {
    this.auth.getWaterDevices().subscribe((res:any) => {
      console.log(res);
      this.ngZone.run(() => {
        this.devices = res["data"];
      });
    });
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
  rgbpage() {
    this.navCtrl.navigateRoot("/rgb-list");
  }
  goToWaterDevice(name:any, device:any, id:any, is_online:any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
        name: name,
        isOnline: is_online,
        device: device,
      },
    };

    this.navCtrl.navigateRoot("/waterlabel", navigationExtras);
  }
  backbutton() {
    this.navCtrl.navigateRoot("/mainpage");
  }
}
