import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import {
  MenuController, NavController, LoadingController, AlertController, ModalController, ActionSheetController, Platform,
} from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
// import * as $ from 'jquery';
import { UserService } from "src/app/services/user.service";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { EditdeviceComponent } from "../editdevice/editdevice.component";
import { IrremotemoreComponent } from "../irremotemore/irremotemore.component";
import { IrremotenumberComponent } from "../irremotenumber/irremotenumber.component";
import { Geolocation } from "@awesome-cordova-plugins/geolocation/ngx";
import { from } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Deeplinks } from "@awesome-cordova-plugins/deeplinks/ngx";
import { FavlistComponent } from "../favlist/favlist.component";

declare var CameraCustom: any;
declare var TTlockdata: any;
import { Swiper } from 'swiper';
import Chart from 'chart.js/auto';
@Component({
  selector: "app-mainpage",
  templateUrl: "./mainpage.component.html",
  styleUrls: ["./mainpage.component.scss"],
})
export class MainpageComponent implements OnInit {
  totalDevice = true;
  normalDevs: Array<any> = [];
  moodDevs: Array<any> = [];
  lockDevs: Array<any> = [];
  device_inRoom_is_dimmer_false: Array<any> = [];
  device_inRoom_is_dimmer_true: Array<any> = [];
  place: string = "";
  type: string = "";
  icon: string = "";
  temperature: string = "";
  today;
  month;
  date1;
  day1;
  salutaion;
  urlsrc: any;
  data: any;
  password: any;
  ttpass: any;
  longPressTimer: any;
  R_id: any = null;

  // GRAPH
  bars: any;
  energyData: any;
  tt_w_avg_hours: any;
  tt_w_avg_watts: any;
  tt_w_total_hours: any;
  tt_w_total_watts: any;
  totaluserwDays: string[] = [];
  totaluserwWatts: any[] = [];
  totaluserwHours: string[] = [];

  totalusermMonth: string[] = [];
  totalusermhours: string[] = [];
  totalusermwatts: any[] = [];
  tt_weeklydata: any;
  tt_weeklyData: any;
  scenes: any;
  turnOnDeviceCount: any
  turnOffDeviceCount: any;
  favourite: any;
  @ViewChild("menu1", { static: false }) menu1: ElementRef;
  @ViewChild("buttonSlideEle", { static: true }) buttonSlideEle: any;

