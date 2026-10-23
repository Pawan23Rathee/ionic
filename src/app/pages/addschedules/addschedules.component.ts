import { Component, OnInit,NgZone } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: "app-addschedules",
  templateUrl: "./addschedules.component.html",
  styleUrls: ["./addschedules.component.scss"],
})
export class AddschedulesComponent implements OnInit {
  button1:boolean = true;
  button2:boolean = false;
  imgPath:any;
  maincardscheduler = true;
  showdevicescheduler = false; // for device only show
  scheduledDevices: any = "";
  sdevices: any = "";
  maindevices: any = [];
  sdevices1: any = [];
  editSchedulerDevice = false;
  getid:any;
  getname:any;
  startdate:any;
  enddate:any;
  device_id:any;
  tstatus: boolean = false;
  editScheduledDevice = false;
  showAddress = false;

  constructor(
    public user: UserService,
    public auth: AuthService,
    private navCtrl: NavController,
    private ngZone:NgZone
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.getAllScheduledDevides();
  }
  //------------ get Scheduled device on mainscreen -----//
  getAllScheduledDevides() {
    console.log("scheduler clickcmain page....");
    this.auth.getDeviceforSchedularfromApi().subscribe((res) => {
      this.scheduledDevices = res;

      for (var i = 0; i < this.scheduledDevices.length; i++) {
        console.log(JSON.stringify(this.scheduledDevices[i]));
        this.sdevices1[i] = [
          {
            id: this.scheduledDevices[i].id,
            name: this.scheduledDevices[i].name,
            device: this.scheduledDevices[i].device,
            on_time: this.scheduledDevices[i].on_time.substr(11, 5),
            is_on: this.scheduledDevices[i].is_on,
            off_time: this.scheduledDevices[i].off_time.substr(11, 5),
            is_off: this.scheduledDevices[i].is_off,
            is_daily: this.scheduledDevices[i].is_daily,
            is_enabled: this.scheduledDevices[i].is_enabled,
          },
        ];
      }
      console.log(JSON.stringify(this.sdevices1));
      if (JSON.stringify(this.sdevices1) == "[]") {
        console.log("empty shcedule");
      } else if (JSON.stringify(this.sdevices1) != "[]") {
        console.log("noot shcedule");
      }
    });
  }

  setReSchedulertime(sdid:any, sdname:any, device_id:any) {
    console.log("click main card for popup to Rescheduled device.");
    this.editScheduledDevice = true;
    this.getid = sdid;
    this.getname = sdname;
    this.device_id = device_id;
    console.log("SchedulerCLick_id" + this.getid);
    console.log(this.getname);
    console.log("Scheduler_maindCLick_id" + this.device_id);
  }

  submitReScheduled() {
    this.editScheduledDevice = false;
    var d_id = this.getid;
    var dmain_id = this.device_id;
    console.log("delete_id" + d_id);
    console.log("maindevice_id" + dmain_id);
    let dev_Detail = {
      name: this.getname,
      is_daily: this.tstatus,
      is_enabled: true,
      on_time: this.startdate.substr(0, 19).replace("T", " "),
      off_time: this.enddate.substr(0, 19).replace("T", " "),
      device: dmain_id,
    };
    this.user.present("Please wait...");
    this.auth.del_ScheduledDevice(d_id).subscribe(
      (res) => {
        console.log(
          "it deleted for updated , automatic after deleted generate new scheduler:" +
            res
        );
        this.auth.postDeviceSchedularFromApi(dev_Detail).subscribe(
          (res) => {
            console.log("updated ReScheduler res:" + res);
            // this.editScheduledDevice = false;
            // this.getAllScheduledDevides();
            this.ngZone.run(() => {
              
              this.editScheduledDevice = false;
              this.getAllScheduledDevides();
            });
            this.user.dismiss();
          },
          (err) => {
            this.user.dismiss();
            this.user.showToast("err.error");
          }
        );
      },
      (err) => {
        this.user.dismiss();
        this.user.showToast(
          "Some error has occurred. Please contact with our support team or retry after sometimes."
        );
      }
    );
  }
  //-------- deleted click on popup , pop come after clicking maincard ----//
  deleteScheduledDevice() {
    var d_id = this.getid;
    console.log("delete click:" + d_id);
    this.user.present("Please wait...");
    this.auth.del_ScheduledDevice(d_id).subscribe(
      (res) => {
        console.log(res);
        let i = this.scheduledDevices.indexOf(d_id);
        this.scheduledDevices.splice(i, 1);
        this.ngZone.run(() => {
          this.getAllScheduledDevides();
          this.editScheduledDevice = false;
        });
        
        this.user.dismiss();
      },
      (err) => {
        this.user.dismiss();
         /* this.user.showToast(
          "Some error has occurred. Please contact support@dyfolabs.com or retry after sometimes."
        );  */
         /* this.user.showToast(
           "Some error has occurred. Please contact support@livsmart.com or retry after sometimes."
         ); /*
        // this.user.showToast(
        //   "Some error has occurred. Please contact kapoor.lites@gmail.com or retry after sometimes."
        // );
        /* this.user.showToast(
          "Some error has occurred. Please contact support@supertechlimited.com or retry after sometimes."
        ); */
        this.user.showToast(
          "Some error has occurred. Please contact info@thomes.in or retry after sometimes."
        );
        //this.user.showToast(
        //  "Some error has occurred. Please contact support@aitworld.co.in or retry after sometimes."
        //);
      }
    );
  }

