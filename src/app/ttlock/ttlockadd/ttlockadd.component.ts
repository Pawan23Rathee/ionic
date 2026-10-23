import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
declare var TTlockdata:any;
@Component({
  selector: 'app-ttlockadd',
  templateUrl: './ttlockadd.component.html',
  styleUrls: ['./ttlockadd.component.scss'],
})
export class TtlockaddComponent implements OnInit {
  scanbtn = true;
  addbtn = false;
  constructor(public user: UserService,
    private authService: AuthService,
    private navCtrl: NavController,
    private androidPermissions: AndroidPermissions) {
    let TTtoken = localStorage.getItem('TTtoken');
  }

  ngOnInit() { }
  scanLock() {
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION, this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION])
      .then(result => {
        TTlockdata.lockscan("scan",
          (res:any) => {
            alert(res);
            this.scanbtn = false;
            this.addbtn = true;
          },
          (err:any) => {
            alert(err)
          })
      })
  }
  addLock() {
    console.log("add lock click...");
    TTlockdata.lockdata('add',
      (res:any) => {
        localStorage.setItem('tlockData', res);
        this.user.lockData = res;
        console.log("ld data check:" + this.user.lockData)
        this.lockInitialize();
        //  alert("added Lock.."+ res);
      },
      (err:any) => {
        alert(err.error);
      })
  }

  lockinit:any;
  lockInitialize() {
    var d = new Date();
    var n = d.getTime();
    var x = n;
    console.log(n);
    let TTtoken = localStorage.getItem('TTtoken')??"";
    let tlockData = this.user.lockData;
    //alert("Lock data.."+tlockData);
    console.log('lockdata: ' + tlockData);
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: TTtoken,
        lockData: tlockData,
        // lockData: "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",
        date: JSON.stringify(x),
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),
        'Access-Control-Allow-Origin': '*'
      })
    };
    console.log(params);
    this.user.present('initializing...');
    this.authService.tTlockInitialize(params).subscribe(res => {
      console.log((res));
      this.lockinit = res;
      this.user.showToast(JSON.stringify(this.lockinit));
      this.navCtrl.navigateRoot('/mainpage');
      this.user.dismiss();
    }, error => {
      this.user.dismiss();
      this.user.showToast(JSON.stringify(error.error));
      console.log('error');
    })

    console.log(params);
  }
}
