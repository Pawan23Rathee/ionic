import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
declare var TTlockdata:any;


@Component({
  selector: 'app-ttlocksettingspage',
  templateUrl: './ttlocksettingspage.component.html',
  styleUrls: ['./ttlocksettingspage.component.scss'],
})
export class TtlocksettingspageComponent implements OnInit {

  constructor(private navCtrl: NavController,
    private user:UserService,
    private auth:AuthService) { 
      console.log(this.user.ttLockId)
    }

  ngOnInit() {}

  lockDetailsClick(){
    this.navCtrl.navigateRoot('/ttlockdetails');
  }

  setAutoTime(){
    this.navCtrl.navigateRoot('/ttlockautotime');
  }
   deleteTTLock(){
    let body={
      'lockdata':this.user.lockData,
      'macAddress':this.user.ttlockMac
}
   TTlockdata.deleteLock(body,
    (res:any)=>{
      //alert(res);
     this.deleteLock();
    },(err:any)=>{
     alert(err);
    })
     }
   
  deleteLock(){
    // tTlockDelete 
  
      console.log('ttlock record..');
      var d= new Date();
      var n = d.getTime();
      var x=n;
      console.log(n);
        let TTtoken = localStorage.getItem('TTtoken')??'';
        this.user.showToast(TTtoken);
        const params = new HttpParams({
          fromObject: {
            clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
            accessToken: TTtoken,
            lockId:this.user.ttLockId,               
            date:  JSON.stringify(x)
          }
        });
        const httpOptions = {
          headers: new HttpHeaders({     
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*'
          })
        };
       
        
        console.log(params);
        //alert("data---"+ params);
        this.user.present('');
        this.auth.tTlockDelete(params).subscribe(res=>{
          this.user.dismiss();
        },err=>{
          this.user.showToast(JSON.stringify(err.error));
          this.user.dismiss();
        })
      }

 
}

