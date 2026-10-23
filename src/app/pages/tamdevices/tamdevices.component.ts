import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tamdevices',
  templateUrl: './tamdevices.component.html',
  styleUrls: ['./tamdevices.component.scss'],
})
export class TamdevicesComponent implements OnInit {

  constructor(public user: UserService,
    private navCtrl: NavController) { }

  ngOnInit() { }


  moduledeviceclick() {
    console.log("tam module click..")
    this.user.lock_qrbutton = false;
    this.user.module_qrbutton = true;
    this.navCtrl.navigateRoot('/addnewmodule');
  }


}
