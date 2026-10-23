import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { HttpParams, HttpHeaders } from '@angular/common/http';

declare var TTlockdata:any;
@Component({
  selector: 'app-ttlockautolocktime',
  templateUrl: './ttlockautolocktime.component.html',
  styleUrls: ['./ttlockautolocktime.component.scss'],
})
export class TtlockautolocktimeComponent implements OnInit {

  time=5;
  constructor(private user: UserService,
              private auth: AuthService,
              private navCtrl: NavController) { }

  ngOnInit() {}
  setAutoTime(){
    let body={
      "lockdata":this.user.lockData,
      "macAddress":this.user.ttlockMac
    }
    TTlockdata.autolockperiod(body,
      (res:any)=>{
        // alert(res);
        this.deletefing();
      },
      (err:any)=>{alert(err)})
    console.log('click set auto time'+ (this.time));
    
    // tTlock_setautoTime 
  }

  deletefing(){
    this.user.ttLockId;
    this.user.ttlockMac;
    this.user.lockData;
    console.log("lockId:"+ this.user.ttLockId);
    console.log("lockMac:"+ this.user.ttlockMac);
    console.log("lockData:"+ this.user.lockData);

    var d= new Date();
      var n = d.getTime();
      var x=n;
      console.log("currentTime:"+n);
    let TTtoken = localStorage.getItem('TTtoken')??"";
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: TTtoken,
        lockId: this.user.ttLockId,
        seconds: "5",
        type: "1",
        date:JSON.stringify(x),
      }
    });
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),

      })
    };
      this.user.present('wait..');
    this.auth.tTlock_setautoTime(params).subscribe(res=>{
      this.navCtrl.navigateRoot('/ttoperatiion'); 
      this.user.dismiss();
 
    },error=>{
      console.log(JSON.stringify(error.error));
      this.user.dismiss();
      console.log('error');
    })
  }

}
