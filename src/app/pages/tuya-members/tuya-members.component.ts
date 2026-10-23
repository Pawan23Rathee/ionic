import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-tuya-members",
  templateUrl: "./tuya-members.component.html",
  styleUrls: ["./tuya-members.component.scss"],
})
export class TuyaMembersComponent implements OnInit {
  memberList: any;

  constructor(private modalctrl: ModalController, private user: UserService) {}

  ngOnInit() {
    this.memberList = this.user.memberList;
  }
  backbutton() {
    this.user.showDevice = false;
    this.user.showRoom = true;
  }
  menu() {}
}
