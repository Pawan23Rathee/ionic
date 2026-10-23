import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  myRooms: any;


  constructor(
    private auth: AuthService,
    public user: UserService,
    public navCtrl: NavController,
    public router: Router
  ) {
    this.addRooms();
  }

  ngOnInit() { }

  addRooms() {
    // this.totalDevice=true;
    this.user.present('Please wait...');
    this.auth.getRoomFromApi().subscribe(
      (res) => {
        this.myRooms = res;
        console.log("this.myRooms", this.myRooms);
        this.user.dismiss();
      },
      (err) => {
        this.user.dismiss();
      }
    );
  }

  getAllRoom(event: any, roomID: any, roomNaMe: any) {
    let param = {
      "room_id": roomID,
      "roomName": roomNaMe,
    }
    this.router.navigate(['devicelist/' + JSON.stringify(param)]);
  }
  addDevices() {
    this.router.navigate(['mcategory']);
  }
  navBack() {
    this.navCtrl.back();
  }
  turnRoomDeviceOff(room_Id:any,onDeviceCount:any) {
    this.user.present('Please wait...');
    let body =
    {
      "room_id": room_Id,
      "status": (onDeviceCount == 0)?1:0
    }
    this.auth.OnOffdevice(body).subscribe(
      (res) => {
        this.addRooms();
        console.log("this.myRooms", this.myRooms);
        this.user.dismiss();
      },
      (err) => {
        this.user.dismiss();
      }
    );
  }
}
