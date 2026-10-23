import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ActionSheetController, ModalController, AlertController, Platform } from '@ionic/angular';
import { DevicesComponent } from '../devices/devices.component';
import { AddlockinroomComponent } from '../addlockinroom/addlockinroom.component';


@Component({
  selector: 'app-allmodule',
  templateUrl: './allmodule.component.html',
  styleUrls: ['./allmodule.component.scss'],
})
export class AllmoduleComponent implements OnInit {
  devicemodule:any;
  irmodule:any;
  moodmodule:any;
  lockres:any;
  modulepi_id:any;

  constructor(public user: UserService,
    private auth: AuthService,
    private navCtrl: NavController,
    private platform: Platform,
    private modalController: ModalController) {
  }

  ngOnInit() {
    this.getDeviceModule();
  }
  getmodeuldevice:any;
  async getDeviceModule() {
    this.user.present("please wait...");
    // Get Module from API
    this.auth.getModuleFromApi().subscribe(res => {
      this.devicemodule = res;
      this.getmodeuldevice = this.devicemodule;
      // this.user.dismiss();
      console.log("devicemmoudle" + JSON.stringify(this.getmodeuldevice));
      // Show Added IR Module
      this.auth.showAddedIRModule().subscribe(res => {
        this.user.dismiss();
        this.irmodule = res;
        // console.log("IR details:" + JSON.stringify(this.irmodule));
        // Get Show Added Mood Device
        this.auth.getshowAddedMoodDevice().subscribe(res => {
          // this.user.dismiss();
          console.log(res)
          this.user.moodModule = res;
          // Get Locks
          this.auth.getLocks().subscribe((res) => {
            this.lockres = res;
            console.log("lockres:" + JSON.stringify(this.lockres));
            this.devicemodule;
            this.irmodule;
            if (this.devicemodule == '' && this.irmodule == '' && this.lockres == " ") {
              console.log('not added ')
            }
            this.user.dismiss();
          }, err => {
            this.user.dismiss();
            this.user.showToast('something went wrong.please try again later.');
            console.log("lock not found..")
          })
        }, err => {
          this.user.dismiss();
          this.user.showToast('something went wrong.please try again later.');
          console.log("mood not found..")
        })
      }, err => {
        this.user.dismiss();
        this.user.showToast('something went wrong.please try again later.');
        console.log("IR not found");
      })

    }, err => {
      this.user.dismiss();
      this.user.showToast('something went wrong.please try again later.');
      console.log("Device module not found");
    })
    console.log('device' + JSON.stringify(this.getmodeuldevice));
  }

  async clickDeviceModule(index: any) {
    let device = this.devicemodule[index];
    console.log(" DeviceModul d_name" + device.name);
    let device_type = (device.pi_id) ? device.pi_id.split('-') : '';
    // let piId_arr = (this.user.module_piId) ? this.user.module_piId.split('-') : '';
    debugger
    if (device_type[0] == "N") {
      let ir = this.irmodule.find((Item: any) => Item.pi_id_name == device.pi_id);
      // device.pi_id =ir.id;
      // this.user.dd_name = ir.name;
      // this.user.module_piId = ir.pi_id;
      this.clickIRModule(ir.id, ir.counter, ir.id, ir.name);
    } else {
      device.pi_id = device.pi_id;
      this.user.dd_name = device.name;



      // this.user.module_piId = device.pi_id;
      this.user.module_piId = device.pi_id;
      this.user.moduleIdForKey = device.id;
      this.user.todayArr = device.pi_id;
      debugger
      // if (device_type[0] == "N") {
      //   this.navCtrl.navigateRoot('/ir-product');
      // } else {
      this.navCtrl.navigateRoot('/devices');
    }

    console.log(this.user.todayArr);

    // const modal = await this.modalController.create({
    //   component: DevicesComponent,
    //   componentProps: { player: this.user.todayArr }
    // });
    // return await modal.present();
  }
  clickIRModule(moduleId: any, counter: any, pi_id: any, ir_name: any) {
    debugger
    console.log("clickIRModule", counter);
    console.log(pi_id);
    console.log("ii_name" + ir_name);
    this.user.dd_name = ir_name;
    this.user.moduleIdForKey = moduleId;
    this.user.module_piId = pi_id;
    this.user.todayArr = pi_id;
    {
      this.navCtrl.navigateRoot('/ir-product');
    }
  }

  clickMoodModule(m_id:any, mood_pi:any) {
    console.log("clickMoodModule", m_id);
    //console.log(m_name);
    console.log("mm_name" + mood_pi);
    this.user.dd_name = mood_pi;
    this.user.moodDevice_id = m_id;
    {
      this.navCtrl.navigateRoot('/devices');
    }
  }

  async clickLockModule(lock_id:any, lock_serial_no:any) {
    console.log("clickLockModule lock_id:" + lock_id);
    console.log("lock_serial_no:" + lock_serial_no);
    const modal = await this.modalController.create({
      component: AddlockinroomComponent,
      componentProps: {
        lock_id: lock_id,
        lock_serial: lock_serial_no
      }
    });
    return await modal.present();
  }
  locksetup() {
    console.log("click to scan lock module");
    this.navCtrl.navigateRoot('/locksetup');
  }

  gotowifipage() {
    this.navCtrl.navigateRoot('/wifi');
  }

  gotoirproductpage() {
    this.navCtrl.navigateRoot('/irdatacolletion');
  }
  gotodyfolistlist() {
    this.navCtrl.navigateRoot('/security');
  }

  backbutton() {
    this.user.showDevice = false;
    this.user.showRoom = true;
  }

  async adddeviceinroom() {
    //     this.user.todayArr=this.modulepi_id;
    //     console.log(this.user.todayArr);
    //     this.user.showToast(this.user.todayArr);
    //  const modal = await this.modalController.create({
    //      component: DevicesComponent,
    //      componentProps: { player:  this.user.todayArr}
    //    });
    //    return await modal.present();
  }
  add_devices() {
    this.user.present('please wait...');
    this.navCtrl.navigateRoot('/mcategory');
    this.user.dismiss();
  }


}
