import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
declare var CameraCustom:any;

@Component({
  selector: "app-tuya-message",
  templateUrl: "./tuya-message.component.html",
  styleUrls: ["./tuya-message.component.scss"],
})
export class TuyaMessageComponent implements OnInit {
  messages: any;

  constructor(private modalctrl: ModalController, public user: UserService) {}

  ngOnInit() {
    let body = {};
    CameraCustom.getmessage(
      "message",
      async (res:any) => {
        this.user.messages = res;
        //console.log(typeof this.user.messages)
        console.log(this.user.messages[0].name);
        //this.navCtrl.navigateRoot('/tMsg');
      },
      (err:any) => {
        alert(JSON.stringify(err));
      }
    );
    this.messages = this.user.messages;
  }
  backbutton() {
    this.user.showDevice = false;
    this.user.showRoom = true;
  }
  menu(){}
}