  dd = this.user.device_id_forScheduler;

  //---------------------- Get all devices fab click----//
  getAlldeviceforschedule() {
    if (this.dd == undefined) {
      this.user.showToast(
        "For scheduling devices, please select devices from device status page..."
      );
    } else {
      console.log("scheduler click in popup ..get device after fab click.");
      this.showdevicescheduler = true;
      this.maincardscheduler = false;
      this.editSchedulerDevice = false;
      this.button1 = false;
      this.button2 = true;

      this.auth.showAllAddedDevicesScheduler(this.dd).subscribe((res) => {
        this.sdevices = res;
        this.maindevices = [];
        for (var i = 0; i < this.sdevices.length; i++) {
          let type = this.showIcon(this.sdevices[i].device_type);
          this.maindevices[i] = [
            {
              id: this.sdevices[i].id,
              device: this.sdevices[i].device,
              name: this.sdevices[i].name,
              device_type: this.sdevices[i].device_type,
              type: type,
            },
          ];
        }
        console.log(JSON.stringify(this.sdevices));
      });
    }
  }

  setSchedulertime(sid:any, sname:any, sdtype:any) {
    this.getid = sid;
    this.getname = sname;
    console.log("mainClick_id" + this.getid);
    console.log("mainclick_name" + sid);
    console.log("mainclick_type" + sdtype);
    this.editSchedulerDevice = true;
  }
  submitScheduledDevice() {
    this.maincardscheduler = true;
    this.showdevicescheduler = false;
    this.getid;
    this.getname;
    // this.startdate=new Date().toISOString();
    console.log(this.getname);
    console.log(this.tstatus);
    console.log(this.startdate.substr(0, 19).replace("T", " "));
    console.log(this.enddate.substr(0, 19).replace("T", " "));
    console.log(this.getid);
    console.log("submitscheduleclick:" + this.getid);

    let dev_Detail = {
      name: this.getname,
      is_daily: this.tstatus,
      is_enabled: true,
      on_time: this.startdate.substr(0, 19).replace("T", " "),
      off_time: this.enddate.substr(0, 19).replace("T", " "),
      device: this.getid,
    };
    this.user.present("Please wait...");
    this.auth.postDeviceSchedularFromApi(dev_Detail).subscribe(
      (res) => {
        //this.getAllScheduledDevides(); //load device automatic after schedule device
        console.log("updateschedulaer" + res);
        this.user.dismiss();
        //this.editScheduledDevice = false;
        this.ngZone.run(() => {
          this.getAllScheduledDevides();
          this.editScheduledDevice = false;
        });
      },
      (err) => {
        this.user.dismiss();
         /* this.user.showToast(
          "Some error has occurred. Please contact support@dyfolabs.com or retry after sometimes."
        );  */
        /* this.user.showToast(
          "Some error has occurred. Please contact support@livsmart.com or retry after sometimes."
        );  */
        // this.user.showToast(
        //   "Some error has occurred. Please contact kapoor.lites@gmail.com or retry after sometimes."
        // );
        /* this.user.showToast(
          "Some error has occurred. Please contact support@supertechlimited.com or retry after sometimes."
        ); */
        this.user.showToast(
          "Some error has occurred. Please contact info@thomes.in or retry after sometimes."
        );
        //this.user.showToast(
        //  "Some error has occurred. Please contact support@aitworld.co.in or retry after sometimes."
        //);
      }
    );
  }

  showIcon(name:any) {
    if (name == "Musical_Mood") {
      return (this.imgPath = "assets/icon/tubelight.png");
    }
    if (name == "Disco_Mood") {
      return (this.imgPath = "assets/icon/fan.png");
    }
    if (name == "Tube_Light") {
      return (this.imgPath = "assets/icon/tubelight.png");
    }
    if (name == "Fan") {
      return (this.imgPath = "assets/icon/fan.png");
    }
    if (name == "TELEVISION") {
      return (this.imgPath = "assets/icon/tv.png");
    }
    if (name == "Bulb") {
      return (this.imgPath = "assets/icon/light.png");
    }
    if (name == "Lamp") {
      return (this.imgPath = "assets/icon/wall-lamp.png");
    }
    if (name == "Geyser") {
      return (this.imgPath = "assets/icon/geyser.png");
    }
    if (name == "AC") {
      return (this.imgPath = "assets/icon/ac.jpg");
    }
    if (name == "Table_Lamp") {
      return (this.imgPath = "assets/icon/table_lamp.png");
    }
    if (name == "Chandelier") {
      return (this.imgPath = "assets/icon/chandelier.png");
    }
    if (name == "Table_Fan") {
      return (this.imgPath = "assets/icon/table_fan.png");
    }
    if (name == "Curtain") {
      return (this.imgPath = "assets/icon/curtain.png");
    }
    if (name == "") {
      return (this.imgPath = "assets/icon/curtain.png");
    }
    return;
  }

  backbutton() {
    this.user.showDevice = false;
    this.user.showRoom = true;
  }
  pick(event:any) {
    //alert(event)
  }
  monday() {}
  tuesday() {}
  wednesday() {}
  thursday() {}
  friday() {}
  saturday() {}
  sunday() {}
  getGeolocation() {}
  setGeolocation() {}
  getDistanceFromLatLonInKm(){}
}
