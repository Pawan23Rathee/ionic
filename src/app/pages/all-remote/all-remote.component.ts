import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Swiper } from 'swiper';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-all-remote',
  templateUrl: './all-remote.component.html',
  styleUrls: ['./all-remote.component.scss'],
})
export class AllRemoteComponent implements OnInit {

  remoteid: any;
  acRemote: any;
  room: boolean = false;
  remotes: boolean = true;
  editRoom: boolean = false;
  roomImg: any;
  roomId: any;
  selectedRooms: any;
  //irModule;
  checkRoom: any;
  idremote1: any;

  public rooms = [{
    name: 'Living_Room', imgPath: 'assets/icon/living_room.jpg', id: 1
  }, {
    name: 'Bed_Room', imgPath: 'assets/icon/bedroom.jpeg', id: 2
  }, {
    name: 'Kitchen', imgPath: 'assets/icon/kitchen.jpg', id: 3
  }, {
    name: 'Kids_Room', imgPath: 'assets/icon/kidsroom.jpg', id: 4
  }, {
    name: 'Drawing_Room', imgPath: 'assets/icon/drawing-room.jpg', id: 5
  }, {
    name: 'Balcony', imgPath: 'assets/icon/balcony.jpg', id: 6
  }, {
    name: 'Bathroom', imgPath: 'assets/icon/bathroom.jpg', id: 7
  }, {
    name: 'Toilet', imgPath: 'assets/icon/toilet.jpg', id: 8
  }, {
    name: 'Corridoor', imgPath: 'assets/icon/corridor.jpg', id: 9
  }, {
    name: 'Hall', imgPath: 'assets/icon/hall.jpg', id: 10
  }, {
    name: 'Guest_Room', imgPath: 'assets/icon/guest_room.jpg', id: 11
  }, {
    name: 'Theater_Room', imgPath: 'assets/icon/theater_room.jpeg', id: 12
  }, {
    name: 'Store_Room', imgPath: 'assets/icon/store1.jpg', id: 13
  }, {
    name: 'Office', imgPath: 'assets/icon/office_room.jpg', id: 14
  }, {
    name: 'Conference', imgPath: 'assets/icon/conference.jpg', id: 15
  }, {
    name: 'Dining_Room', imgPath: 'assets/icon/dining room.jpeg', id: 14
  }, {
    name: 'Stairs', imgPath: 'assets/icon/stairs.jpg', id: 15
  },
  ];

  constructor(public user: UserService,
    public auth: AuthService,
    private router: Router) { }