  // @ViewChild('swiper');
  @ViewChild("barChartTotalweekly") barChartTotalweekly: any;
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  constructor(
    private menu: MenuController,
    private auth: AuthService,
    public user: UserService,
    private navCtrl: NavController,
    private deeplinks: Deeplinks,
    private loadingCtrl: LoadingController,
    public alertController: AlertController,
    public route: Router,
    private httpClient: HttpClient,
    public activateRoute: ActivatedRoute,
    public actionsheetCtrl: ActionSheetController,
    public modalController: ModalController,
    private geolocation: Geolocation,
    private router: Router,
    private platform: Platform
  ) {
    this.menu1 = new ElementRef(null);
    // this.user.r_select_type = localStorage.getItem("r_select_type");
    this.user.r_select_type = "rectangle";
    this.today = Date.now();

    var d = new Date(this.today);
    var ds = d.toDateString();
    var time = d.toLocaleTimeString();
    if (time > "04:00:00" && time <= "11:59:59") {
      this.salutaion = "Good Morning";
    } else if (time > "00:00:00" && time <= "03:59:00") {
      this.salutaion = "Good Night";
    } else if (time > "12:00:00" && time <= "16:00:00") {
      this.salutaion = "Good Afternoon";
    } else {
      this.salutaion = "Good Evening";
    }
    this.month = ds.replace(/['"]+/g, "").substr(4, 3);
    this.date1 = ds.replace(/['"]+/g, "").substr(8, 2);
    this.day1 = ds.replace(/['"]+/g, "").substr(0, 3);

    this.getTotalAllEnergy();
    this.getModes();
    this.getfavlist();
  }
  prdetail: any;
  user_name: any;
  getUserProfile() {
    this.auth.userProfile().subscribe((res) => {
      this.prdetail = res;
      this.user.username = this.prdetail.name.split(" ")[0];
      this.user.username2 = this.prdetail.email.split(" ")[0];
    });
  }

  devicetotl: any;
  getfavlist() {
    this.user.present('Please wait...');
    this.auth.getfavlist().subscribe(res => {
      this.favourite = res;
      console.log("getfavlist", res);

    })
    this.user.dismiss();
  }
  getDeviceTotal() {
    this.auth.getDeviceNumber().subscribe((res) => {
      console.log("getDeviceNumber", res);
      this.devicetotl = res;
      this.user.total_Room = this.devicetotl.total_rooms;
      this.user.total_Devices = this.devicetotl.total_devices;
      this.user.total_device_online = this.devicetotl.total_on_devices;
      this.turnOnDeviceCount = this.devicetotl.total_on_devices;
      this.turnOffDeviceCount = (this.devicetotl.total_devices) - (this.devicetotl.total_on_devices);
      console.log(this.devicetotl.total_rooms);
      console.log(this.devicetotl.total_on_devices);
      console.log(this.devicetotl.total_devices);
      for (let i = 0; i < this.devicetotl.length; i++) { }
    });
  }
  getCurrentTemp(latitude: any, longitude: any) {
    var url =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=9dd8f04b8fec223d11a284254cdea0c2";
    var url1 = encodeURI(url);
    this.httpClient.get(url1).subscribe((temperaturedata) => {
      var obj = <any>temperaturedata;
      this.place = obj.name;
      this.type = obj.weather[0].main;
      this.icon =
        "https://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";
      this.temperature = (parseFloat(obj.main.temp) - 273.15)
        .toFixed(2)
        .toString()
        .replace(/['"]+/g, "")
        .substr(0, 4);
      // alert(this.temperature);
    });
  }
  private selectedItem: any;
  ngOnInit() {
    this.platform.ready().then(() => {
      this.deeplinks
        .routeWithNavController(this.navCtrl, {

        })
        .subscribe(
          (match: any) => {

            let value = match.$link.queryString;
            var n = value.indexOf("&");
            var result = value.substring(5, n);
            this.user.authCode = result;
            this.navCtrl.navigateRoot("/linkSuccess");
          },
          (nomatch) => {
          }
        );
    });
    this.menu.enable(true);
    this.selectedItem = 1;
  }
  ionViewWillEnter() {
    // this.addRooms();
    // this.check(event);
    // this.getUserProfile();
    this.getDeviceTotal();
  }
  getModes() {
    this.user.present('Please wait...');
    this.auth.getAllMode().subscribe(res => {
      this.scenes = res;
      
      this.scenes.forEach((item: any) => {
        // Remove the first character from the name property
        item.name = item.name.substring(1);
      });
      console.log("This is scene", this.scenes);
    })
    
    this.user.dismiss();
  }
  addScene() {
    this.navCtrl.navigateForward(['/addmode']);
  }
  devices() {
    this.navCtrl.navigateForward(['/rooms']);
  }
  public buttonSlides = {
    slidesPerView: 2.1,
    initialSlide: 0,
  };
  openMenu() {
    this.menu.enable(true);
    this.menu.open("first");
  }
  myRooms: any;
  light_Device: boolean = false;
  ir_Device: boolean = false;
  security_Device = false;
  ir_Status = false;
  device_Status = false;
  addRooms() {
    // this.totalDevice=true;
    this.auth.getRoomFromApi().subscribe(
      (res) => {
        this.myRooms = res;
        $(".button").css("background-color", "black");
        $(".button").css("color", "white");
        console.log(JSON.stringify(this.myRooms));
        // process.stdout.write(JSON.stringify(this.myRooms));
        if (this.myRooms == "") {
          console.log("room not added ");
          // this.nodevice=true;
        }
      },
      (err) => {
        //localStorage.clear();
        console.log(err.error);
        // this.navCtrl.navigateRoot('/home');
      }
    );
  }
  room__ID: any;
  room_id_for_edit: any;
  room_name_for_edit: any;
  rrr: any;
  guest_room_id: any;
  getAllRoom(event: any, roomID: any, roomNaMe: any) {
    // this.value=[];
    // this.value1=[];
    this.device_inRoom_is_dimmer_false = [];
    this.device_inRoom_is_dimmer_true = [];
    this.rrr = roomNaMe;

    //this.entertainment(this.rrr);
    this.guest_room_id = roomID;

    this.totalDevice = false;
    console.log(roomNaMe);
    this.room_name_for_edit = roomNaMe;
    this.room_id_for_edit = roomID;
    console.log(roomID);
    var d = document.getElementsByClassName("device_card1")[0];
    if (d != undefined) {
      d.classList.remove("device_card1");
    }

    var d2 = document.getElementsByClassName("device_card2")[0];
    if (d2 != undefined) {
      d2.classList.remove("device_card2");
    }
    console.log(document.getElementsByClassName("device_card2")[0]);
    event.currentTarget.classList.add("device_card2");

    this.user.roomnm = roomNaMe;
    this.room__ID = roomID;
    console.log(this.user.roomnm);
    console.log(this.room__ID);
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
    this.getAllDevicesNormal(this.room__ID);
    this.getIRDevice(this.rrr);
  }
  device_status_res: any;
  imgPath: any;
  lock_response: Array<any> = [];
  d_name: any;
  onDevice: boolean = false;
  offDevice: boolean = false;
  d_on: any;

  enableEdit_light: boolean = false;
  editLightDevice_id: any;

  dev() {
    // alert('device click')
  }

  notificationClick() {
    this.navCtrl.navigateRoot("/notification");
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
  changeStatus(e: any, e_id: any, e_status: any) {
    console.log(e_id);
    console.log("devicestatus: " + e_status);
    var img = document.getElementById(e_id) as HTMLInputElement;
    this.user.present("Please Wait...");
    if (e_status == true) {
      this.auth.changeStatuswithCheck(e_id, 0).subscribe((res) => {
        for (let d of this.lock_response) {
          if (d.device == e_id) {
            d.status = false;
          }
        }
        console.log("t" + res);
        //this.user.presentToastWithOptions('Your door get UnLock successfully.!','danger')
        this.imgPath = "assets/images/off.gif";
        img.setAttribute("src", this.imgPath);
        this.d_on = "off";
        this.onDevice = false;
        this.offDevice = true;
        this.user.dismiss();
        console.log(img);
      });
      return;
    }
    if (e_status == false) {
      this.auth.changeStatuswithCheck(e_id, 1).subscribe((res) => {
        for (let d of this.lock_response) {
          if (d.device == e_id) {
            d.status = true;
          }
        }
        console.log("f" + res);
        //this.user.presentToastWithOptions('Your door get Lock successfully.!','success')
        this.imgPath = "assets/images/6cx1.gif";
        img.setAttribute("src", this.imgPath);
        this.d_on = "on";
        this.onDevice = true;
        this.offDevice = false;
        this.user.dismiss();
        console.log(img);
      });
      return;
    }
  }

  setDimmer(e: any) {
    let setdimmer = (<HTMLInputElement>document.getElementById("dimmervalue"))
      .value;
    //alert("dimmer value:" + setdimmer);
    //alert(e);
    console.log("dimmer value:" + setdimmer);
    this.auth.putDimmerValueFromApi(e, setdimmer).subscribe(
      (res) => { },
      (err) => {
        //alert(JSON.stringify(err));
        this.user.showToast(
          "something went wrong.please try again later or contact with our support team"
        );
      }
    );
  }

  lightDevice(event: any) {
    this.totalDevice = false;
    this.security_Device = false;
    var d = document.getElementsByClassName("device_card1")[0];
    if (d != undefined) {
      d.classList.remove("device_card1");
    }

    console.log(document.getElementsByClassName("device_card1")[0]);
    event.currentTarget.classList.add("device_card1");
    if (this.room_id_for_edit == undefined) {
      this.user.showToast(
        "You have to select Room also to access Light Devices..."
      );
    } else {
      console.log(this.room_id_for_edit);
      console.log(this.room_name_for_edit);

      this.light_Device = true;
      this.ir_Device = false;
      this.security_Device = false;
      this.remote_tv = false;
      this.ir_device_nameStatus = false;
      this.ir_Status = false;
      this.device_Status = false;
      this.AC = false;
      this.TELEVISION = false;
      this.security_Device = false;
      console.log(this.user.roomnm);
      console.log(this.room__ID);
      this.auth.putdevicestatus(this.room__ID).subscribe(
        (res) => {
          console.log("send room id for device sttaus:-" + JSON.stringify(res));
          this.user.present("loading devices...");
          this.auth.getDeviceFromApi(this.user.roomnm).subscribe(
            (res) => {
              this.user.dismiss();
              this.user.device_inRoom = res;
              console.log(
                "room lock" + this.user.roomnm + ":" + JSON.stringify(res)
              );
              for (let i of this.user.device_inRoom) {
                if (i.is_online == "False") {
                  i.is_online = true;
                } else if (i.is_online == "True") {
                  i.is_online = false;
                }
              }
              this.user.dismiss();
            },
            (err) => {
              this.user.dismiss();
              console.log("getting device in room error");
            }
          );

          //  this.loading.dismiss();
        },
        (err) => {
          this.user.dismiss();
          console.log(err.error);
        }
      );
    }
  }

  getAllDevicesNormal(id: any) {
    console.log(this.user.roomnm);
    console.log(this.room__ID);
    // this.auth.putdevicestatus(id).subscribe(
    //   (res) => {
    // console.log("send room id for device sttaus:-" + JSON.stringify(res));
    //this.user.present("loading devices...");
    this.auth.getDeviceFromApi(this.user.roomnm).subscribe(
      (res) => {
        this.user.dismiss();
        this.user.device_inRoom = res;
        console.log(
          "room lock" + this.user.roomnm + ":" + JSON.stringify(res)
        );
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

    //  this.loading.dismiss();
    //   },
    //   (err) => {
    //     this.user.dismiss();
    //     console.log(err.error);
    //   }
    // );
  }
  val: any;
  value: Array<any> = [];
  remote_tv: boolean = false;
  AC: boolean = false;
  TELEVISION: boolean = false;
  r_name: any;
  getIRDevice(r_name: any) {
    this.r_name = r_name;
    console.log("ac click" + this.r_name);

    this.AC = true;
    this.TELEVISION = false;
    // $('#ddd1').css('background-color', '#13CCDB');
    // $('#dddd1').css('color', 'white');
    // $('.ddd').removeAttr('ddd');
    // $('.dddd').removeAttr('dddd');
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
          //Non Ac
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
      // console.log(this.val[0].product_name);
    });
  }
  tvminus() {
    console.log("tv minus click");
  }
  tvPlus() {
    console.log("tv plus click");
  }
  tvOn() {
    console.log("tv on click");
  }
  tvOff() {
    console.log("tv on click");
  }
  value1: Array<any> = [];
  value2: Array<any> = [];
  tv_room: any;
  entertainment(tv_room: any) {
    this.tv_room = tv_room;

    console.log("en");
    this.AC = false;
    this.TELEVISION = true;
    this.light_Device = false;
    this.ir_Device = false;
    this.device_Status = false;
    this.security_Device = false;
    this.ir_Status = false;
    this.ir_device_nameStatus = false;
    this.remote_tv = false;
    this.security_Device = false;
    this.auth.getAllSavedRemoteForRoom(this.tv_room).subscribe((res) => {
      console.log(res);
      this.val = res;
      this.value = [];
      this.value1 = [];
      for (let i = 0; i < this.val.length; i++) {
        if (this.val[i].remote === null) {
          let type = this.showIcon(this.val[i].ac_product_name);
          console.log("type ac" + type);
          this.value1.push({
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
      // console.log(this.value1);
      console.log(this.value);
    });

    // this.AC=false;
    // this.TELEVISION=true;
  }
  remoteId: any;
  current: number = 25;
  max: number = 27;
  stroke: number = 15;
  radius: number = 60;
  semicircle: boolean = false;
  rounded: boolean = false;
  responsive: boolean = false;
  clockwise: boolean = true;
  color: string = "#45ccce";
  background: string = "#eaeaea";
  duration: number = 800;
  animation: string = "easeOutCubic";
  animationDelay: number = 0;
  animations: string[] = [];
  gradient: boolean = false;
  realCurrent: number = 0;
  rate: any;

  progress: any;
  changeRemoteValue(e: any, progress: any) {
    console.log(e);
    this.current = +5;
  }
  myOnChange(e: any) {
    console.log(e);
  }
  ir_device_nameStatus = false;
  prod_name: any;
  showEntRemote(productName: any, remoteId: any, pi_id: any, company_name: any) {
    this.remoteId = remoteId;
    this.user.productName = productName;
    this.user.companyName = company_name;
    this.user.remoteIdforKeyPress = remoteId;
    console.log(this.user.remoteIdforKeyPress);
    if (this.user.productName == "AC") {
      this.user.AC = true;
      this.user.TELEVISION = false;
    } else if (this.user.productName == "TELEVISION") {
      this.user.AC = false;
      this.user.TELEVISION = true;
    }
    this.navCtrl.navigateRoot("/ir-remote");
    this.user.moduleIdForKey = pi_id;
  }
  pow = false;

  clickEntPowerOn(remoteId: any, pi_id: any) {
    this.user.remoteIdforKeyPress = remoteId;
    this.user.moduleIdForKey = pi_id;
    console.log(this.user.moduleIdForKey);
    console.log(remoteId);
    console.log(pi_id);
    console.log(event);

    this.pow = !this.pow;
    if (this.pow) {
      this.user.present("Switched On...");
      let RKP = this.user?.remoteIdforKeyPress ?? 'DEFAULT_REMOTE_ID';
      let MKP = this.user?.moduleIdForKey ?? 'DEFAULT_MODULE_ID';
      this.auth.pressKey(RKP, "Power_on_button", MKP).subscribe(
        (res: any) => {
          // event.currentTarget.classList.add("device_card2");
          // $(event.target).addClass("device_card1");

          // $("#ion-btn").css("--background", "#946DE2");
          //$("#ion-btn").css("--background", "black");
          $("#ion-btn").css("--background", "#1396b0");
          this.user.dismiss();
          console.log(res);
        },
        (err) => {
          this.user.dismiss();
          this.user.showToast(
            "something went wrong,please contact to our support team."
          );
        }
      );
    } else {
      this.user.present("Switched Off...");
      this.auth
        .pressKey(
          this.user.remoteIdforKeyPress,
          "Power_off_button",
          this.user.moduleIdForKey
        )
        .subscribe(
          (res) => {
            // event.currentTarget.classList.remove("device_card2");
            $(".ion-btn").css("--background", "#524e4e");
            this.user.dismiss();
            console.log(res);
          },
          (err) => {
            this.user.dismiss();
            this.user.showToast(
              "something went wrong,please contact to our support team."
            );
          }
        );
    }
  }

  slideIndex: any;
  isBegun: any;
  check(e: any) {
    console.log(e);
    // this.buttonSlideEle.getActiveIndex().then((res: any) => {
    //   this.slideIndex = res;
    //   console.log(this.slideIndex);
    // });
    // this.buttonSlideEle.isBeginning().then((res_is: any) => {
    //   this.isBegun = res_is;
    //   console.log(this.isBegun);
    // });
  }

  async editLightDevice(device_id: any) {
    console.log("edit_Device Id:" + device_id);
    console.log("dwe" + JSON.stringify(this.lock_response[0].minimum));
    const modal = await this.modalController.create({
      component: EditdeviceComponent,
      componentProps: {
        players: JSON.stringify(this.lock_response[0]),
        de_type: JSON.stringify(this.lock_response[0].device_type),
        de_id: JSON.stringify(this.lock_response[0].device),
        de_name: JSON.stringify(this.lock_response[0].name),
        de_dimmer: JSON.stringify(this.lock_response[0].dimmer),
        de_isdimmer: JSON.stringify(this.lock_response[0].is_dimmer),
        de_min: JSON.stringify(this.lock_response[0].minimum),
        de_max: JSON.stringify(this.lock_response[0].maximum),
      },
    });
    return await modal.present();
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
      return (this.imgPath = "assets/addnew/Curtain.png");
    }
    if (name == "Curtain2") {
      return (this.imgPath = "assets/addnew/Curtain2.png");
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

  remote: string = "";
  text: any;
  bar = 0;
  temp = 16;
  tempValue: any;
  fanstate = "A";
  toggleStatus = "OFF";
  keyid: any;
  device_id: any;
  button_value: any;
  token: any;
  allAcHex: any;

  tempArray = [
    { id: 16, val: "sixteen" },
    { id: 17, val: "seventeen" },
    { id: 18, val: "eighteen" },
    { id: 19, val: "nineteen" },
    { id: 20, val: "twenty" },
    { id: 21, val: "twentyone" },
    { id: 22, val: "twentytwo" },
    { id: 23, val: "twentythree" },
    { id: 24, val: "twentyfour" },
    { id: 25, val: "twentyfive" },
    { id: 26, val: "twentysix" },
    { id: 27, val: "twentyseven" },
    { id: 28, val: "twentyeight" },
    { id: 29, val: "twentynine" },
    { id: 30, val: "thirty" },
  ];
  keyPressTv(btnValue: any, module_id: any, m_pi: any, event: any) {
    console.log(event);
    var d = document.getElementsByClassName("device_card1")[0];
    if (d != undefined) {
      d.classList.remove("device_card1");
    }

    console.log(document.getElementsByClassName("device_card1")[0]);
    event.currentTarget.classList.add("device_card1");
    this.user.present("");
    this.auth.pressKey(module_id, btnValue, m_pi).subscribe(
      (res) => {
        console.log("Tv res" + res);
        this.user.dismiss();
      },
      (err) => {
        this.user.dismiss();
        console.log("Tv eerr" + err.error);
      }
    );
  }
  gaugeValue = 22;
  keypressplusAc(m_id: any, m_pi: any, event: any) {
    console.log(event);
    if (this.gaugeValue < 30) {
      this.gaugeValue = this.gaugeValue + 1;
      this.getTemp(this.gaugeValue);
      let hexkey = this.tempValue + this.fanstate + this.toggleStatus;
      this.keyPressTv(hexkey, m_id, m_pi, event);
    }
  }
  keypressminusAc(m_id: any, m_pi: any, event: any) {
    console.log(event);
    if (this.gaugeValue < 30) {
      this.gaugeValue = this.gaugeValue + 1;
      this.getTemp(this.gaugeValue);
      let hexkey = this.tempValue + this.fanstate + this.toggleStatus;
      this.keyPressTv(hexkey, m_id, m_pi, event);
    }
  }
  decrease() {
    if (this.gaugeValue > 18) {
      this.gaugeValue = this.gaugeValue - 1;
    }
  }
  increase() {
    if (this.gaugeValue < 30) {
      this.gaugeValue = this.gaugeValue + 1;
    }
  }
  power(event: any) {
    let opacity = event.target.getAttribute("opacity");
    this.pow = !this.pow;
    if (this.pow) {
      event.currentTarget.setAttribute("fill", "#595959");
      event.currentTarget.setAttribute("style", "filter:floodColor:#FFF");
      // this.keyPress('on',module_id,m_pi);
    } else {
      event.currentTarget.setAttribute("fill", "#a3c2c2");
      event.currentTarget.removeAttribute("style", "filter:floodColors");
      // this.keyPress('off')
    }
  }
  pressEffect(event: any) {
    let x = event.target.getAttribute("x");
    let y = event.target.getAttribute("y");
    let height = event.target.getAttribute("height");
    let width = event.target.getAttribute("width");
    let opacity = event.target.getAttribute("opacity");

    if (x == null) {
      event.target.setAttribute("opacity", opacity - 0.7);
      setTimeout(() => {
        event.target.setAttribute("opacity", opacity);
      }, 1000);
    }
    event.target.setAttribute("x", x + 2);
    event.target.setAttribute("y", y + 2);
    event.target.setAttribute("height", height - 2);
    event.target.setAttribute("width", width - 2);
    setTimeout(() => {
      event.target.setAttribute("x", x);
      event.target.setAttribute("y", y);
      event.target.setAttribute("height", height);
      event.target.setAttribute("width", width);
    }, 1000);
  }

  async irunmber() {
    const modal = await this.modalController.create({
      component: IrremotenumberComponent,
      cssClass: "my-custom-modal-css",
      componentProps: {
        remoteid: 29,
      },
    });
    return await modal.present();
  }

  async irmore() {
    console.log("ir remote more click...");
    const modal = await this.modalController.create({
      component: IrremotemoreComponent,
      cssClass: "my-custom-modal-css",
      componentProps: {
        remote_id: 29,
      },
    });
    return await modal.present();
  }
  getTemp(Cur_temp: any) {
    for (let tem of this.tempArray) {
      if (tem.id == Cur_temp) {
        this.tempValue = tem.val;
      }
    }
  }

  minus(event: any) {
    console.log(event);
    if (this.temp > 16) {
      this.temp = this.temp - 1;
      this.getTemp(this.temp);
      let hexkey = this.tempValue + this.fanstate + this.toggleStatus;
      // this.keyPress(hexkey);
    }
    //this.pressEffect(event)
  }

  plus(event: any) {
    console.log(event);
    if (this.temp < 30) {
      this.temp = this.temp + 1;
      this.getTemp(this.temp);
      let hexkey = this.tempValue + this.fanstate + this.toggleStatus;
      // this.keyPress(hexkey);
    }
    // this.pressEffect(event)
  }
  fanUp(event: any) {
    if (this.bar < 2) {
      this.bar = this.bar + 1;
    }
    let b = document.getElementsByClassName("bar1");
    let b1 = document.getElementsByClassName("bar2");
    if (this.bar == 2) {
      this.fanstate = "FH";
      for (let i = 0; i < b1.length; i++) {
        // b1[i].setAttribute('style','fill:rgba(32, 12, 46, 0.36)')
        b1[i].setAttribute("style", "stroke:rgba(31,30,30,0.37)");
      }
      console.log(this.bar);
      this.getTemp(this.temp);
      let hexkey = this.tempValue + this.fanstate + this.toggleStatus;
      // this.keyPress(hexkey);
    }
    if (this.bar == 1) {
      this.fanstate = "FM";
      for (let i = 0; i < b.length; i++) {
        // b[i].setAttribute('style','fill:rgba(32, 12, 46, 0.36)')
        b[i].setAttribute("style", "stroke:rgba(31,30,30,0.37)");
      }
      console.log(this.bar);
      this.getTemp(this.temp);
      let hexkey = this.tempValue + this.fanstate + this.toggleStatus;
      // this.keyPress(hexkey);
    }
    this.pressEffect(event);
  }
  fanToggle = false;
  fan(event: any) {
    this.fanToggle = !this.fanToggle;
    if (this.fanToggle) {
      this.fanstate = "FL";
    } else {
      this.fanstate = "A";
    }
    this.getTemp(this.temp);
    let hexkey = this.tempValue + this.fanstate + this.toggleStatus;
    // this.keyPress(hexkey);
    this.pressEffect(event);
  }
  fanDown(event: any) {
    if (this.bar > 0) {
      this.bar = this.bar - 1;
    }
    let b = document.getElementsByClassName("bar1");
    let b1 = document.getElementsByClassName("bar2");
    if (this.bar == 1) {
      this.fanstate = "FM";
      for (let i = 0; i < b1.length; i++) {
        b1[i].removeAttribute("style");
        b1[i].setAttribute("style", "stroke:white; fill:white");
        console.log(this.bar);
      }
      this.getTemp(this.temp);
      let hexkey = this.tempValue + this.fanstate + this.toggleStatus;
      // this.keyPress(hexkey);
    }
    if (this.bar == 0) {
      this.fanstate = "FL";
      for (let i = 0; i < b.length; i++) {
        b[i].removeAttribute("style");
        b[i].setAttribute("style", "stroke:white; fill:white");
        console.log(b + "fgh" + this.bar);
      }
      this.getTemp(this.temp);
      let hexkey = this.tempValue + this.fanstate + this.toggleStatus;
      // this.keyPress(hexkey);
    }

    this.pressEffect(event);
  }
  timer(event: any) {
    this.pressEffect(event);
  }
  swingToggle = false;
  swing(event: any) {
    this.pressEffect(event);
    this.swingToggle = !this.swingToggle;
    if (this.swingToggle) {
      this.toggleStatus = "ON";
    } else {
      this.toggleStatus = "OFF";
    }
    this.getTemp(this.temp);
    let hexkey = this.tempValue + this.fanstate + this.toggleStatus;
    // this.keyPress(hexkey);
  }
  backbutton() {
    this.user.showDevice = false;
    this.user.showRoom = true;
  }

  async clickSetting() {
    const actionSheet = await this.actionsheetCtrl.create({
      cssClass: "my-custom-class",
      header: "Modify as you want",
      buttons: [
        {
          text: "Change Room Name",
          icon: "create",
          cssClass: "alert-message",
          handler: () => {
            console.log("edit device clicked");
            this.editRoomNameclick();
          },
        },
        {
          text: "Device Configuration",
          icon: "save-outline",
          cssClass: "alert-message",
          handler: () => {
            console.log("delect click clicked");
            this.configuredModules();
          },
        },
        {
          text: "Change Theme",
          icon: "color-palette-outline",
          cssClass: "alert-message",
          handler: () => {
            console.log("delect click clicked");
            this.themeClick();
          },
        },
        {
          text: "Delete Room",
          icon: "trash",
          cssClass: "alert-message",
          handler: () => {
            console.log("delect click clicked");
            this.deleteRoomwithDevice();
          },
        },

        {
          text: "Wifi Reconfiguration ",
          icon: "wifi",
          cssClass: "alert-message",
          handler: () => {
            console.log("wifi click clicked");
            this.router.navigateByUrl("/wifi");
          },
        },
        {
          text: "Scheduled Devices ",
          icon: "calendar-outline",
          cssClass: "alert-message",
          handler: () => {
            console.log("Scheduled Devices clicked");
            this.router.navigateByUrl("/newschedule");
          },
        },
        {
          text: "Wifi Lock Admin Access",
          icon: "person-outline",
          cssClass: "alert-message",
          handler: () => {
            console.log("tuya register click clicked");
            this.tuyaregCLick();
          },
        },
        {
          text: "Guest Access",
          icon: "person-outline",
          cssClass: "alert-message",
          handler: () => {
            console.log("guest room access click clicked");
            this.shareRoom();
          },
        },
        {
          text: "Cancel",
          icon: "close",
          cssClass: "alert-message",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }
  admincard = false;
  tuyaregCLick() {
    this.admincard = true;
  }
  validatePass(p: any) {
    console.log(p.password);
    if (p.password == "Ashish@95") {
      this.navCtrl.navigateRoot("/tuyareg");
    } else {
      // alert("Please contact to DyfoLabs support team.");
      // alert("Please contact to livsmart support team.");
      //alert("Please contact to AIT support team.");
      //alert("Please contact to Bonfire support team.");
      //alert("Please contact to Spira support team.");
      alert("Please contact to THomes support team.");
    }
  }

  themeClick() {
    this.navCtrl.navigateRoot("/theme");
  }
  ttTuyaDevices() {
    this.navCtrl.navigateRoot("/securitylock");
  }
  configuredModules() {
    this.navCtrl.navigateRoot("/allmodule");
  }
  roomNameChange = false;
  editRoomNameclick() {
    if (this.room_id_for_edit == undefined) {
      this.user.showToast(
        "Please select room which you want to edit room name..."
      );
    } else {
      this.roomNameChange = true;
    }
  }
  sendRoomName(data: any) {
    let new_room_name = data.roomname;
    console.log(new_room_name);
    console.log(this.room_id_for_edit);
    this.user.present("please wait..");
    this.auth.editRoomInfo(this.room_id_for_edit, new_room_name).subscribe(
      (res) => {
        this.roomNameChange = false;
        this.addRooms();
        this.user.dismiss();
        console.log(res);
        // this.deviceInformation = true;
        // this.afterEdit(name);
        // this.roomNameChange = false;
      },
      (err) => {
        this.roomNameChange = false;
        this.user.dismiss();
        this.user.showToast("something went wrong.please try again later.");
      }
    );
  }

  async deleteRoomwithDevice() {
    if (this.room_id_for_edit == undefined) {
      this.user.showToast("Please select room which you want to Delete...");
    } else {
      const alert = await this.alertController.create({
        cssClass: "my-custom-class",
        header: "Alert!",
        message: "Are you sure you want to delete room?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "alert-message",
            handler: (blah) => {
              console.log("Confirm Cancel: blah");
            },
          },
          {
            text: "confirm",
            handler: () => {
              console.log("Confirm Okay");
              let rooom_id = this.room_id_for_edit;
              console.log("ok_roomId:" + rooom_id);
              this.user.present("deleting room...");
              this.auth.deleteRoom(rooom_id).subscribe(
                (res) => {
                  let i = this.myRooms.indexOf(rooom_id);
                  this.myRooms.splice(i, 1);
                  this.user.showToast("Room deleted successfully...");
                  this.addRooms();
                  this.user.dismiss();
                },
                (err) => {
                  this.user.dismiss();
                  this.user.showToast(
                    "something went wrong.please try again later."
                  );
                  this.auth.refreshPage();
                }
              );
            },
          },
        ],
      });
      await alert.present();
    }
  }
  clicktoAddModule() {

    this.navCtrl.navigateRoot("/mcategory");
  }
  OnOffDevice(type: any) {
    console.log("hello", this.guest_room_id);
    let body =
    {
      // "room_id": this.R_id,
      "room_id": this.guest_room_id,
      "status": type
    }

    if (this.guest_room_id) {
      this.auth.OnOffdevice(body).subscribe((res: any) => {
        console.log("onOffDevi", res);
        this.user.showToast(res.message);
      }, (err: any) => {
        this.user.showToast(err);
      })
    } else {
      this.user.showToast("Please select room!");
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

  //******************** Security Device get here ***************//
  securityDeviceClick(event: any) {
    this.totalDevice = false;
    var d = document.getElementsByClassName("device_card1")[0];
    if (d != undefined) {
      d.classList.remove("device_card1");
    }
    console.log(document.getElementsByClassName("device_card1")[0]);
    event.currentTarget.classList.add("device_card1");
    if (this.room_id_for_edit == undefined) {
      this.user.showToast(
        "You have to select Room also to access Smart Lock Devices..."
      );
    } else {
      for (let r of this.myRooms) {
        if (r.id == this.room__ID) {
          this.lockDevs = r.lock_set;
        }
      }
    }

    this.getlockmodule();
    this.security_Device = true;
    this.light_Device = false;
    this.AC = false;
    this.TELEVISION = false;
    this.ir_Device = false;
    this.ir_device_nameStatus = false;
    this.remote_tv = false;
    this.ir_Status = false;
    this.device_Status = false;
    console.log(this.myRooms);
  }
  //************* */  Dyfo Lock code  started  ***********//
  lo_res: any;
  dyfo_lock_response: Array<any> = [];
  // imgPath: string;
  mo_res: any;
  getlockmodule() {
    console.log("security response get");
    this.user.present("Please wait...");
    this.auth.getDoorLockModuleApi().subscribe(
      (res) => {
        this.mo_res = res;
        this.user.dismiss();
        console.log(this.mo_res[0].pi_id);
        for (let i = 0; i < this.mo_res.length; i++) {
          this.auth.getDoorStatus(this.mo_res[i].pi_id).subscribe(
            (res) => {
              this.lo_res = res;
              this.user.dismiss();
              console.log(this.lo_res[i].status);
              if (this.lo_res[i].status == true) {
                // $(".dyfo_lock").css("color", "#946DE2");
                // this.imgPath = 'assets/icon/unlock.jpeg';
              }
              if (this.lo_res[i].status == false) {
                // $(".dyfo_lock").css("color", "black");
                // this.imgPath = 'assets/icon/lock.png'
              }
              this.dyfo_lock_response[i] = {
                id: this.lo_res[i].id,
                device: this.lo_res[i].device,
                pi_id: this.lo_res[i].pi_id,
                name: this.lo_res[i].name,
                device_type: "Door_Lock",
                status: this.lo_res[i].status,
                img: this.imgPath,
              };
            },
            (err) => {
              this.user.dismiss();
              this.user.showToast(err.errror);
            }
          );
        }
      },
      (err) => {
        this.user.dismiss();
        this.user.showToast(err.errror);
      }
    );
  }
  changeDyfoLockStatus(e: any) {
    var img = document.getElementById(e);
    this.user.present("Please Wait...");
    if (((event as Event).currentTarget as HTMLInputElement).checked == true) {
      this.auth.changeStatuswithCheck(e, 1).subscribe((res) => {
        this.user.dismiss();
        // this.imgPath = 'assets/icon/unlock.jpeg'
        // $(".dyfo_lock").css("color", "#946DE2");
        //$(".dyfo_lock").css("color", "black");
        $(".dyfo_lock").css("color", "#1396b0");
        //  img.setAttribute('src',this.imgPath)
      });
    }
    if (((event as Event).currentTarget as HTMLInputElement).checked == false) {
      this.auth.changeStatuswithCheck(e, 0).subscribe((res) => {
        this.user.dismiss();
        //  this.imgPath = 'assets/icon/lock.png'
        $(".dyfo_lock").css("color", "black");
        //  img.setAttribute('src',this.imgPath)
      });
    }
  }

  // ****************** dyfo lock  ended here ****** and TTLock stared here*******//
  lockTTclick(l_serial_info: any, l_serial_number: any) {
    this.user.l_serial_info = l_serial_info;
    this.user.l_serial_number = l_serial_number;

    console.log(JSON.stringify(this.user.l_serial_info));
    console.log("lock clicked..serial_no:" + this.user.l_serial_number);
    this.navCtrl.navigateRoot("/btconnect");
  }

  // getTuyahome(){
  //   CameraCustom.home("body",
  //   res=>{
  //     let temp = res.substring(6)
  //     this.user.homeId=temp;
  //     alert("Tuya homeIdRes:"+ JSON.stringify(res));
  //     alert("Tuya homeIdRes:"+ JSON.stringify(this.user.homeId))
  //     this.getTuyaDevices();
  //     },err=>{
  //   alert("TuyaHomeIdError:"+JSON.stringify(err))
  //     })
  // }
  // getTuyaDevices(){
  //   CameraCustom.devicelist("body",
  //   res=>{
  //     this.user.tuyaDevices = res;
  //     console.log(JSON.stringify(this.user.tuyaDevices))
  //          alert("abcd List"+JSON.stringify(this.user.tuyaDevices))
  //     },err=>{
  //   alert("TuyaListError:"+JSON.stringify(err.error))
  //     })
  // }
  // initDevice(id,ev){

  //   let body = {id: id}
  //   if(ev.currentTarget.checked){
  //   CameraCustom.initDevice(body,
  //   res=>{

  //  },
  //   err=>{

  //   })
  // }
  // }
  goToTuyaSettings(name: any, icon: any, id: any) {
    // alert(name)
    this.user.tuyaDeviceName = name;
    this.user.tuyaDeviceIcon = icon;
    this.user.tuyaDeviceId = id;
    let body = { id: id };
    CameraCustom.findDeviceType(
      body,
      (res: any) => {
        if (res == "camera") {
          this.navCtrl.navigateRoot("/camFunc");
        } else if (res == "lock") {
          this.navCtrl.navigateRoot("/lockFunc");
        }
      },
      (err: any) => { }
    );
  }
  linkOperate() {
    let clientid =
      "AMAZON_CLIENT_ID_PLACEHOLDER";
    //let clientid="AMAZON_CLIENT_ID_PLACEHOLDER"
    let url =
      "https://alexa.amazon.com/spa/skill-account-linking-consent?fragment=skill-account-linking-consent&client_id=";
    let openlink =
      "&scope=alexa::skills:account_linking&skill_stage=development&response_type=code&redirect_uri=https://dyfolabs.com/&state=dyfolabs";
    this.urlsrc = url + clientid + openlink;
  }

  getAccessToken() {
    let amazonAuthCode = this.user.authCode;
    this.auth.getAccessTokenForAmazon(amazonAuthCode).subscribe(
      (res) => {
        //alert(JSON.stringify(res[0]));
        let access_token = res;
        //this.user.showToast(access_token);
        console.log(typeof access_token);
        this.user.amazonAccessToken = access_token.access_token;
      },
      (err) => {
        this.user.showToast(JSON.stringify(err));
      }
    );
  }

  ClientId = "zB8O5UaR7B3tIM3JxUAscmy5Q1h6QTX9";
  clientSecret =
    "SECRET_CONFIGURE_ON_BACKEND";
  //ClientId="AMAZON_CLIENT_ID_PLACEHOLDER"
  //ourauthUrl="https://www.amazon.com/ap/oa/?response_type=code&client_id="+this.ClientId+"&redirect_uri=https://dyfolabs.com/"
  ourauthUrl =
    "https://dev-2yui1jec.us.auth0.com/authorize?state=dyfolabs&client_id=" +
    this.ClientId +
    "&protocol=oauth2&response_type=code&scope=openid%20offline_access%20profile%20email&redirect_uri=https://dyfolabs.com/";

  enableSkill() {
    let amazonAccessToken = this.user.amazonAccessToken;
    let ourauthCode = this.user.authCode;
    this.auth.enableAlexaLinking(amazonAccessToken, ourauthCode).subscribe(
      (res) => {
        //this.user.showToast(JSON.stringify(res));
      },
      (err) => {
        this.user.showToast(JSON.stringify(err));
      }
    );
  }
  modepage() {
    this.navCtrl.navigateRoot("/mode");
  }

  securitylockpage() {
    console.log(this.user.username2);
    this.password = localStorage.getItem("passwordforprofile");
    console.log("testing1");
    console.log(this.password);
    let body = {
      password: this.password,
    };
    TTlockdata.encrypt(
      body,
      (res: any) => {
        console.log("testing2");
        console.log(JSON.stringify(res));
        this.ttpass = res;
        this.user.ttPassword = this.ttpass;
        localStorage.setItem("ttPassword", this.ttpass);
        const params = new HttpParams({
          fromObject: {
            username: "dyfo_" + this.user.username2.split("@")[0],
            password: this.ttpass,
            redirect_uri: "https://dyfolabs.com/",
            grant_type: "password",
            client_secret: "BACKEND_SECRET_REQUIRED",
            client_id: "7a614fea8d6f427caa982e9a1aa6afc1",
          },
        });

        const httpOptions = {
          headers: new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              btoa(
                "7a614fea8d6f427caa982e9a1aa6afc1" +
                ":" +
                "SECRET_CONFIGURE_ON_BACKEND"
              ),
            Origin: "Dyfo",
          }),
        };
        this.user.present("wait...");
        this.auth.loginTTLock(params).subscribe(
          (res) => {
            console.log("testing3");
            console.log(JSON.stringify(res));
            this.data = res;
            // alert(JSON.stringify(this.data ));
            localStorage.setItem("TTtoken", this.data.access_token);
            this.navCtrl.navigateRoot("/securitylock");
            this.user.dismiss();
          },
          (error) => {
            console.log("testing4");
            console.log(JSON.stringify(error.error));
            console.log("error");
            this.user.dismiss();
          }
        );
      },
      (err: any) => { }
    );
  }
  favpage() {
    this.navCtrl.navigateRoot("/favlist");
  }
  rgbpage() {
    this.navCtrl.navigateRoot("/rgb-list");
  }
  waterlist() {
    this.navCtrl.navigateRoot("/waterlist");
  }
  cickEnergyPage() {
    this.navCtrl.navigateRoot("/energychart");
  }

  active() {
    alert("active");
    console.log("long press");
    //this.user.showToast("active long press called..");
  }
  pressed() {
    alert("pressed()");
    console.log("release call");
    this.longPressTimer = setTimeout(() => {
      // Your long-press action here
      console.log('Long press!');
    }, 400);
  }
  released() {
    alert("released()")
    console.log("release call");
    clearTimeout(this.longPressTimer);

  }

  room_id_for_guest: any;
  guestEmail = false;
  shareRoom() {
    console.log(this.guest_room_id);
    if (this.guest_room_id == undefined) {
      this.user.showToast(
        "Please select room first to share room crediantial with guest user..."
      );
    } else {
      this.guestEmail = true;
      console.log("roomId:" + this.guest_room_id);
      this.room_id_for_guest = this.guest_room_id;
    }
  }

  onSubmit(data: any) {
    // console.log(data.enddate);

    console.log(this.room_id_for_guest);
    let guestbody = {
      email: data.email,
      room: this.room_id_for_guest,
      valid_until: data.enddate.substr(0, 16).replace("T", " "),
    };
    this.user.present("please wait..");
    this.auth.forguestUser(guestbody).subscribe(
      (res) => {
        this.guestEmail = false;
        this.user.dismiss();
        console.log(res);
      },
      (err) => {
        this.guestEmail = false;
        //alert(JSON.stringify(err.error.email));
        this.user.showToast(JSON.stringify(err.error));
        this.user.dismiss();
      }
    );
    // }
  }

  getTodaysEnergy() {
    this.auth.getTodayTEnergyFromApi().subscribe(
      (res) => {
        console.log(res);
        this.tt_weeklydata = res;
        this.tt_weeklyData = this.tt_weeklydata.data;

        console.log(this.tt_weeklyData[0].detail);

        this.tt_w_total_watts =
          this.tt_weeklyData[0].detail.total_watts.toFixed(2);
      },
      (err) => {
        this.user.dismiss();
        console.log(err.error);
      }
    );
  }
  refreshClick() {
    this.auth.refreshPage();
  }
  dragEnded(event: any) {
    const { offsetLeft, offsetTop } = event.source.element.nativeElement;
    const { x, y } = event.distance;
    let positionX = offsetLeft + x;
    let positionY = offsetTop + y;
    //this.showPopup = true;
    console.log({ positionX, positionY });
  }
  tt_weeklydate: any;
  getTotalAllEnergy() {
    console.log("total call");
    this.user.present("");
    this.auth.getTodayTEnergyFromApi().subscribe(
      (res) => {
        // this.user.dismiss();
        this.totaluserwHours = [];
        this.totaluserwDays = [];
        this.totaluserwWatts = [];
        console.log(res);
        this.tt_weeklydata = res;
        this.tt_weeklyData = this.tt_weeklydata.data;
        if (!this.energyData) {
          console.log("no Weekly data available");
        }
        console.log(this.tt_weeklyData[0].detail);

        this.tt_w_avg_hours = this.tt_weeklyData[0].detail.avg_hours.toFixed(2);
        this.tt_w_avg_watts = this.tt_weeklyData[0].detail.avg_watts.toFixed(2);
        this.tt_w_total_hours =
          this.tt_weeklyData[0].detail.total_hours.toFixed(2);
        this.tt_w_total_watts =
          this.tt_weeklyData[0].detail.total_watts.toFixed(2);

        this.tt_weeklydate = this.tt_weeklyData[0].detail.data.reverse();


        this.tt_weeklydate.forEach((x: any) => {
          // this.user.dismiss();
          this.totaluserwHours.push(x.hours);
          this.totaluserwDays.push(x.weekday);
          this.totaluserwWatts.push(x.total_watts);
          console.log("this.totaluserwDays", this.totaluserwDays);
          console.log("this.totaluserwWatts", this.totaluserwWatts);
        });
        this.createBarChartTotalWeekly();
        // this.user.dismiss();
      },
      (err) => {
        this.user.dismiss();
        console.log(err.error);
      }
    );
  }
  createBarChartTotalWeekly() {
    console.log("total week call..");
    console.log("Final totaluserwDays", this.totaluserwDays);
    console.log("Final totaluserwWatts", this.totaluserwWatts);
    let chartOption = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },


          },
        ],
      },
    }
    this.bars = new Chart(this.barChartTotalweekly.nativeElement, {
      type: "line",
      data: {
        labels: this.totaluserwDays,
        datasets: [
          {
            label: "Switch graph",
            data: this.totaluserwWatts,
            // data: [50, 20, 60, 55, 35],
            backgroundColor: "rgb(229,228,226)", // array should have same number of elements as number of dataset
            borderColor: "rgb(38, 194, 129)", // array should have same number of elements as number of dataset
            borderWidth: 1,
          }
        ],
      },
    });
  }
}
