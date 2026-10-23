import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,NavigationExtras,Router } from '@angular/router';
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
@Component({
  selector: 'app-devicelist',
  templateUrl: './devicelist.component.html',
  styleUrls: ['./devicelist.component.scss'],
})
export class DevicelistComponent implements OnInit {
  room_id: any;
  room_name: any;
  guest_room_id: any;
  totalDevice = true;
  room_id_for_edit: any;
  room_name_for_edit: any;
  room__ID: any;
  light_Device: boolean = false;
  ir_Device: boolean = false;
  security_Device = false;
  ir_Status = false;
  device_Status = false;
  ir_device_nameStatus = false;
  remote_tv: boolean = false;
  AC: boolean = false;
  TELEVISION: boolean = false;
  lock_response: Array<any> = [];
  r_name: any;
  val: any;
  value: Array<any> = [];
  value1: Array<any> = [];
  imgPath: any;
  device_inRoom_is_dimmer_false: Array<any> = [];
  device_inRoom_is_dimmer_true: Array<any> = [];
  rrr: any;
  R_id: any = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    public user: UserService,
    public auth:AuthService,
    public route:Router
  ) {
    // Retrieve parameters
    this.activatedRoute.params.subscribe((params: any) => {
      console.log("pa check", JSON.parse(params['id']));
      let data = JSON.parse(params['id'])
      this.room_id = data.room_id;
      this.room_name = data.roomName;
      console.log("this.room_id",this.room_id);
      console.log("this.room_name",this.room_name);
    })
    
  }

  ngOnInit() {
    this.getAllRoom();
  }

  getAllRoom() {
    // Room Id
    this.room__ID = this.room_id;
    this.guest_room_id = this.room_id;
    this.room_id_for_edit = this.room_id;
    // Room Name
    this.user.roomnm = this.room_name;
    this.rrr = this.room_name;
    this.room_name_for_edit = this.room_name;

    // var d = document.getElementsByClassName("device_card1")[0];
    // if (d != undefined) {
    //   d.classList.remove("device_card1");
    // }

    // var d2 = document.getElementsByClassName("device_card2")[0];
    // if (d2 != undefined) {
    //   d2.classList.remove("device_card2");
    // }
    // console.log(document.getElementsByClassName("device_card2")[0]);
    // event.currentTarget.classList.add("device_card2");

    
    this.valueInitialiser();
    this.getAllDevicesNormal(this.room__ID);
    this.getIRDevice(this.rrr);
  }
  valueInitialiser(){
    this.device_inRoom_is_dimmer_false = [];
    this.device_inRoom_is_dimmer_true = [];
    this.totalDevice = false;
    this.light_Device = false;
    this.security_Device = false;
    this.ir_Device = false;
    this.ir_device_nameStatus = false;
    this.remote_tv = false;
    this.ir_Status = false;
    this.device_Status = false;
    this.AC = false;
    this.TELEVISION = false;
    this.lock_response = [];
  }
  getAllDevicesNormal(id: any) {
    this.auth.getDeviceFromApi(this.user.roomnm).subscribe(
      (res) => {
        this.user.dismiss();
        this.user.device_inRoom = res;
        
        for (let i of this.user.device_inRoom) {
          if (i.is_dimmer == "True") {
            this.device_inRoom_is_dimmer_true.push(i);
          } else {
            this.device_inRoom_is_dimmer_false.push(i);
          }
          if (i.is_online == "False") {
            i.is_online = true;
          } else if (i.is_online == "True") {
            i.is_online = false;
          }
        }
        console.log("")
        this.user.dismiss();
      },
      (err) => {
        this.user.dismiss();
        console.log("getting device in room error");
      }
    );
  }

  getIRDevice(r_name: any) {
    this.r_name = r_name;
    console.log("ac click" + this.r_name);

    this.AC = true;
    this.TELEVISION = false;
    this.light_Device = false;
    this.ir_Device = true;
    this.device_Status = false;
    this.security_Device = false;
    this.ir_Status = false;
    this.ir_device_nameStatus = false;
    this.remote_tv = false;
    this.security_Device = false;
    console.log(this.user.roomnm);
    this.auth.getAllSavedRemoteForRoom(this.r_name).subscribe((res) => {
      console.log(res);
      this.val = res;
      this.value = [];
      this.value1 = [];
      for (let i = 0; i < this.val.length; i++) {
        if (this.val[i].remote === null) {
          console.log("jujuuu");
        } else {
          console.log(this.val[i].remote);
          console.log("not nullllllll");
        }
        if (this.val[i].remote === null) {
          let type = this.showIcon(this.val[i].ac_product_name);
          console.log("type ac" + type);
          this.value1.push({
            // AC
            company_name: this.val[i].ac_company_name,
            product_name: this.val[i].ac_product_name,
            id: this.val[i].id,
            pi_id: this.val[i].pi_id,
            remote: this.val[i].ac_remote,
            type: type,
            status: false,
          });
        } else {
          let type = this.showIcon(this.val[i].product_name);
          console.log("type ac" + type);
          this.value.push({
            company_name: this.val[i].company_name,
            product_name: this.val[i].product_name,
            id: this.val[i].id,
            pi_id: this.val[i].pi_id,
            remote: this.val[i].remote,
            type: type,
            status: false,
          });
        }
      }

    });
  }
  showIcon(name: any) {
    if (name == "Musical_Mood") {
      return (this.imgPath = "assets/addnew/music_mood");
    }
    if (name == "Disco_Mood") {
      return (this.imgPath = "assets/addnew/disco_mood.png");
    }
    if (name == "Tube_Light") {
      return (this.imgPath = "assets/addnew/Tube_light.png");
    }
    if (name == "Fan") {
      return (this.imgPath = "assets/addnew/Fan.png");
    }
    if (name == "TV") {
      return (this.imgPath = "assets/addnew/TV.png");
    }
    if (name == "TELEVISION") {
      return (this.imgPath = "assets/addnew/TV.png");
    }
    if (name == "Tv") {
      return (this.imgPath = "assets/addnew/TV.png");
    }
    if (name == "Bulb") {
      return (this.imgPath = "assets/addnew/bulb.png");
    }
    if (name == "Lamp") {
      return (this.imgPath = "assets/addnew/lamp.png");
    }
    if (name == "Geyser") {
      return (this.imgPath = "assets/addnew/geyser.png");
    }
    if (name == "AC") {
      return (this.imgPath = "assets/addnew/AC.png");
    }
    if (name == "Ac") {
      return (this.imgPath = "assets/addnew/AC.png");
    }
    if (name == "Table_Lamp") {
      return (this.imgPath = "assets/addnew/Table_lamp.png");
    }
    if (name == "Chandelier") {
      return (this.imgPath = "assets/addnew/chandelier.png");
    }
    if (name == "Table_Fan") {
      return (this.imgPath = "assets/addnew/table_fan.png");
    }
    if (name == "Curtain") {
      // return (this.imgPath = "assets/addnew/curtain.png");
      return (this.imgPath = "assets/addnew/test.jpeg");
    }
    if (name == "Curtain2") {
      return (this.imgPath = "assets/addnew/curtain2.png");
    }
    if (name == "Door_Lock") {
      return (this.imgPath = "assets/addnew/lock.png");
    }
    if (name == "SETTOP BOX") {
      return (this.imgPath = "assets/addnew/set_up_box.png");
    }
    if (name == "MUSIC SYSTEM") {
      return (this.imgPath = "assets/addnew/music_system.png");
    }
    if (name == "HOME THEATRE") {
      return (this.imgPath = "assets/addnew/home_theatre.png");
    }
    if (name == "DVD PLAYER") {
      return (this.imgPath = "assets/addnew/dvd_player.png");
    }
    if (name == "TATA sky") {
      return (this.imgPath = "assets/addnew/dth.png");
    }
    if (name == "DTH") {
      return (this.imgPath = "assets/addnew/dth.png");
    } else {
      return (this.imgPath = "assets/HomePage/dyfo.png");
      // return this.imgPath='';
    }
  }

  clickdeviceforstatus(d_id: any, d_status: any, d_name: any, id_for_del_dev: any) {

    setTimeout(() => {
      console.log("d_id" + d_id);
      console.log("id_for_del_dev" + id_for_del_dev);
      console.log("d_status" + d_status);
      this.user.device_status_id = d_id;
      this.user.device_status_status = d_status;
      let navigationExtras: NavigationExtras = {
        queryParams: {
          special: btoa(this.user.device_status_id),
          special1: btoa(this.user.device_status_status),
          special2: btoa(d_name),
          special3: btoa(this.room_name_for_edit),
          special4: btoa(id_for_del_dev),
        },
      };
      console.log("device click for all edit sattus");
      this.route.navigate(["devicestatus"], navigationExtras);
    }, 2000);
    // this.show=false;   for hide edit device roomname and delete device card
  }
  changeLightStatus(e: any, id: any, dev_st: any, r_id: any) {
    console.log("$event", e);
    console.log("R.Device", id);
    console.log("R.Status", dev_st);
    console.log("check r_id", r_id);
    this.R_id = r_id;
    if (dev_st == "False") {
      this.auth.changeStatuswithCheck(id, 1).subscribe((res) => {
        this.user.dismiss();
        for (let d of this.user.device_inRoom) {
          if (d.device == id) {
            d.status = "True";
          }
        }
      });

      return;
    }
    if (dev_st == "True") {
      this.auth.changeStatuswithCheck(id, 0).subscribe((res) => {
        this.user.dismiss();
        for (let d of this.user.device_inRoom) {
          if (d.device == id) {
            d.status = "False";
          }
        }
      });
      return;
    }
  }
}
