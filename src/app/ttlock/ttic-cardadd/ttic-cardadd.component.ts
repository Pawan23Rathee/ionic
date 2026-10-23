import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
declare var TTlockdata:any;


@Component({
  selector: "app-ttic-cardadd",
  templateUrl: "./ttic-cardadd.component.html",
  styleUrls: ["./ttic-cardadd.component.scss"],
})
export class TticCardaddComponent implements OnInit {
  c:any;
  lockParams:any;
  constructor(
    private user: UserService,
    private auth: AuthService,
    private navCtrl: NavController
  ) {
    console.log("lockId:" + this.user.ttLockId);
    console.log("lockMac:" + this.user.ttlockMac);
    console.log("lockData:" + this.user.lockData);
  }

  ngOnInit() {}
  addIcCardTTLock() {
    let body = {
      type: "PERMANENT",
      lockdata: this.user.lockData,
      macAddress: this.user.ttlockMac,
    };
    TTlockdata.addICCard(
      body,
      (res:any) => {
        this.lockParams = res;
        this.user.showToast(res);
        //alert("IC"+ this.lockParams);
        // this.user.fingerNumber=this.lockParams[0].fingerprintNum;
      },
      (err:any) => {
        alert(err);
      }
    );
  }

  addIC(form: NgForm) {
    console.log("name:" + form.value.name);
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
        cardNumber: this.lockParams,
        cardName: form.value.name,
        startDate: "0",
        endDate: "0",
        addType: "1",
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
    this.auth.tTlockIc_add(params).subscribe(
      (res) => {
        this.user.dismiss();
        //alert(res);

        this.navCtrl.navigateRoot("/ttlockiclist");
      },
      (error) => {
        console.log(JSON.stringify(error.error));
        this.user.dismiss();
        alert(error.error);
        console.log("error");
      }
    );
  }
  icAdd(){}
}
