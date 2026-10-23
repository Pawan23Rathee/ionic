import { Component, NgModule, OnInit } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NavController, IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
declare var TTlockdata: any;



@Component({
  selector: "app-ttlockpasscodeadd",
  templateUrl: "./ttlockpasscodeadd.component.html",
  styleUrls: ["./ttlockpasscodeadd.component.scss"],
})
export class TtlockpasscodeaddComponent implements OnInit {
  lockParams: any;
  constructor(
    private user: UserService,
    private auth: AuthService,
    private navCtrl: NavController
  ) {
    console.log("lockId:" + this.user.ttLockId);
    console.log("lockMac:" + this.user.ttlockMac);
    console.log("lockData:" + this.user.lockData);
  }

  ngOnInit() { }

  addpass(form: NgForm) {
    // long startDate,long endDate,String passcode,String lockdata,String lockMac
    let body = {
      startDate: "0",
      endDate: "0",
      passcode: form.value.Passcode,
      lockdata: this.user.lockData,
      macAddress: this.user.ttlockMac,
    };
    TTlockdata.createCustomPasscode(
      body,
      (res: any) => {
        this.lockParams = res;
        // alert(this.lockParams);
      },
      (err: any) => {
        alert(err);
      }
    );

    console.log("name:" + form.value.name);
    console.log("admin" + form.value.Passcode);
    console.log("lockId:" + this.user.ttLockId);
    console.log("lockMac:" + this.user.ttlockMac);
    console.log("lockData:" + this.user.lockData);

    var d = new Date();
    var n = d.getTime();
    var x = n;
    console.log("currentTime:" + n);
    let TTtoken = localStorage.getItem("TTtoken")??"";
    const params = new HttpParams({
      fromObject: {
        clientId: "7a614fea8d6f427caa982e9a1aa6afc1",
        accessToken: TTtoken,
        lockId: this.user.ttLockId,
        keyboardPwd: form.value.Passcode,
        keyboardPwdName: form.value.name,
        startDate: "0",
        endDate: "0",
        date: JSON.stringify(x),
      },
    });

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        Authorization:
          "Basic " +
          btoa(
            "7a614fea8d6f427caa982e9a1aa6afc1" +
            ":" +
            "SECRET_CONFIGURE_ON_BACKEND"
          ),
      }),
    };
    this.user.present("wait..");
    this.auth.tTlockpasscode_add(params).subscribe(
      (res) => {
        this.user.dismiss();
        this.navCtrl.navigateRoot("/ttlockpasscodelist");
      },
      (error) => {
        console.log(JSON.stringify(error.error));
        this.user.dismiss();
        console.log("error");
      }
    );
  }
  notify(e: any) { }
}

