import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-automationdevices",
  templateUrl: "./automationdevices.component.html",
  styleUrls: ["./automationdevices.component.scss"],
})
export class AutomationdevicesComponent implements OnInit {
  constructor(private navCtrl: NavController, private user: UserService) {}

  ngOnInit() {}

  modulecurtainclick() {
    // this.navCtrl.navigateRoot("/submoduleshow");
    this.user.modulemoter = true;
    this.user.moduledevice = false;
    this.user.moduleplug = false;
    this.user.modulesensor = false;
    this.user.plug_more = true;
    if (confirm("Do you want to use Smart Config") == true) {
      this.navCtrl.navigateRoot("/smart-config");
    } else {
      this.navCtrl.navigateRoot("/addnewmodule");
    }
  }

  moduledeviceclick() {
    // this.navCtrl.navigateRoot("/submoduleshow");
    this.user.moduledevice = true;
    this.user.modulemoter = false;
    this.user.moduleplug = false;
    this.user.modulesensor = false;
    this.user.plug_more = true;
    if (confirm("Do you want to use Smart Config") == true) {
      this.navCtrl.navigateRoot("/smart-config");
    } else {
      this.navCtrl.navigateRoot("/addnewmodule");
    }
  }

  moduleplugclick() {
    // this.navCtrl.navigateRoot("/submoduleshow");
    this.user.moduleplug = true;
    this.user.modulemoter = false;
    this.user.moduledevice = false;
    this.user.modulesensor = false;
    this.user.plug_more = true;
    if (confirm("Do you want to use Smart Config") == true) {
      this.navCtrl.navigateRoot("/smart-config");
    } else {
      this.navCtrl.navigateRoot("/addnewmodule");
    }
   
  }
  mainpage(){
    this.navCtrl.navigateRoot('/mainpage');
  }
  moduledeviceclick1() {
    console.log("tam module click..");
    this.user.lock_qrbutton = false;
    this.user.module_qrbutton = true;
    
    if (confirm("Do you want to use Smart Config") == true) {
      this.navCtrl.navigateRoot("/smart-config");
    } else {
      this.navCtrl.navigateRoot("/addnewmodule");
    }
    //this.navCtrl.navigateRoot("/smart-config")
  }
  rgbaddclick(){
    this.navCtrl.navigateRoot("/rgb-add");
  }
}
