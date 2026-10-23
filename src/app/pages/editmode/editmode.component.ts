import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { ModedevicesComponent } from '../modedevices/modedevices.component';
import { UserService } from 'src/app/services/user.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-editmode',
  templateUrl: './editmode.component.html',
  styleUrls: ['./editmode.component.scss'],
})
export class EditmodeComponent implements OnInit {
  deviceAll:any;
  myRooms:any;
  showDevices: boolean = false;
  noshowDevices: boolean = false;
  dev_det_box: boolean = false;
  selectedDevs:Array<any> = [];
  editMod: any = false;
  mode_id: any;
  sliderOne = {
    isBeginningSlide: true,
    isEndSlide: false,
    slidesItems: [
      {
        id: 'a',
        name: 'Night',
        image: '../../assets/images/night.jpeg'
      },
      {
        id: 'b',
        name: 'Party',
        image: '../../assets/images/party.jpg'
      },
      {
        id: 'c',
        name: 'Relax',
        image: '../../assets/images/relax.png'
      },
      {
        id: 'd',
        name: 'Romance',
        image: '../../assets/images/romance.jpg'
      },
      {
        id: 'e',
        name: 'Summer',
        image: '../../assets/images/summer.jpg'
      },
      {
        id: 'f',
        name: 'Festival',
        image: '../../assets/images/festival.jpg'
      },
      {
        id: 'g',
        name: 'Energy',
        image: '../../assets/images/energy2.png'
      }
    ]
  };
  dev_ToDisp: Array<any> = [];
  editslideOpts = {
    initialSlide: 0,
    slidesPerView: 1
  };
  devOfMods:any;
  allDevices:any;
  imgPath:any;
  dev_ToSelect: Array<any> = [];
  param:any;
  constructor(
    private auth: AuthService,
    private user: UserService,
    public navController: NavController,
    public activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("param check",JSON.parse(params['data']));
      let param = JSON.parse(params['data']);
     this.param = param;
     this.mode_id = this.param.id;
  });
    this.getRoom();
  }

  ngOnInit() { }
  initFunction() {
    
    this.getModDevs(this.mode_id)
    // console.log(this.devOfMods)
    let currentsrc: string = this.param.img;
    let arr = [...this.sliderOne.slidesItems];
    //  console.log(arr);
    for (let j = 0; j < arr.length; j++) {
      let el = arr[j];
      if (el.image == currentsrc) { this.editslideOpts.initialSlide = j; }
    }
    //  console.log('called' + i.img + this.editslideOpts.initialSlide);
    this.selectedDevs = []
    this.editMod = true;
  }
  getModDevs(mode_id: any) {
    this.user.present('Please wait...');
    this.dev_ToDisp = [];
    this.auth.getDevForMode(mode_id).subscribe(res => {
      console.log(res);

      this.user.dismiss();
      this.devOfMods = res;

      if (this.devOfMods.dimmer == null) {
        console.log('empy')
      }


      for (let d of this.devOfMods) {
        for (let a of this.allDevices) {
          if (d.device == a.device) {
            var D_name = a.name;
            var D_img = this.showDevImg(a.device_type)
          }
        }
        var state :any;
        if (d.status.toLowerCase() == 'true' || d.status == '1') {
           state = true;
        }
        if (d.status.toLowerCase() == 'false' || d.status == '0') {
           state = false;
        }
        this.dev_ToDisp.push({
          id: d.device,
          name: D_name,
          status: state,
          dimmer: d.dimmer,
          img: D_img,


        })
      }
      this.dev_ToSelect = [];

      if (this.devOfMods.length !== 0) {
        // alert('dev exist')
        this.devToSelect(this.devOfMods);
      } else {
        this.dev_ToSelect = [...this.allDevices];
        console.log(this.allDevices)
        console.log(this.dev_ToSelect)
      }

    })
  }
  devToSelect(devOfMods:any) {
    this.dev_ToSelect = [];
    let dev_Select = [];
    dev_Select = [...this.allDevices];
    console.log(devOfMods)
    console.log(dev_Select)
    for (var i = 0; i < devOfMods.length; i++) {
      for (var j = 0; j < dev_Select.length; j++) {
        if (devOfMods[i].device == dev_Select[j].device) {
          console.log(dev_Select[j])
          dev_Select.splice(j, 1)
        }
      }
    }
    console.log(dev_Select)
    console.log(this.allDevices)
    this.dev_ToSelect = dev_Select;
  }
  showDevImg(name:any) {
    if (name == "Tube_Light") {
      return this.imgPath = 'assets/icon/tubelight.png'
    }
    if (name == "Fan") {
      return this.imgPath = 'assets/icon/fan.png'
    }
    if (name == "Tv") {
      return this.imgPath = 'assets/icon/tv.png'
    }
    if (name == "Bulb") {
      return this.imgPath = 'assets/icon/light.png'
    }
    if (name == "Lamp") {
      return this.imgPath = 'assets/icon/wall-lamp.png'
    }
    if (name == "Geyser") {
      return this.imgPath = 'assets/icon/geyser.png'
    }
    if (name == "Ac") {
      return this.imgPath = 'assets/icon/ac.jpg'
    }
    if (name == "Table_Lamp") {
      return this.imgPath = 'assets/icon/table_lamp.png'
    }
    if (name == "Chandelier") {
      return this.imgPath = 'assets/icon/chandelier.png'
    }
    if (name == "Table_Fan") {
      return this.imgPath = 'assets/icon/table_fan.png'
    }
    if (name == "Curtain") {
      return this.imgPath = 'assets/icon/curtain.png'
    }
    return
  }
  getRoom() {
    this.auth.getRoomFromApi().subscribe(res => {
      this.myRooms = res;
      console.log(this.myRooms);
    }, err => {
      this.user.showToast(err.error);
    },
    )
  }
  checkValue(event:any) {
    console.log("in check value")
    console.log(event.detail.value.name);
    console.log(event.detail.value.id);
    this.auth.getDeviceFromApi(event.detail.value.name).subscribe(res => {
      this.deviceAll = res;

      console.log(this.deviceAll);
      if (this.deviceAll == "") {
        console.log("empty");
        this.noshowDevices = true;
        this.showDevices = false;
      }
      else {
        console.log(JSON.stringify(this.deviceAll))
        this.showDevices = true;
        this.noshowDevices = false;

      }
    }, err => {
      console.log("Device get Error:" + err.error);
    })
  }
  power(status:any) {
    console.log("checkstatus",status);
  }
  dimmer(status:any) {
    console.log(status)
  }
  saveeditMode(form:any) {
    if (this.selectedDevs) {
      // console.log(this.selectedDevs)
      for (let detail of this.selectedDevs) {
        this.addModeDevices(detail);
      }
    }
    this.editMod = false;
  }
  addModeDevices(devDetail:any) {
    let status;
    if (devDetail.status == false) {
      status = "0";
    }
    else {
      status = "1"
    }
    console.log("devDetail",devDetail);
    let dev_Detail = {
      dimmer: devDetail.dimmer,
      device: devDetail.device,
      mode: this.mode_id,
      status: status
    };
    this.auth.addModeDevices(dev_Detail).subscribe(res => {
      console.log(res);
    })
  }
  navBack() {
    this.navController.navigateRoot('/mode');
  }
}
