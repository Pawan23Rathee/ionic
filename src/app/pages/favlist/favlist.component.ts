import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: "app-favlist",
  templateUrl: "./favlist.component.html",
  styleUrls: ["./favlist.component.scss"],
})
export class FavlistComponent implements OnInit {
  getdevice:any;
  getDevices:Array<any> = [];
  nofav = false;
  constructor(
    private user: UserService,
    private auth: AuthService,
    public route: Router,
    private navCtrl: NavController
  ) {
    // this.getDeviceList();
  }

  ngOnInit() {}
  ionViewWillEnter() {
    this.getDeviceList();
  }
  d_type:any;
  getDeviceList() {
    this.user.present("loading...");
    this.auth.getfavlist().subscribe(
      (res) => {
        this.getdevice = res;
        this.user.dismiss();
        console.log(this.getdevice);
        if (this.getdevice == "") {
          console.log("no fav");
          this.nofav = true;
        }
        this.user.dismiss();
        for (let i = 0; i < this.getdevice.length; i++) {
          this.d_type = this.showIcon(this.getdevice[i].device_type);
          this.getDevices[i] = [
            {
              description: this.getdevice[i].description,
              device: this.getdevice[i].device,
              device_name: this.getdevice[i].device_name,
              device_type: this.d_type,
              dimmer: this.getdevice[i].dimmer,
              id: this.getdevice[i].id,
              is_dimmer: this.getdevice[i].is_dimmer,
              is_online: this.getdevice[i].is_online,
              maximum: this.getdevice[i].maximum,
              minimum: this.getdevice[i].minimum,
              status: this.getdevice[i].status,
            },
          ];
          this.user.dismiss();
          console.log(this.getDevices[i]);
        }
      },
      (err) => {
        this.user.dismiss();
        console.log(err.error);
      }
    );
  }
  d_roomname:any;
  devicestatus(e:any, id:any, dev_st:any, roomname:any) {
    console.log(dev_st);
    console.log(e);

    if (dev_st == "False") {
      this.auth.changeStatuswithCheck(id, 1).subscribe(
        (res) => {
          this.getDeviceList();
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else if (dev_st == "True") {
      this.auth.changeStatuswithCheck(id, 0).subscribe(
        (res) => {
          this.getDeviceList();
        },
        (err) => {
          console.log(err.error);
        }
      );
    }
  }

  deviceclick(d_id:any, d_status:any, d_name:any, roomanme:any, dd_id:any) {
    // this.show=false;   // for hide edit device roomname and delete device card
    console.log("d_id" + d_id);
    console.log("dd_id" + dd_id);
    console.log("d_status" + d_status);
    this.user.device_status_id = d_id;
    this.user.device_status_status = d_status;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: btoa(this.user.device_status_id),
        special1: btoa(this.user.device_status_status),
        special2: btoa(d_name),
        special3: btoa(roomanme),
        special4: btoa(dd_id),
      },
    };
    console.log("device click for all edit sattus");
    this.route.navigate(["favstatus"], navigationExtras);
  }

  imgPath:any;
  showIcon(name:any) {
    if (name == "Musical_Mood") {
      return (this.imgPath = "assets/icon/tubelight.png");
    }
    if (name == "Disco_Mood") {
      return (this.imgPath = "assets/icon/fan.png");
    }
    if (name == "Tube_Light") {
      return (this.imgPath = "assets/icon/tubelight.png");
    }
    if (name == "Fan") {
      return (this.imgPath = "assets/icon/fan.png");
    }
    if (name == "Tv") {
      return (this.imgPath = "assets/icon/tv.png");
    }
    if (name == "Bulb") {
      return (this.imgPath = "assets/icon/light.png");
    }
    if (name == "Lamp") {
      return (this.imgPath = "assets/icon/wall-lamp.png");
    }
    if (name == "Geyser") {
      return (this.imgPath = "assets/icon/geyser.png");
    }
    if (name == "Ac") {
      return (this.imgPath = "assets/icon/ac.jpg");
    }
    if (name == "Table_Lamp") {
      return (this.imgPath = "assets/icon/table_lamp.png");
    }
    if (name == "Chandelier") {
      return (this.imgPath = "assets/icon/chandelier.png");
    }
    if (name == "Table_Fan") {
      return (this.imgPath = "assets/icon/table_fan.png");
    }
    if (name == "Curtain") {
      return (this.imgPath = "assets/icon/curtain.png");
    }
    if (name == "Door_Lock") {
      return (this.imgPath = "assets/icon/Door_Lock.png");
    }
    return;
  }
  add_fav_device() {
    this.navCtrl.navigateRoot("/mainpage");
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
  backbutton() {
    this.user.showDevice = false;
    this.user.showRoom = true;
  }
}
