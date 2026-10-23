import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sublightdevice',
  templateUrl: './sublightdevice.component.html',
  styleUrls: ['./sublightdevice.component.scss'],
})
export class SublightdeviceComponent implements OnInit {

  constructor(public user: UserService,
    private navCtrl: NavController) { }

  ngOnInit() { }

  scannewModuleQr() {
    console.log("submodule click..")
    this.user.lock_qrbutton = false;
    this.user.module_qrbutton = true;
    if (confirm("Do you want to use Smart Config") == true) {
      this.navCtrl.navigateRoot("/smart-config");
    } else {
      this.navCtrl.navigateRoot("/addnewmodule");
    }
    //this.navCtrl.navigateRoot('/addnewmodule');
  }

}