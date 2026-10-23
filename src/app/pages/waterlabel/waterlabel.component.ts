import { Component, OnInit } from "@angular/core";
import { HumidityPipe } from "./humidity.pipe";
import { NavController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-waterlabel",
  templateUrl: "./waterlabel.component.html",
  styleUrls: ["./waterlabel.component.scss"],
})
export class WaterlabelComponent implements OnInit {
  waterlabel = false;
  settingslabel = true;
  deviceId = 0;
  device = 0;
  name = "";
  isOnline = false;
  tanklevel = 0;
  waterlevel = 0;
  waterlevelheight = "0px";
  waterlevelheightToShow = "0px";
  wLabel: any;
  constructor(
    private auth: AuthService,
    private user: UserService,
    private navCtrl: NavController,
    public activateRoute: ActivatedRoute
  ) {
    this.activateRoute.queryParams.subscribe((params) => {
      console.log(params);
      this.deviceId = params['id'];
      this.name = params['name'];
      this.isOnline = params['is_online'];
      this.device = params['device'];
      this.watatLevel();
    });

  }

  ngOnInit() {
    this.wateLabelSelect();
  }
  waterCheck(e:any) {
    console.log(e);
    console.log(this.wLabel);
  }
  data = [
    {
      name: "server1",
      humidity: "950.9",
    },
  ];
  wateLabelSelect() {
    // $("ion-tab-button").removeClass("settings1");
    // $(".level").css("background-color", "#b6b9b9");
    // $(".level").css("color", "white");
    // $(".settings1").css("background-color", "white");
    // $(".settings1").css("color", "black");


    this.settingslabel = false;
    this.waterlabel = true;
  }
  settingsSelect() {
    // $("ion-tab-button").removeClass("level");
    // $(".settings1").css("background-color", "#b6b9b9");
    // $(".settings1").css("color", "white");
    // $(".level").css("background-color", "white");
    // $(".level").css("color", "black");
    this.settingslabel = true;
    this.waterlabel = false;
  }

  watatLevel() {
    this.auth.getWaterLevel(this.deviceId).subscribe(
      (res:any) => {
        console.log("water response", res)
        let data = res['data'];
        this.tanklevel = data['depth'];
        this.waterlevelheightToShow = Math.round((data['level'] / this.tanklevel * 200)).toString();
        this.waterlevelheight = (data['level'] / this.tanklevel * 200).toString() + "px";
      },
      (err:any) => {
        console.log("in error");
        this.waterlevelheight = "0px";
        this.waterlevelheightToShow = "0px";
      }
    );
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
    this.navCtrl.navigateRoot("/waterlist");
  }
  updateTankDepth() {
    var body = {
      'tank_depth': this.tanklevel
    }
    console.log("tanklevel");
    console.log(this.tanklevel);
    this.auth.changeTankDepth(body, this.deviceId).subscribe(() => {
      this.watatLevel();
      this.wateLabelSelect();
    })
  }
}
