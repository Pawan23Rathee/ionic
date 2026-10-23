import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ActionSheetController, ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
})
export class GuestComponent implements OnInit {

  devicemodule:any;
  irmodule:any;
  moodmodule:any;
  lockres:any;
  guestEmail = false;

  constructor(public user: UserService,
    private auth: AuthService,
    private navCtrl: NavController) { }

  ngOnInit() { this.getDeviceModule(); }

  async getDeviceModule() {
    // this.moduleTypeShow = true;
    // this.moduleqrscan = false;  
    this.user.present("please wait..")
    this.auth.getModuleFromApi().subscribe(res => {
      this.user.dismiss();
      this.devicemodule = res;
      console.log("devicemmoudle" + JSON.stringify(this.devicemodule));
    }, err => {
      this.user.dismiss();
      this.user.showToast('something went wrong.please try again later.');
      console.log("Device module not found");
    })

    this.auth.showAddedIRModule().subscribe(res => {
      this.user.dismiss();
      this.irmodule = res;
      console.log("IR details:" + JSON.stringify(this.irmodule))
    }, err => {
      this.user.dismiss();
      this.user.showToast('something went wrong.please try again later.');
      console.log("IR not found");
    })

    this.auth.getshowAddedMoodDevice().subscribe(res => {
      this.user.dismiss();
      console.log(res)
      this.user.moodModule = res;
    }, err => {
      this.user.dismiss();
      this.user.showToast('something went wrong.please try again later.');
      console.log("mood not found..")
    })

    this.auth.getLocks().subscribe((res) => {
      this.lockres = res;
      console.log("lockres:" + JSON.stringify(this.lockres));
    }, err => {
      this.user.showToast('something went wrong.please try again later.');
      console.log("lock not found..")
    })
  }
  m_id: any;
  gotowifipage(id: any) {
    this.m_id = id;
    //this.user.showToast(id);
    this.guestEmail = true;
    // this.navCtrl.navigateRoot('/wifi');
  }
  onSubmit(data: any) {
    // this.user.showToast(this.m_id);
    // console.log(this.m_id);
    //  this.user.showToast(data.email);
    let guestbody = {
      "module": this.m_id,
      "name": data.email
    }
    this.user.present('please wait..');
    this.auth.forguestUser(guestbody).subscribe(res => {
      this.guestEmail = false;
      this.user.dismiss();
      console.log(res);
    }, err => {
      this.guestEmail = false;
      this.user.showToast('something went wrong.please try again later.');
      this.user.dismiss();

    })
  }

  backbutton() {
    this.user.showDevice = false;
    this.user.showRoom = true;
  }

}
