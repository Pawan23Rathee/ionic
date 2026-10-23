import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, MenuController, ModalController, NavParams } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {

  @Input() player: any;
  type:any;
  existroom:boolean = false;
  newroom = false;
  myRooms:any;
  imgPath:any;
  constructor(public auth: AuthService,
    private navCtrl: NavController,
    private menu: MenuController,
    public user: UserService,
    public viewCtrl: ModalController) {
    // this.player=navParams.get('player');
    // document.addEventListener("deviceready", onDeviceReady, false);
    //             function onDeviceReady() {
    //                 const browser = window.open('http://192.168.4.1/','_blank',this.options);
    //            browser.addEventListener('loaderror', function(event){
    //               alert(event)
    //             });
    //              } 
    console.log(("devicepage: " + this.user.todayArr));

  }

  ngOnInit() { }
  selectOne(e:any) {
    this.type = e.currentTarget.value;
    console.log(this.type)
    if (this.type == "existroom") {
      this.existroom = true;
      this.newroom = false;
      this.getExistingRoom();
    }
    if (this.type == "newroom") {
      console.log("new room")
      this.existroom = false;
      this.newroom = true;
      console.log(("devicepage_selected pi_id: " + this.user.todayArr));
    }
  }

  getExistingRoom() {
    this.user.present('loading...');
    this.auth.getRoomFromApi().subscribe(res => {
      this.user.dismiss();
      this.myRooms = res;
      console.log(JSON.stringify(res));
      console.log(("devicepage_selected pi_id: " + this.user.todayArr));
    }, err => {
      this.user.dismiss();
      //localStorage.clear();
      this.navCtrl.navigateRoot('/home');
    })
  }

  //------- Add device with module in Existing Room ----------//
  selectexistroom(roomid:any) {
    console.log("roomclick_Room_id:" + roomid);
    var module__pi_id = this.user.todayArr;
    
    console.log(("devicepage_pi_id for getting device in that module: " + module__pi_id));
    if (this.user.dd_name == "Single" || this.user.dd_name == "Double" || this.user.dd_name == "Triple" || this.user.dd_name == "Quad" || this.user.dd_name == "Pent" || this.user.dd_name == "Touch5" || this.user.dd_name == "Touch6" || this.user.dd_name == "Touch7" || this.user.dd_name == "Touch8" || this.user.dd_name == "Touch9" || this.user.dd_name == "Touch10" || this.user.dd_name == "Curtain" || this.user.dd_name == "Touch2" || this.user.dd_name == "Touch4") {
      console.log(module__pi_id + "" + this.user.dd_name);
      this.user.present('adding devices...')
      this.auth.devicesForModule(module__pi_id).subscribe(res => {
        this.mySavedDevice = res;
        console.log("res for get deviceid:" + this.mySavedDevice);
        console.log('Length:  ' + this.mySavedDevice.length);
        for (let i = 0; i < this.mySavedDevice.length; i++) {
          let device = this.mySavedDevice[i].id;
          console.log("id_device used during device adding in room:" + device)
          this.auth.savedChangedRoom(roomid, device).subscribe((res) => {
            this.getRooms = res;
            this.navCtrl.navigateRoot('/mainpage');
            this.user.dismiss();
            console.log("added devices in existing room:" + JSON.stringify(this.getRooms))
          }, err => {
            this.user.showToast('Device already added in room.');
            this.navCtrl.navigateRoot('/mainpage');
            this.user.dismiss();
          })
        }
      }, err => {
        this.user.showToast(err.error);
        this.user.dismiss();
      })
    }
    else if (this.user.dd_name == 'Ir_Blaster') {
      // let Remote_iid = this.user?.remote_iid ?? 'DEFAULT_REMOTE_ID';
      // let Module_id = this.user?.module_piId ?? 'DEFAULT_MODULE_ID';
      // let Roomid = roomid??"DEFAULT_RE"
      this.auth.saveRemote(this.user.remote_iid, this.user.module_piId, roomid).subscribe({
        next:(res:any)=>{
          this.navCtrl.navigateRoot('/mainpage');
          this.user.dismiss();
        },error:(err:any)=>{
          this.user.showToast("something went wrong.please try again later.");
        this.navCtrl.navigateRoot('/mainpage');
        this.user.dismiss();
        }
      })
      // this.auth.saveRemote(this.user.remote_iid, this.user.module_piId, roomid).subscribe(
      //   (res:any) => {
      //   this.navCtrl.navigateRoot('/mainpage');
      //   this.user.dismiss();
      // }, (err:any) => {
      //   this.user.showToast("something went wrong.please try again later.");
      //   this.navCtrl.navigateRoot('/mainpage');
      //   this.user.dismiss();
      // })
    }
    else if (this.user.dd_name == 'Mood_Lighting') {
      this.auth.postmooddevice(roomid, this.user.moodDevice_id).subscribe(res => {
        console.log('mood' + res);
        // this.dismiss();
        this.navCtrl.navigateRoot('/mainpage');
        this.user.dismiss();
      }, err => {
        this.user.showToast('Device already added in room.');

        this.navCtrl.navigateRoot('/mainpage');
        // this.dismiss();
        this.user.dismiss();
      })
    }
    else {

    }

  }

  //------- Add device with module in New Room ----------//
  room_iid:any;
  selectnewroom1(newroomname:any) {
    console.log("newrooomclick:" + newroomname);
    console.log(("devicepage_selected pi_id: " + this.user.todayArr));
    debugger
    // let piId_arr = (this.user.module_piId) ? this.user.module_piId.split('-') : '';
    // let piId = piId_arr[1].replace('"', '');
    var module__pi_id = this.user.todayArr;
    let name = newroomname;
    let type = newroomname;
    if (this.user.dd_name == "Single" || this.user.dd_name == "Double" || this.user.dd_name == "Triple" || this.user.dd_name == "Quad" || this.user.dd_name == "Pent" || this.user.dd_name == "Touch5" || this.user.dd_name == "Touch6" || this.user.dd_name == "Touch7" || this.user.dd_name == "Touch8" || this.user.dd_name == "Touch9" || this.user.dd_name == "Touch10" || this.user.dd_name == "Curtain" || this.user.dd_name == "Touch2" || this.user.dd_name == "Touch4") {
      console.log("creating room name:" + newroomname);
      console.log("creating room type:" + newroomname);
      console.log(("devicepage_pi_id for getting device in that module: " + module__pi_id));
      this.user.present('adding devices...');
      this.auth.devicesForModule(module__pi_id).subscribe(res => {
        this.mySavedDevice = res;
        console.log("res1 for get deviceid:" + this.mySavedDevice);
        this.auth.createRoom(name, type).subscribe((res) => {
          this.roomID = res;
          console.log("new created room_id:" + this.roomID.id);
          console.log("res2 inside roomcereate api for get deviceid:" + this.mySavedDevice);
          for (let i = 0; i < this.mySavedDevice.length; i++) {
            let device = this.mySavedDevice[i].id;
            // console.log("id_Room used during device adding in room:" + this.roomID.id);
            console.log("id_Device used during device adding in room:" + device)
            this.auth.savedChangedRoom(this.roomID.id, device).subscribe((res) => {
              this.getRooms = res;
              console.log("added devices in new created room:" + JSON.stringify(this.getRooms));
              // this.dismiss();

              this.navCtrl.navigateRoot('/mainpage');
              this.user.dismiss();
            }, err => {
              // alert("Device already added in room.");
              this.user.showToast('Device already added in room.');
              // this.dismiss();
              this.navCtrl.navigateRoot('/mainpage');

              this.user.dismiss();
              // alert(JSON.stringify(err.device))
            })
          }
        }, err => {
          // this.dismiss();
          this.navCtrl.navigateRoot('/mainpage');
          this.user.dismiss();
          console.log("room creation error")
        });
      }, err => {
        console.log(JSON.stringify(err));
        this.user.showToast("something went wrong.please try again later.");
        // this.dismiss();
        this.navCtrl.navigateRoot('/mainpage');
        this.user.dismiss();
      })
    }
    else if (
      this.user.dd_name == "Ir_Blaster" ||
      this.user.dd_name == "TAM remote" || this.user.dd_name == "IrBlaster"
    ) {
      this.user.present("please wait..");
      this.auth.createRoom(name, type).subscribe(
        (res) => {
          // alert(JSON.stringify(res))
          this.room_iid = res;
          console.log(
            "id_Room used during ir adding in room:" + this.room_iid.id
          );
          this.auth
            .saveRemote(
              this.user.remote_iid,
              this.user.module_piId,
              this.room_iid.id
            )
            .subscribe(
              (res:any) => {
                this.navCtrl.navigateRoot("/mainpage");
                // this.dismiss();
                this.user.dismiss();
              },
              (err:any) => {
                console.log(JSON.stringify(err));
                this.user.showToast(
                  "something went wrong.please try again later."
                );
                // this.dismiss();
                this.navCtrl.navigateRoot("/mainpage");
                this.user.dismiss();
              }
            );
        },
        (err) => {
          this.user.showToast("something went wrong.please try again later.");
          // this.dismiss();
          this.navCtrl.navigateRoot("/mainpage");
          this.user.dismiss();
        }
      );
    } else if (this.user.dd_name == "Mood_Lighting") {
      this.user.present("please wait...");
      this.auth.createRoom(name, type).subscribe(
        (res) => {
          this.room_iid = res;
          console.log(
            "id_Room used during ir adding in room:" + this.room_iid.id
          );
          this.auth
            .postmooddevice(this.room_iid, this.user.moodDevice_id)
            .subscribe(
              (res) => {
                console.log("mood" + res);
                // this.dismiss();
                this.navCtrl.navigateRoot("/mainpage");
                this.user.dismiss();
              },
              (err) => {
                this.user.showToast("Device already added in room.");
                // this.dismiss();
                this.navCtrl.navigateRoot("/mainpage");
                this.user.dismiss();
              }
            );
        },
        (err) => {
          this.user.showToast("something went wrong.please try again later.");
          // this.dismiss();
          this.navCtrl.navigateRoot("/mainpage");
          this.user.dismiss();
        }
      );
    } else {
    }

  }
  selectnewroom2(r:any) {
    console.log(r);
  }

  selectnewroom(rr:any) {
    console.log(rr);
  }

  showRoomType(name:any) {
    if (name == "Living_Room") {
      return this.imgPath = 'assets/icon/living3.png'
    }
    if (name == "Bed_Room") {
      return this.imgPath = 'assets/icon/bedroom1.jpg'
    }
    if (name == "Kitchen") {
      return this.imgPath = 'assets/icon/kitchen2.png'
    }
    if (name == "Kids_Room") {
      return this.imgPath = 'assets/icon/kids1.png'
    }
    if (name == "Drawing_Room") {
      return this.imgPath = 'assets/icon/drawing2.jpg'
    }
    if (name == "Balcony") {
      return this.imgPath = 'assets/icon/balcony1.jpeg'
    }
    if (name == "Bathroom") {
      return this.imgPath = 'assets/icon/bathroom2.jpg'
    }
    if (name == "Toilet") {
      return this.imgPath = 'assets/icon/toilet1.png'
    }
    if (name == "Corridoor") {
      return this.imgPath = 'assets/icon/corridor1.jpg'
    }
    if (name == "Hall") {
      return this.imgPath = 'assets/icon/hall2.jpg'
    }
    if (name == "Guest_Room") {
      return this.imgPath = 'assets/icon/guest2.png'
    }
    if (name == "Theater_Room") {
      return this.imgPath = 'assets/icon/theatre1.jpg'
    }
    if (name == "Store_Room") {
      return this.imgPath = 'assets/icon/store1.jpg'
    }
    if (name == "Office") {
      return this.imgPath = 'assets/icon/office3.jpg'
    }
    if (name == "Conference") {
      return this.imgPath = 'assets/icon/conference3.jpg'
    }
    if (name == "Dining_Room") {
      return this.imgPath = 'assets/icon/dining2.jpg'
    }
    if (name == "Stairs") {
      return this.imgPath = 'assets/icon/stairs1.png'
    }
    if (name == "Garage_Room") {
      return this.imgPath = 'assets/icon/garage.jpg'
    }
    if (name == "Outdoor_Lawn") {
      return this.imgPath = 'assets/icon/outdoor_lawn.jpg'
    }
    return;
  }






  name:any;
  roomID:any;
  public selectedRooms:any;
  public mySavedDevice:any;
  public getRooms:any;
  public rooms = [{
    // name: 'Living_Room', imgPath: 'assets/icon/living_room.jpg', id: 1
    name: 'Living_Room', imgPath: 'assets/icon/living3.png', id: 1
  }, {
    // name: 'Bed_Room', imgPath: 'assets/icon/bedroom.jpeg', id: 2
    name: 'Bed_Room', imgPath: 'assets/icon/bedroom1.jpg', id: 2
  }, {
    name: 'Kitchen', imgPath: 'assets/icon/kitchen2.png', id: 3
    // name: 'Kitchen', imgPath: 'assets/icon/kitchen2.png', id: 3
  }, {
    // name: 'Kids_Room', imgPath: 'assets/icon/kidsroom.jpg', id: 4
    name: 'Kids_Room', imgPath: 'assets/icon/kids1.png', id: 4
  }, {
    name: 'Drawing_Room', imgPath: 'assets/icon/drawing2.jpg', id: 5
  }, {
    name: 'Balcony', imgPath: 'assets/icon/balcony1.jpeg', id: 6
  }, {
    name: 'Bathroom', imgPath: 'assets/icon/bathroom2.jpg', id: 7
  }, {
    name: 'Toilet', imgPath: 'assets/icon/toilet1.png', id: 8
  }, {
    name: 'Corridoor', imgPath: 'assets/icon/corridor1.jpg', id: 9
  }, {
    name: 'Hall', imgPath: 'assets/icon/hall2.jpg', id: 10
  }, {
    name: 'Guest_Room', imgPath: 'assets/icon/guest2.png', id: 11
  }, {
    name: 'Theater_Room', imgPath: 'assets/icon/theatre1.jpg', id: 12
  }, {
    name: 'Store_Room', imgPath: 'assets/icon/store1.jpg', id: 13
  }, {
    name: 'Office', imgPath: 'assets/icon/office3.jpg', id: 14
  }, {
    name: 'Conference', imgPath: 'assets/icon/conference3.jpg', id: 15
  }, {
    name: 'Dining_Room', imgPath: 'assets/icon/dining2.jpg', id: 16
  },
  {
    name: 'Stairs', imgPath: 'assets/icon/stairs1.png', id: 17
  },
  {
    name: 'Garage_Room', imgPath: 'assets/icon/garage.jpg', id: 18
  },
  {
    name: 'Outdoor_Lawn', imgPath: 'assets/icon/outdoor_lawn.jpg', id: 19
  },
  ];

  // openMenu() {
  //   this.menu.enable(true);
  // }

  dismiss() {
    // this.viewCtrl.dismiss();
    this.navCtrl.navigateRoot('/rooms');
    // this.navCtrl.navigateBack;

  }

  backbutton() {
    this.user.showDevice = false;
    this.user.showRoom = true;
  }
}