  cp_name: string = "";
  pr_name: string = "";
  imgPath: any;
  remoteAllId: Array<any> = [];
  // @ViewChild('swiper')
  // swiperRef: ElementRef | undefined;
  // @ViewChild('swiper') swiperContainer: ElementRef;
  // private swiperInstance: Swiper | undefined;
  // @ViewChild('newSwiper') newSwiper: any;
  ngOnInit() {

    this.cp_name = this.user.companyName;
    this.pr_name = this.user.productName;
    console.log(this.user.idremote21);
    let i = 0;
    for (i; i < this.user.idremote21.length; i++) {
      this.remoteAllId[i] = this.user.idremote21[i];
    }
    console.log('company_name' + this.user.companyName);

    console.log('prod_name' + this.user.productName);
    if (this.user.productName == "TELEVISION" && this.user.companyName == "LG") {
      return this.imgPath = '/assets/remote-image/dthimg/177.JPG'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "Haier") {
      return this.imgPath = '/assets/tv_remote/Haier.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "Haier") {
      return this.imgPath = '/assets/tv_remote/Haier2.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "Akai") {
      return this.imgPath = '/assets/tv_remote/Akai.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "Akai") {
      return this.imgPath = '/assets/tv_remote/Akai2.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "AOC") {
      return this.imgPath = '/assets/tv_remote/AOC2.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "APPLE") {
      return this.imgPath = '/assets/tv_remote/APPLE.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "BOSE") {
      return this.imgPath = '/assets/tv_remote/BOSE.png'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "CROMA") {
      return this.imgPath = '/assets/tv_remote/CROMA.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "BPL") {
      return this.imgPath = '/assets/tv_remote/BPL.png'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "CLOUDWALK") {
      return this.imgPath = '/assets/tv_remote/CLOUDWALK.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "CROWN") {
      return this.imgPath = '/assets/tv_remote/CROWN.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "DAPICLED") {
      return this.imgPath = '/assets/tv_remote/DAPICLED.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "GODREJ") {
      return this.imgPath = '/assets/tv_remote/GODREJ.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "HISENSE") {
      return this.imgPath = '/assets/tv_remote/HISENSE.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "HITACHI") {
      return this.imgPath = '/assets/tv_remote/HITACHI2.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "IPTVBOX") {
      return this.imgPath = '/assets/tv_remote/IPTVBOX.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "LETV") {
      return this.imgPath = '/assets/tv_remote/LETV.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "MAGIP") {
      return this.imgPath = '/assets/tv_remote/MAGIP.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "MI") {
      return this.imgPath = '/assets/tv_remote/MI.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "MITASHI") {
      return this.imgPath = '/assets/tv_remote/MITASHI.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "PANASONIC") {
      return this.imgPath = '/assets/tv_remote/PANASONIC.png'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "ONIDA") {
      return this.imgPath = '/assets/tv_remote/ONIDA2.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "PHILIPS") {
      return this.imgPath = '/assets/tv_remote/PHILIPS.png'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "SANYO") {
      return this.imgPath = '/assets/tv_remote/SANYO.jpeg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "SHINCO") {
      return this.imgPath = '/assets/tv_remote/SHINCO.png'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "SKYWORTH") {
      return this.imgPath = '/assets/tv_remote/SKYWORTH.png'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "SONY") {
      return this.imgPath = '/assets/tv_remote/SONY.png'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "TCL") {
      return this.imgPath = '/assets/tv_remote/TCL.jpeg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "UV") {
      return this.imgPath = '/assets/tv_remote/UV.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "VIDEOCON") {
      return this.imgPath = '/assets/tv_remote/VIDEOCON.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "VISE") {
      return this.imgPath = '/assets/tv_remote/VISE.jpeg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "SAMSUNG") {
      return this.imgPath = '/assets/tv_remote/SAMSUNG.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "SANSUI") {
      return this.imgPath = '/assets/tv_remote/SANSUI.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "SHARP") {
      return this.imgPath = '/assets/tv_remote/SHARP.jpeg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "TOSHIBA") {
      return this.imgPath = '/assets/tv_remote/TOSHIBA2.jpeg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "ROLSEN") {
      return this.imgPath = '/assets/tv_remote/ROLSEN.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "BTRONE") {
      return this.imgPath = '/assets/tv_remote/35.jpg'
    }
    else if (this.user.productName == "TELEVISION" && this.user.companyName == "NEC" || this.user.companyName == "RECONNECT" || this.user.companyName == "TECHNOTOWN" || this.user.companyName == "UPTRON" || this.user.companyName == "WITCHER" || this.user.companyName == "WORLDTECH" || this.user.companyName == "ZEMFAN" || this.user.companyName == "INTEX" || this.user.companyName == "IPLUS" || this.user.companyName == "KORYO") {
      return this.imgPath = '/assets/tv_remote/35.jpg'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "AUX") {
      return this.imgPath = '/assets/ac_remote/AUX.jpg'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "AMAZONE BESIS") {
      return this.imgPath = '/assets/ac_remote/amazonebesis.jpg'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "CARRIER") {
      return this.imgPath = '/assets/ac_remote/carrier.jpeg'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "ELECTROLUX") {
      return this.imgPath = '/assets/ac_remote/ELECTROLUX.jpg'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "BLUESTAR") {
      return this.imgPath = '/assets/ac_remote/BLUESTAR.png'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "voltas") {
      return this.imgPath = '/assets/ac_remote/VOLTAS.png'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "WHIRLPOOL") {
      return this.imgPath = '/assets/ac_remote/WHIRLOOP.jpg'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "DAIKIN") {
      return this.imgPath = '/assets/ac_remote/DAIKIN.jpeg'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "YOKO") {
      return this.imgPath = '/assets/tv_remote/YOKO.jpg'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "TRANE") {
      return this.imgPath = '/assets/ac_remote/TRANE.png'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "NAPOLEON") {
      return this.imgPath = '/assets/ac_remote/NAPOLEON.png'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "KENSTAR") {
      return this.imgPath = '/assets/ac_remote/kenstar.jpg'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "DREAM CARE") {
      return this.imgPath = '/assets/ac_remote/DREAM.png'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "CRUSE") {
      return this.imgPath = '/assets/ac_remote/CRUSE.jpeg'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "GENERAL") {
      return this.imgPath = '/assets/ac_remote/AC73.jpg'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "IFB") {
      return this.imgPath = '/assets/ac_remote/AC79.jpg'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "IFB") {
      return this.imgPath = '/assets/ac_remote/AC80.png'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "LLOYD") {
      return this.imgPath = '/assets/ac_remote/LLOYD_ac83.png'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "LLOYD") {
      return this.imgPath = '/assets/ac_remote/LLOYD_ac84.jpg'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "LLOYD") {
      return this.imgPath = '/assets/ac_remote/LLOYD_ac85.jpg'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "LLOYD") {
      return this.imgPath = '/assets/ac_remote/LLOYD_ac86.jpg'
    }
    else if (this.user.productName == "AC" && this.user.companyName == "LLOYD") {
      return this.imgPath = '/assets/ac_remote/LLOYD_ac89.jpg'
    }

    //------------------ HOME THEATRE    
    else if (this.user.productName == "HOME THEATRE" && this.user.companyName == "Arcam") {
      return this.imgPath = '/assets/home_theatre/arcam'
    }

    //------------------ SET TOP BOX 
    else if (this.user.productName == "SETTOP BOX" && this.user.companyName == "AIRTEL") {
      return this.imgPath = '/assets/settop_box/airtel.png'
    }
    else if (this.user.productName == "SETTOP BOX" && this.user.companyName == "TATA SKY") {
      return this.imgPath = '/assets/settop_box/tatasky.png'
    }

    //------------------ DVD PLAYER
    else if (this.user.productName == "DVD PLAYER" && this.user.companyName == "DUNE") {
      return this.imgPath = '/assets/dvdplayer/dune.jpeg'
    }
    else if (this.user.productName == "DVD PLAYER" && this.user.companyName == "MECOOL") {
      return this.imgPath = '/assets/dvdplayer/mecool.jpg'
    }
    else if (this.user.productName == "DVD PLAYER" && this.user.companyName == "PIONEER") {
      return this.imgPath = '/assets/dvdplayer/pioneer.jpg'
    }
    else if (this.user.productName == "DVD PLAYER" && this.user.companyName == "POPCORN HOUR") {
      return this.imgPath = '/assets/dvdplayer/popcorn.jpg'
    }
    else if (this.user.productName == "DVD PLAYER" && this.user.companyName == "ZINDOO") {
      return this.imgPath = '/assets/dvdplayer/zindoo.jpg'
    }

    //-----------TATA SKY
    else if (this.user.productName == "TATA SKY" && this.user.companyName == "MARANTZ") {
      return this.imgPath = '/assets/dth/d2h.png'
    }


    //-----------D2H
    else if (this.user.productName == "TATA SKY" && this.user.companyName == "TATA sky") {
      return this.imgPath = '/assets/dth/tata.jpg'
    }
    else if (this.user.productName == "TATA SKY" && this.user.companyName == "DDFreshDish") {
      return this.imgPath = '/assets/dth/ddfreshdish.png'
    }
    else if (this.user.productName == "TATA SKY" && this.user.companyName == "SunDirect") {
      return this.imgPath = '/assets/dth/sundirect'
    }

    else if (this.user.productName == "TATA SKY" && this.user.companyName == "Hathway") {
      return this.imgPath = '/assets/dth/hathway.jpg'
    }
    else if (this.user.productName == "TATA SKY" && this.user.companyName == "ICC" || this.user.companyName == "InDigital" || this.user.companyName == "Reliance") {
      return this.imgPath = '/assets/dth/d2h.png'
    }

    else if (this.user.productName == "AC" && this.user.companyName == "CAMIPRO" || this.user.companyName == "MISUBISHI ELECTRIC" || this.user.companyName == "TECHNOTOWN" || this.user.companyName == "UPTRON" || this.user.companyName == "WITCHER" || this.user.companyName == "WORLDTECH" || this.user.companyName == "ZEMFAN" || this.user.companyName == "INTEX" || this.user.companyName == "IPLUS" || this.user.companyName == "KORYO") {
      return this.imgPath = '/assets/tv_remote/35.jpg'
    }
    else {
      return this.imgPath = '/assets/tv_remote/35.jpg'
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeSwiper();
    }, 500)
  }
