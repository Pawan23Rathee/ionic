import { Component, OnInit ,NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-ttlockgatewayui',
  templateUrl: './ttlockgatewayui.component.html',
  styleUrls: ['./ttlockgatewayui.component.scss'],
})
export class TtlockgatewayuiComponent implements OnInit {

  
  constructor(private navCtrl: NavController,) { }

  ngOnInit() {}

  addGateway(){
    this.navCtrl.navigateRoot('/ttlockgatewayinit');
  }

}

