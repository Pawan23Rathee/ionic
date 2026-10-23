import { Component, OnInit, Input,} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpParams } from '@angular/common/http';

declare var TTlockdata:any;
@Component({
  selector: 'app-ttlockfingeradd',
  templateUrl: './ttlockfingeradd.component.html',
  styleUrls: ['./ttlockfingeradd.component.scss'],
})
export class TtlockfingeraddComponent implements OnInit {

  @Input() fingername:any;
  lockParams:any;
  inputshow=false;
  constructor(private user: UserService,
              private auth: AuthService,
              private navCtrl: NavController,
              ) {
    console.log("lockId:"+ this.user.ttLockId);
    console.log("lockMac:"+ this.user.ttlockMac);
    console.log("lockData:"+ this.user.lockData);
   }

  ngOnInit() {}
  addFingerPrintforTTLock(){
    let body={
                'type':"PERMANENT",
                'lockdata':this.user.lockData,
                'macAddress':this.user.ttlockMac
    }
   TTlockdata.addFingerPrint(body,
    (res:any)=>{
      console.log("finger count"+ res)
      this.inputshow=true;
    this.lockParams=res;
    this.user.fingerNumber=this.lockParams[0].fingerprintNum;
    },(err:any)=>{
      alert(err)
    })
  }
  addfing(form:NgForm){
    console.log("name:"+form.value.name);
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
        fingerprintNumber: this.user.fingerNumber,
        fingerprintName: form.value.name,
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
    this.auth.tTlockFingerAdd(params).subscribe(res=>{
      this.user.dismiss();
      this.navCtrl.navigateRoot('/ttlockfingerlist'); 
    },error=>{
      console.log(JSON.stringify(error.error));
      this.user.dismiss();
      console.log('error');
    })
  }

}