swiper:any;
  initializeSwiper() {
    const swiperContainer = document.querySelector('.swiper-container') as HTMLElement;

    this.swiper = new Swiper(swiperContainer,{

    })
    //  this.swiper = new Swiper('.swiper-container', {
    //   // your Swiper configuration options here
    // });
    
    console.log('Swiper initialized:', this.swiper);
    
  }
  next() {
    this.swiper.nativeElement.swiper.slidePrev();

  }
  prev() {
    // this.swiper.nativeElement.swiper.slidePrev(500);
    // this.slides.slidePrev();
  }

  call() {
    console.log("xyzid" + this.idremote1)
  }

  checked(e: any, on: any, off: any, remoteid: any) {
    let piId = this.user.moduleIdForKey;
    if (e.currentTarget.checked == true) {
      console.log(on)
      this.auth.pressKey(remoteid, "Power_on_button", piId).subscribe(res => {

      })
    }
    if (e.currentTarget.checked == false) {
      console.log(off)
      this.auth.pressKey(remoteid, "Power_off_button", piId).subscribe(res => {

      })
    }
  }

  saveRemote(remoteid: any) {

    this.remoteid = remoteid;
    this.user.remote_iid = remoteid;
    console.log(remoteid)
    this.auth.checkForRoom(this.user.module_piId).subscribe(res => {
      this.checkRoom = res;
      console.log(this.checkRoom)
      if (this.checkRoom == 0) {
        // this.room=true;
        this.user.remote_iid = remoteid;
        {
          this.router.navigateByUrl('/devices');
        }
        this.remotes = false;
      }
      if (this.checkRoom != 0) {
        // this.remotes=false;
        // this.room=true;
        this.acRemote = remoteid;
        debugger
        this.auth.saveRemote(this.remoteid, this.user.module_piId, this.checkRoom[0].room).subscribe(res => {
          this.router.navigateByUrl('/mainpage');
        })
      }
    })
  }

  addedRooms(room: any) {
    console.log(room)
    this.roomImg = room.imgPath;
    this.selectedRooms = room.name;
    this.room = false;
    this.editRoom = true;
  }
  saveRoomWithApi() {
    var name = (<HTMLInputElement>document.getElementById('input')).value;
    var type = this.selectedRooms;
    console.log(type);
    this.auth.createRoom(name, type).subscribe((res) => {
      this.roomId = res;
      this.auth.saveRemote(this.remoteid, this.user.module_piId, this.roomId.id).subscribe(res => {
        this.router.navigateByUrl('/mainpage');
      })
    })
  }
}