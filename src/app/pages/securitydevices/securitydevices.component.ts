import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-securitydevices',
  templateUrl: './securitydevices.component.html',
  styleUrls: ['./securitydevices.component.scss'],
})
export class SecuritydevicesComponent implements OnInit {

  constructor(private navCtrl: NavController,
    private user: UserService,
    private auth: AuthService) { }

  ngOnInit() { }

  scanQRlock() {
    console.log("lock click..")
    this.user.lock_qrbutton = false;
    this.user.module_qrbutton = true;
    this.navCtrl.navigateRoot('/addnewmodule');
  }

  addmodule() {
    console.log("submodule click..")
    this.user.lock_qrbutton = false;
    this.user.module_qrbutton = true;
    this.navCtrl.navigateRoot('/addnewmodule');
  }

  clickDyfolockModule() {
    console.log("submodule click..")
    this.user.lock_qrbutton = false;
    this.user.module_qrbutton = true;
    this.navCtrl.navigateRoot('/addnewmodule');
  }

  async clicklockModule() {
    this.navCtrl.navigateRoot('/locksetup');
  }

  addTTlock() {
    this.navCtrl.navigateRoot('/ttlockadd');
  }
  addTTlockGateway() {
    this.navCtrl.navigateRoot('/ttgatewayui');
  }
  addTuyadoorBell() {
    this.navCtrl.navigateRoot('/addDoorbell');
  }
  addTuyadoorLock() {
    this.navCtrl.navigateRoot("/smart-config");
    // this.navCtrl.navigateRoot('/tuyalock');
  }

}
