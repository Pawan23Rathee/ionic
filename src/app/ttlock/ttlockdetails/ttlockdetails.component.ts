import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { NavController, ModalController } from '@ionic/angular';
import { TtlocknameComponent } from '../ttlockname/ttlockname.component';
import { TtlockbatteryComponent } from '../ttlockbattery/ttlockbattery.component';



@Component({
  selector: 'app-ttlockdetails',
  templateUrl: './ttlockdetails.component.html',
  styleUrls: ['./ttlockdetails.component.scss'],
})
export class TtlockdetailsComponent implements OnInit {

  lockDetails:any;
  //  lockDetail=[];
   lockname:any;
   lockNumber:any;
   lockmac:any;
   lockbattery:any;
   lockvalidity:any;
   lockgroup:any;
   lockpass:any;
   lockid:any;
  constructor(private user:UserService,
             private auth:AuthService,
             public navCtrl: NavController,
             public modalController: ModalController,
               ) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.tTLoclDetails();
  }

  tTLoclDetails(){
    console.log('ttlock record..');
    var d= new Date();
    var n = d.getTime();
    var x=n;
    console.log(n);
      let TTtoken = localStorage.getItem('TTtoken')??"";
      // this.user.showToast(TTtoken);
      const params = new HttpParams({
        fromObject: {
          clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
          accessToken: TTtoken,
          lockId:this.user.ttLockId,               
          date: JSON.stringify(x)
        }
      });
      const httpOptions = {
        headers: new HttpHeaders({     
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*'
        })
      };
     
      
      console.log(params);
      // alert("data---"+ params);
      this.user.present('');
      this.auth.tTlock_details(params).subscribe(res=>{

        this.lockDetails=res;

        this.lockname=this.lockDetails.lockAlias;
        this.lockmac=this.lockDetails.lockMac;
        this.lockNumber=this.lockDetails.modelNum;
        this.lockbattery=this.lockDetails.electricQuantity;
        this.lockpass=this.lockDetails.noKeyPwd;
        this.lockid=this.lockDetails.lockId;
        console.log(JSON.stringify(this.lockDetails.length));
        this.user.dismiss();
      },err=>{

        this.user.dismiss();
      })
    }

    

  async  updateLockName(){
    console.log(this.lockname)
      const modal = await this.modalController.create({
        component: TtlocknameComponent,
        componentProps: {lockname: this.lockname,lockid: this.lockid}
      });
      return await modal.present();
    }

  async  updateLockBettary(){
      const modal = await this.modalController.create({
        component: TtlockbatteryComponent,
        componentProps: {lockname: this.lockbattery,lockid: this.lockid}
      });
      return await modal.present();
    }

}
