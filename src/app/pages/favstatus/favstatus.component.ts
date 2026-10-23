import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-favstatus',
  templateUrl: './favstatus.component.html',
  styleUrls: ['./favstatus.component.scss'],
})
export class FavstatusComponent implements OnInit {

  device_status_res: any;
  imgPath:any;
  lock_response:Array<any> = [];
  d_name:any;
  onDevice:boolean = false;
  offDevice:boolean = false;
  id_for_del_dev:any;
  d_roomname:any;
  dd_id:any;
  constructor(public user: UserService,
    public auth: AuthService,
    private navCtrl: NavController,
    public activateRoute: ActivatedRoute,
    public actionsheetCtrl: ActionSheetController,
    public modalController: ModalController,
    public alertController: AlertController,
    private router: Router) {
    this.activateRoute.queryParams.subscribe(params => {

      // console.log("special_id" + params.special);
      // console.log("special_name" + params.special2);
      // console.log("special_roomname" + params.special3);
      // console.log("device_serial_id" + params.special4);


      console.log("special1_status" + params['special1']);
      this.user.moodDevice_id = atob(params['special']);
      this.user.mood_pi = atob(params['special1']);
      this.d_name = atob(params['special2']);
      this.d_roomname = atob(params['special3'])
      this.dd_id = atob(params['special4']);

    });
  }

  ngOnInit() {
    this.getdevicestatus();
  }

  d_on:any;
  is_online_status:any;
  getdevicestatus() {
    let device_id = this.user.moodDevice_id;
    console.log("get_device_id" + device_id)
    //  this.auth.showaddedDevices(device_id).subscribe(res=>{
    this.auth.getDeviceStatus(device_id).subscribe(res => {
      console.log(res);
      this.device_status_res = res;
      console.log("res:" + JSON.stringify(this.device_status_res))
      console.log("device_id" + JSON.stringify(this.device_status_res[0].device));
      this.is_online_status = JSON.stringify(this.device_status_res[0].is_online);
      console.log("device_isOnline" + JSON.stringify(this.device_status_res[0].is_online));

      if ((this.device_status_res[0].status) == true) {
        this.imgPath = '../../../assets/images/6cx1.gif';
        this.d_on = 'on';
        this.onDevice = true;
        this.offDevice = false;

      }
      if (this.device_status_res[0].status == false) {
        this.imgPath = '../../../assets/images/off.gif';
        this.d_on = 'off';
        this.onDevice = false;
        this.offDevice = true;
      }

      this.lock_response[0] = {
        'id': this.device_status_res[0].id,
        'device': this.device_status_res[0].device,
        'pi_id': this.device_status_res[0].pi_id,
        'status': this.device_status_res[0].status,
        'dimmer': this.device_status_res[0].dimmer,
        'name': this.device_status_res[0].name,
        'device_type': this.device_status_res[0].device_type,
        'minimum': this.device_status_res[0].minimum,
        'maximum': this.device_status_res[0].maximum,
        'is_dimmer': this.device_status_res[0].is_dimmer,
        'img': this.imgPath
      }
      console.log(JSON.stringify(this.lock_response[0].status));
      this.user.device_id_forScheduler = JSON.stringify(this.lock_response[0].id);
    })
  }

  changeStatus(e:any, e_id:any, e_status:any) {
    console.log(e_id);
    console.log("devicestatus" + e_status);
    var img = document.getElementById(e_id) as HTMLInputElement;
    this.user.present('Please Wait...');
    if (e_status == true) {
      this.auth.changeStatuswithCheck(e_id, 0).subscribe(res => {
        for (let d of this.lock_response) {
          if (d.device == e_id) { d.status = false }
        }
        console.log("t" + res);
        //this.user.presentToastWithOptions('Your door get UnLock successfully.!','danger')
        this.imgPath = 'assets/images/off.gif';
        img.setAttribute('src', this.imgPath);
        this.d_on = 'off';
        this.onDevice = false;
        this.offDevice = true;
        this.user.dismiss();
        console.log(img);

      })
      return;
    }
    if (e_status == false) {
      this.auth.changeStatuswithCheck(e_id, 1).subscribe(res => {
        for (let d of this.lock_response) {
          if (d.device == e_id) { d.status = true }
        }
        console.log("f" + res)
        //this.user.presentToastWithOptions('Your door get Lock successfully.!','success')
        this.imgPath = 'assets/images/6cx1.gif';
        img.setAttribute('src', this.imgPath);
        this.d_on = 'on';
        this.onDevice = true;
        this.offDevice = false;
        this.user.dismiss();
        console.log(img);
      })
      return;
    }

  }

  setDimmer(e:any) {
    let setdimmer = (<HTMLInputElement>document.getElementById('dimmervalue')).value;
    console.log("dimmer value:" + setdimmer)
    this.auth.putDimmerValueFromApi(e, setdimmer).subscribe(res => {
    }, err => { this.user.showToast('something went wrong.please try again later or contact with our support team'); })
  }






  devicestatus() {
    console.log("special_roomname" + this.d_roomname);
    this.user.present('please wait...');
    this.auth.getDeviceFromApi(this.d_roomname).subscribe(res => {
      this.user.device_inRoom = res;
      console.log('room lock' + JSON.stringify(res));
      for (let i of this.user.device_inRoom) {
        if (i.is_online == 'False') {
          i.is_online = true;
        }
        else if (i.is_online == 'True') {
          i.is_online = false;
        }
      }
      this.user.dismiss();
    }, err => {
      this.user.dismiss();
      console.log('getting device in room error')
    })
  }

  delete_dev(fd_id:any, d_serial_id:any) {
    console.log(fd_id);
    console.log(d_serial_id);
    this.user.present('deleting device...');
    this.auth.deleteFavDevice(d_serial_id).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('/favlist');
      this.user.dismiss();
    }, err => {
      console.log(err.error);
      this.user.dismiss();
    })
  }


}
