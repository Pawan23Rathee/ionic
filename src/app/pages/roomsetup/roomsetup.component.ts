import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, MenuController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-roomsetup",
  templateUrl: "./roomsetup.component.html",
  styleUrls: ["./roomsetup.component.scss"],
})
export class RoomsetupComponent implements OnInit {
  type:any;
  existroom = false;
  newroom = false;
  myRooms:any;
  imgPath:any;
  player:any;
  constructor(
    public auth: AuthService,
    private navCtrl: NavController,
    private menu: MenuController,
    public user: UserService,
    public viewCtrl: ModalController
  ) {
    this.player = this.user.todayArr;
    //alert(this.player);
  }

  ngOnInit() {}

  selectOne(e:any) {
    this.type = e.currentTarget.value;
    console.log(this.type);
    if (this.type == "existroom") {
      this.existroom = true;
      this.newroom = false;
      this.getExistingRoom();
    } else if (this.type == "newroom") {
      this.myRooms = [];
      this.myRooms = "";
      this.existroom = false;
      this.newroom = true;

      // console.log(("devicepage_selected pi_id: " + this.player));
    }
  }

  getExistingRoom() {
    this.user.present("loading...");
    this.auth.getRoomFromApi().subscribe(
      (res) => {
        this.user.dismiss();
        this.myRooms = res;
        console.log(JSON.stringify(res));
        // console.log(("devicepage_selected pi_id: " + this.player));
      },
      (err) => {
        this.user.dismiss();
        //localStorage.clear();
        this.navCtrl.navigateRoot("/home");
      }
    );
  }

  showRoomType(name:any) {
    if (name == "Living_Room") {
      return (this.imgPath = "assets/icon/living3.png");
    }
    if (name == "Bed_Room") {
      return (this.imgPath = "assets/icon/bedroom1.jpg");
    }
    if (name == "Kitchen") {
      return (this.imgPath = "assets/icon/kitchen2.png");
    }
    if (name == "Kids_Room") {
      return (this.imgPath = "assets/icon/kids1.png");
    }
    if (name == "Drawing_Room") {
      return (this.imgPath = "assets/icon/drawing2.jpg");
    }
    if (name == "Balcony") {
      return (this.imgPath = "assets/icon/balcony1.jpeg");
    }
    if (name == "Bathroom") {
      return (this.imgPath = "assets/icon/bathroom2.jpg");
    }
    if (name == "Toilet") {
      return (this.imgPath = "assets/icon/toilet1.png");
    }
    if (name == "Corridoor") {
      return (this.imgPath = "assets/icon/corridor1.jpg");
    }
    if (name == "Hall") {
      return (this.imgPath = "assets/icon/hall2.jpg");
    }
    if (name == "Guest_Room") {
      return (this.imgPath = "assets/icon/guest2.png");
    }
    if (name == "Theater_Room") {
      return (this.imgPath = "assets/icon/theatre1.jpg");
    }
    if (name == "Store_Room") {
      return (this.imgPath = "assets/icon/store1.jpg");
    }
    if (name == "Office") {
      return (this.imgPath = "assets/icon/office3.jpg");
    }
    if (name == "Conference") {
      return (this.imgPath = "assets/icon/conference3.jpg");
    }
    if (name == "Dining_Room") {
      return (this.imgPath = "assets/icon/dining2.jpg");
    }
    if (name == "Stairs") {
      return (this.imgPath = "assets/icon/stairs1.png");
    }
    if (name == "Garage_Room") {
      return (this.imgPath = "assets/icon/garage.jpg");
    }
    if (name == "Outdoor_Lawn") {
      return (this.imgPath = "assets/icon/outdoor_lawn.jpg");
    }
    return;
  }

  name:any;
  roomID:any;
  public selectedRooms:any;
  public mySavedDevice:any;
  public getRooms:any;
  public rooms = [
    {
      // name: 'Living_Room', imgPath: 'assets/icon/living_room.jpg', id: 1
      name: "Living_Room",
      imgPath: "assets/icon/living3.png",
      id: 1,
    },
    {
      // name: 'Bed_Room', imgPath: 'assets/icon/bedroom.jpeg', id: 2
      name: "Bed_Room",
      imgPath: "assets/icon/bedroom1.jpg",
      id: 2,
    },
    {
      name: "Kitchen",
      imgPath: "assets/icon/kitchen2.png",
      id: 3,
      // name: 'Kitchen', imgPath: 'assets/icon/kitchen2.png', id: 3
    },
    {
      // name: 'Kids_Room', imgPath: 'assets/icon/kidsroom.jpg', id: 4
      name: "Kids_Room",
      imgPath: "assets/icon/kids1.png",
      id: 4,
    },
    {
      name: "Drawing_Room",
      imgPath: "assets/icon/drawing2.jpg",
      id: 5,
    },
    {
      name: "Balcony",
      imgPath: "assets/icon/balcony1.jpeg",
      id: 6,
    },
    {
      name: "Bathroom",
      imgPath: "assets/icon/bathroom2.jpg",
      id: 7,
    },
    {
      name: "Toilet",
      imgPath: "assets/icon/toilet1.png",
      id: 8,
    },
    {
      name: "Corridoor",
      imgPath: "assets/icon/corridor1.jpg",
      id: 9,
    },
    {
      name: "Hall",
      imgPath: "assets/icon/hall2.jpg",
      id: 10,
    },
    {
      name: "Guest_Room",
      imgPath: "assets/icon/guest2.png",
      id: 11,
    },
    {
      name: "Theater_Room",
      imgPath: "assets/icon/theatre1.jpg",
      id: 12,
    },
    {
      name: "Store_Room",
      imgPath: "assets/icon/store1.jpg",
      id: 13,
    },
    {
      name: "Office",
      imgPath: "assets/icon/office3.jpg",
      id: 14,
    },
    {
      name: "Conference",
      imgPath: "assets/icon/conference3.jpg",
      id: 15,
    },
    {
      name: "Dining_Room",
      imgPath: "assets/icon/dining2.jpg",
      id: 16,
    },
    {
      name: "Stairs",
      imgPath: "assets/icon/stairs1.png",
      id: 17,
    },
    {
      name: "Garage_Room",
      imgPath: "assets/icon/garage.jpg",
      id: 18,
    },
    {
      name: "Outdoor_Lawn",
      imgPath: "assets/icon/outdoor_lawn.jpg",
      id: 19,
    },
  ];

  backbutton() {
    this.user.showDevice = false;
    this.user.showRoom = true;
  }
  selectexistroom(id:any) {}
  selectnewroom1(name:any){}
}
