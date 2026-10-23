import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-ttlockekeysend',
  templateUrl: './ttlockekeysend.component.html',
  styleUrls: ['./ttlockekeysend.component.scss'],
})
export class TtlockekeysendComponent implements OnInit {
  isToggled = false;
  constructor(private user: UserService,
    private auth: AuthService,
    private navCtrl: NavController) {
    // this.isToggled = false;
  }

  ngOnInit() { }
  name:any;
  mobile:any;
  admin:any;
  code: string = '91';
  addekey(form: NgForm) {
    //console.log("name:"+form.value.name);
    //console.log("admin"+ form.value.mobile);
    //console.log("Toggled: "+ this.isToggled); 


    //console.log("name:"+ (this.code+form.value.mobile));
    //console.log("lockId:"+ this.user.ttLockId);
    //console.log("lockMac:"+ this.user.ttlockMac);
    //console.log("lockData:"+ this.user.lockData);

    var d = new Date();
    var n = d.getTime();
    var x = n;
    console.log("currentTime:" + n);
    let TTtoken = localStorage.getItem('TTtoken')??"";
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: TTtoken,
        lockId: this.user.ttLockId,
        receiverUsername: "+919621835326",
        keyName: form.value.name,
        startDate: "0",
        endDate: "0",
        date: JSON.stringify(x),
      }


    });
    console.log((params))
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),

      })
    };
    this.user.present('wait..');
    this.auth.tTlockekey_Send(params).subscribe(res => {
      this.user.dismiss();
      console.log(JSON.stringify(res));
      this.navCtrl.navigateRoot('/ttlockekeylist');
    }, error => {
      console.log(JSON.stringify(error.error));
      this.user.dismiss();
      console.log('error');
    })
  }
  notify(event:any) {
    console.log(event.checked);
  }


}

