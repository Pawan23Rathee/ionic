import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { NavController, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: "app-ttlockgatewayoperation",
  templateUrl: "./ttlockgatewayoperation.component.html",
  styleUrls: ["./ttlockgatewayoperation.component.scss"],
})
export class TtlockgatewayoperationComponent implements OnInit {
  imgPath;
  constructor(
    private auth: AuthService,
    private user: UserService,
    private navCtrl: NavController,
    public activateRoute: ActivatedRoute,
    public actionsheetCtrl: ActionSheetController,
    private router: Router
  ) {
    console.log("lockName:" + this.user.gatewaylockName);
    console.log("lockId:" + this.user.gatewaylockid);
    console.log("lockMac:" + this.user.gatewaylockMac);
    this.imgPath = "../../../assets/images/lockgif.gif";
  }

  ngOnInit() {}

  lock() {
    // this.login();
    var d = new Date();
    var n = d.getTime();
    var x = n;
    let TTtoken = localStorage.getItem("TTtoken")??"";
    // alert("t"+ TTtoken)
    const params = new HttpParams({
      fromObject: {
        clientId: "7a614fea8d6f427caa982e9a1aa6afc1",
        accessToken: TTtoken,
        lockId: this.user.gatewaylockid,
        date: JSON.stringify(x),
      },
    });

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            "7a614fea8d6f427caa982e9a1aa6afc1" +
              ":" +
              "SECRET_CONFIGURE_ON_BACKEND"
          ),
        "Access-Control-Allow-Origin": "*",
      }),
    };
    this.user.present("loading...");
    this.auth.tTlockGateway_lock(params).subscribe(
      (res) => {
        this.user.dismiss();
        //alert(JSON.stringify(res))
      },
      (error) => {
        this.user.dismiss();
        this.user.showToast(JSON.stringify(error.error));
      }
    );
  }
  unlock() {
    // this.login();
    var d = new Date();
    var n = d.getTime();
    var x = n;
    let TTtoken = localStorage.getItem("TTtoken")??"";
    // alert("t"+ TTtoken)
    const params = new HttpParams({
      fromObject: {
        clientId: "7a614fea8d6f427caa982e9a1aa6afc1",
        accessToken: TTtoken,
        lockId: this.user.gatewaylockid,
        date: JSON.stringify(x),
      },
    });

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            "7a614fea8d6f427caa982e9a1aa6afc1" +
              ":" +
              "SECRET_CONFIGURE_ON_BACKEND"
          ),
        "Access-Control-Allow-Origin": "*",
      }),
    };
    this.user.present("loading...");
    this.auth.tTlockGateway_Unlock(params).subscribe(
      (res) => {
        this.user.dismiss();
        //alert(JSON.stringify(res))
      },
      (error) => {
        this.user.dismiss();
        this.user.showToast(JSON.stringify(error.error));
      }
    );
  }

  deleteGateway() {
    // tTlockGateway_delete
    var d = new Date();
    var n = d.getTime();
    var x = n;
    let TTtoken = localStorage.getItem("TTtoken")??"";
    const params = new HttpParams({
      fromObject: {
        clientId: "7a614fea8d6f427caa982e9a1aa6afc1",
        accessToken: TTtoken,
        gatewayId: this.user.gatewaylockid,
        date: JSON.stringify(x),
      },
    });

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            "7a614fea8d6f427caa982e9a1aa6afc1" +
              ":" +
              "SECRET_CONFIGURE_ON_BACKEND"
          ),
        "Access-Control-Allow-Origin": "*",
      }),
    };
    this.user.present("loading...");
    this.auth.tTlockGateway_delete(params).subscribe(
      (res) => {
        this.user.dismiss();
        //alert(JSON.stringify(res))
      },
      (error) => {
        this.user.dismiss();
        this.user.showToast(JSON.stringify(error.error));
      }
    );
  }
  gatewaylock_Status() {}
  gatewayOpenState(){}
}
