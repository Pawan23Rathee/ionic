import { Component, OnInit, ViewChild, OnChanges, ViewChildren, QueryList, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { ModalController, MenuController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { ModedevicesComponent } from '../modedevices/modedevices.component';
import { UserService } from 'src/app/services/user.service';
import { NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-modes',
  templateUrl: './modes.component.html',
  styleUrls: ['./modes.component.scss'],
})

export class ModesComponent implements OnInit, AfterViewInit {
  @ViewChildren('anchor') anchorList: QueryList<ElementRef> = new QueryList<ElementRef>();
  @ViewChild('slideWithNav', { static: false }) slideWithNav: any;

  // sliderOne: any;
  // Item object for Nature
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
  // display mode
  // checked = false;
  showApplDiv = false;
  dev_det_box = false;
  modeTitle: any;
  // Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    // autoplay: true
  };
  // configuration for editmode slider
  editMod = false;
  editslideOpts = {
    initialSlide: 0,
    slidesPerView: 1
  };

  modes = false;
  allDevices: any;
  dev_ToSelect: Array<any> = [];
  selectedDevs: Array<any> = [];
  source: Array<any> = [];
  allMods: Array<any> = [];
  devOfMods: any;
  index: any;
  constructor(
    private menu: MenuController,
    private elRef: ElementRef,
    private auth: AuthService,
    private user: UserService,
    public modalCtrl: ModalController,
    private navCtrl: NavController,
  ) {
    this.getRoom();
  }

  ngOnInit() {
    // this.editClick();
    // this.getModes();
    // this.allDevToSelect();

  }
  ionViewWillEnter() {
    this.getModes();
    this.allDevToSelect();
  }
  openMenu() {
    this.menu.enable(true);
    this.menu.open('first');
  }
  backbutton() {
    this.user.showDevice = false;
    this.user.showRoom = true;
  }
  addMode() {
    this.navCtrl.navigateForward(['/addmode']);
  }
  getModes() {
    // this.allMods.length = 0;
    this.allMods=[];
    this.user.present('Please wait...'); //.............loader.....
    this.auth.getAllMode().subscribe(res => {
      console.log("this is res",res);
      this.user.dismiss();
      this.allMods.push(res);
      for (let mod of this.allMods[0]) {
        // console.log(mod)
        // this.getModDevs(mod.id);
        var img_matched: any;
        for (let img of this.sliderOne.slidesItems) {
          if (img.id == mod.name.charAt(0)) {
            img_matched = img.image;
            break;
          }
          else {
            img_matched = 'assets/irblaster_img/defaultMode.png'
          }
        }
        this.source.push({
          id: mod.id,
          img: img_matched,
          mname: mod.name.slice(1)
        });
      }

    })
  }
  dev_ToDisp: Array<any> = []
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
        let state: boolean;
        if (d.status.toLowerCase() == 'true' || d.status == '1') {
          state = true;
        } else if (d.status.toLowerCase() == 'false' || d.status == '0') {
          state = false;
        } else {
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

  devToSelect(devOfMods: any) {
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

  ngAfterViewInit() {
  }
  // Move to Next slide
  slideNext(object: any, slideView: any) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  // Move to previous slide
  slidePrev(object: any, slideView: any) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }
  // Method called when slide is changed by drag or navigation
  SlideDidChange(object: any, slideView: any) {
    this.checkIfNavDisabled(object, slideView);
  }
  checkIfNavDisabled(object: any, slideView: any) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object: any, slideView: any) {
    slideView.isBeginning().then((istrue: any) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object: any, slideView: any) {
    slideView.isEnd().then((istrue: any) => {
      object.isEndSlide = istrue;
    });
  }

  getcurrentimg(object: any, slideView: any) {
    slideView.getActiveIndex().then((i: any) => {
      this.index = i;
      // console.log(i);
    });
    //   this.slideWithNav.getActiveIndex().then(index => {
    //     console.log(index);
    //  });
  }

  allDevToSelect() {
    this.auth.showAllAddedDevices().subscribe(res => {
      // this.modes = true;
      this.allDevices = res;
      console.log(this.allDevices);

    },
      err => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        // footer: '<a href>Why do I have this issue?</a>'
      }))
  }


  setmode(form: any) {
    // console.log(this.selectedDevs)
    this.user.present('Please wait...');
    const item = this.sliderOne.slidesItems[this.index];
    let mod_name;
    if (form.value.modename == '') {
      // this.source.push({
      //   img: item.image,
      //   mname: item.name} );
      mod_name = item.id + item.name
    } else {
      // this.source.push({
      //   img: item.image,
      //   mname: form.value.modename} );
      mod_name = item.id + form.value.modename;
    }

    this.auth.createMode(mod_name).subscribe(res => {
      console.log(res)
      this.user.dismiss();
      let timerInterval: any;
      // Swal.fire({
      //   title: 'Creating Mode...',
      //   timer: 2000,
      //   timerProgressBar: true,
      //   onBeforeOpen: () => {
      //     Swal.showLoading()
      //     timerInterval = setInterval(() => {
      //       const content = Swal.getContent()
      //     }, 100)
      //   },
      //   onClose: () => {
      //     clearInterval(timerInterval)
      //   }
      // }).then((result) => {
      //   /* Read more about handling dismissals below */
      //   if (result.dismiss === Swal.DismissReason.timer) {
      //     console.log('I was closed by the timer')
      //   }
      // })
      Swal.fire({
        title: "Creating Mode...",

      })


      this.auth.refreshPage();
    })
    this.modes = false;
    // this.editClick();
  }

  addModeDevices(devDetail: any) {
    let status;
    if (devDetail.status == "False") {
      status = "0";
    }
    else {
      status = "1"
    }
    console.log(devDetail)
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

  ischecked(e: any) {
    if (e.currentTarget.checked) {
      $(e.target).parent('div').parent('div').removeClass('inactive');
      $(e.target).parent('div').parent('div').addClass('active');
      // console.log( e.target);
    } else {
      $(e.target).parent('div').parent('div').removeClass('active');
      $(e.target).parent('div').parent('div').addClass('inactive');
    }
  }
  mode_id: any;
  editClick(i: any) {
    // this.mode_id = i.id;
    // this.getModDevs(i.id)
    // // console.log(this.devOfMods)
    // let currentsrc: string = i.img;
    // let arr = [...this.sliderOne.slidesItems];
    // //  console.log(arr);
    // for (let j = 0; j < arr.length; j++) {
    //   let el = arr[j];
    //   if (el.image == currentsrc) { this.editslideOpts.initialSlide = j; }
    // }
    // //  console.log('called' + i.img + this.editslideOpts.initialSlide);
    // this.selectedDevs = []
    // this.editMod = true;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(i)
      }
    };
    this.navCtrl.navigateForward(['editmode'], navigationExtras);

  }

  saveeditMode(form: any) {
    if (this.selectedDevs) {
      // console.log(this.selectedDevs)
      for (let detail of this.selectedDevs) {
        this.addModeDevices(detail);
      }
    }
    this.editMod = false;
  }
  async showAppl(i: any) {
    console.log(i)
    console.log('mode click..for get devices...')
    this.showApplDiv = true;
    this.modeTitle = i.mname;
    this.getModDevs(i.id);
    const modal = await this.modalCtrl.create({
      component: ModedevicesComponent,
      componentProps: { dev_data: this.dev_ToDisp, modeTitle: i.mname, modId: i.id }
    });
    return await modal.present();
  }

  deleteMode(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      heightAuto: false
    }).then((result) => {
      if (result.value) {
        this.auth.del_Mod(id).subscribe(res => {
          console.log(res);
          for (var i = 0; i < this.source.length; i++) {
            if (this.source[i].id == id) {
              this.source.splice(i, 1);
            }
          }

          // Swal.fire(
          //   'Deleted!',
          //   'Deleted Successfully',
          //   'success'
          // ).then(() => {
            Swal.close(); // Close the Swal dialog after displaying the success message
          // });
        })
      }
    })
  }

  imgPath: any;
  showDevImg(name: any) {
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
  // setDevDetail(){
  //   console.log(this.selectedDevs)
  //   this.dev_det_box=false;
  // }
  power(status: any) {
    console.log(status)
  }
  dimmer(status: any) {
    console.log(status)
  }
  myRooms: any;
  getRoom() {
    this.auth.getRoomFromApi().subscribe(res => {
      this.myRooms = res;
      console.log(this.myRooms);
    }, err => {
      this.user.showToast(err.error);
    },
    )
  }
  deviceAll: any;
  showDevices = false;
  noshowDevices = false;
  checkValue(event: any) {
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

  favpage() {
    this.navCtrl.navigateRoot('/favlist');
  }
  rgbpage() {
    this.navCtrl.navigateRoot('/rgb-list');
  }
  securitylockpage() {
    this.navCtrl.navigateRoot('/securitylock');
  }
  mainpage() {
    this.navCtrl.navigateRoot('/mainpage');
  }
}


