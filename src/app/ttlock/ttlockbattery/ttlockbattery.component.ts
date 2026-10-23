import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-ttlockbattery',
  templateUrl: './ttlockbattery.component.html',
  styleUrls: ['./ttlockbattery.component.scss'],
})
export class TtlockbatteryComponent implements OnInit {

  @Input() lockbattery:any;
  @Input() lockid:any;
  bb:any;
  constructor(public viewCtrl: ModalController,
              private user: UserService,
              private auth: AuthService,
              public navCtrl: NavController,) { 
                console.log(this.lockbattery);
                console.log(this.lockid)
              }

  ngOnInit() {
    this.bb=this.lockbattery;
    console.log(this.bb);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  

}
