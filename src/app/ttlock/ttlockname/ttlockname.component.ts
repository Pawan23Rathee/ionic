import { Component, OnInit, Input} from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-ttlockname',
  templateUrl: './ttlockname.component.html',
  styleUrls: ['./ttlockname.component.scss'],
})
export class TtlocknameComponent implements OnInit {
  @Input() lockname:any;
  @Input() lockid:any;
  
  constructor(public viewCtrl: ModalController,
              private user: UserService,
              private auth: AuthService,
              public navCtrl: NavController,) { 
                console.log(this.lockname);
              }

  ngOnInit() {}

  dismiss() {
    this.viewCtrl.dismiss();
  }
  submit(){
    console.log(this.lockname);
    console.log(this.lockid);
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
          lockId: this.lockid,     
          lockAlias: this.lockname,          
          date: JSON.stringify(x)
        }
      });
      const httpOptions = {
        headers: new HttpHeaders({     
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),
        })
      };
      this.user.present('wait...');
      this.auth.tTlock_ReName(params).subscribe(res=>{
        this.dismiss();
        this.navCtrl.navigateRoot('/ttlockdetails');
        this.user.dismiss();
      },err=>{
        this.dismiss();
        this.user.showToast(JSON.stringify(err.error));
        this.user.dismiss();
      })
  }

}
