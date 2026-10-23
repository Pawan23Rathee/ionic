import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { event, param } from 'jquery';
import { EditdeviceComponent } from '../editdevice/editdevice.component';

@Component({
  selector: 'app-devicestatus',
  templateUrl: './devicestatus.component.html',
  styleUrls: ['./devicestatus.component.scss'],
})
export class DevicestatusComponent implements OnInit {
  device_status_res:any;
  imgPath:any;
  lock_response:Array<any>=[];
  d_name:any;
  onDevice=false;
  offDevice=false;
  id_for_del_dev:any;
  d_roomname:any;
  constructor(public user: UserService,
    public auth: AuthService,
    private navCtrl: NavController,
    public activateRoute: ActivatedRoute,
    public actionsheetCtrl: ActionSheetController,
    public modalController: ModalController,
    public alertController: AlertController,
    private router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
                  
      console.log("special_id"+ params['special']);
      console.log("special_name"+ params['special2']);
      console.log("special_roomname"+ params['special3']);
      console.log("id_for_del_dev_id will show in roominfo paraller of device:"+ params['special4']);

      console.log("special1_status"+ params['special1']);
      this.user.moodDevice_id= atob(params['special']);
      this.user.mood_pi=atob(params['special1']);
      this.d_name=atob(params['special2']);
      this.d_roomname=atob(params['special3'])
      this.id_for_del_dev=atob(params['special4'])
      
    });
   }

  ngOnInit() {
    this.getdevicestatus();
  }

  d_on:any;
  dev_status:any;
 getdevicestatus(){
   let device_id=this.user.moodDevice_id;
   console.log("get_device_id" +device_id)
  //  this.auth.showaddedDevices(device_id).subscribe(res=>{
    this.auth.getDeviceStatus(device_id).subscribe(res=>{
    console.log(res);
   this.device_status_res=res;  
   console.log("res:"+ JSON.stringify(this.device_status_res[0].is_online)) 
   if(JSON.stringify(this.device_status_res[0].is_online)=='false'){
   this.dev_status='Module status: Offline'
   }
   if(JSON.stringify(this.device_status_res[0].is_online)=='true'){
    this.dev_status='Module status: Online'
   }
      console.log("device_id"+ JSON.stringify(this.device_status_res[0].device));
      if((this.device_status_res[0].status)==true){
     this.imgPath = '../../../assets/images/6cx1.gif';
     this.d_on='on';
     this.onDevice=true;
     this.offDevice=false;

      }
      if(this.device_status_res[0].status==false){
         this.imgPath='../../../assets/images/off.gif';
         this.d_on='off';
         this.onDevice=false;
         this.offDevice=true;
      }

      this.lock_response[0]={
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
        'img':this.imgPath
      }
      console.log(JSON.stringify(this.lock_response[0].id));
      this.user.device_id_forScheduler=JSON.stringify(this.lock_response[0].id);
   })
 }
 
 changeStatus(e:any,e_id:any,e_status:any) {
  console.log(e_id);
  console.log("devicestatus"+ e_status);
 var img=document.getElementById(e_id) as HTMLInputElement;
 this.user.present('Please Wait...');
 if (e_status == true) {
   this.auth.changeStatuswithCheck(e_id, 0).subscribe(res => {
    for(let d of this.lock_response){
      if(d.id == e_id){d.status = false}
    }
     console.log("t"+res);
     //this.user.presentToastWithOptions('Your door get UnLock successfully.!','danger')
     this.imgPath = 'assets/images/off.gif'; 
      img.setAttribute('src',this.imgPath);
      this.d_on='off';
      this.onDevice=false;
      this.offDevice=true;
      this.user.dismiss();
      console.log(img);
         
   },err=>{
     this.user.dismiss();
   })
   return;
 }
 if (e_status == false) {
   this.auth.changeStatuswithCheck(e_id, 1).subscribe(res => {
    for(let d of this.lock_response){
      if(d.id == e_id){d.status = true}
    } 
     console.log("f" + res)
     //this.user.presentToastWithOptions('Your door get Lock successfully.!','success')
      this.imgPath = 'assets/images/6cx1.gif';     
      img.setAttribute('src',this.imgPath); 
      this.d_on='on';
      this.onDevice=true;
      this.offDevice=false;
      this.user.dismiss(); 
      console.log(img);
  },err=>{
    this.user.dismiss(); 
  })
  return;
}

}

setDimmer(event:any,id:any) {
  console.log(id)
  let setdimmer = event.currentTarget.value;
  console.log("dimmer value:" +setdimmer);
  //alert(setdimmer);
  //alert(id);
  this.auth.putDimmerValueFromApi(id, setdimmer).subscribe(res => {
   }, err => {this.user.showToast('something went wrong.please try again later or contact with our support team');})
}

async actionsheet(){
  const actionSheet = await this.actionsheetCtrl.create({  
    header: 'Modify your  device', 
    cssClass:'my-custom-class',
    buttons: [  
      {  
        text: 'Edit Device',  
        icon: 'create', 
        cssClass:'alert-message',
        handler: () => {  
          console.log('edit device clicked');  
          this.editdeviceclick();
          
        }  
      },
      {  
        text: 'wi-fi settings',  
        icon: 'wifi',
        cssClass:'alert-message',
        handler: () => {  
          console.log('wifi click clicked');  
          this.router.navigateByUrl('/wifi');
          
        }  
      },
      {  
        text: 'Add favourite',  
        icon: 'heart',
        cssClass:'alert-message',
        handler: () => {  
          console.log('fav click clicked');  
          this.adddeviceinfav();
          
        }  
      },
      {  
        text: 'Delete Device',  
        icon: 'trash',
        cssClass:'alert-message',
        handler: () => {  
          console.log('delect click clicked');  
          this.presentAlertConfirm();
        }  
      },
       {  
        text: 'Cancel', 
        icon: 'close', 
        role: 'cancel',  
        cssClass:'alert-message',
        handler: () => {  
          console.log('Cancel clicked');  
        }  
      }  
    ]  
  });  
  await actionSheet.present();  
}  

async editdeviceclick(){
  console.log("dwe" + JSON.stringify(this.lock_response[0].minimum))
  const modal = await this.modalController.create({
    component: EditdeviceComponent,
    componentProps: { players:  JSON.stringify(this.lock_response[0]),
                      de_type:  JSON.stringify(this.lock_response[0].device_type),
                      de_id:    this.id_for_del_dev,//JSON.stringify(this.lock_response[0].id),
                      de_name:  JSON.stringify(this.lock_response[0].name),
                      de_dimmer:  JSON.stringify(this.lock_response[0].dimmer),
                      de_isdimmer:  JSON.stringify(this.lock_response[0].is_dimmer),
                      de_min:  JSON.stringify(this.lock_response[0].minimum),
                      de_max:  JSON.stringify(this.lock_response[0].maximum),  
    }
  });
  return await modal.present();
}

async presentAlertConfirm() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class1',
    header: 'Alert!',
    message: 'Are you sure you want to delete device? module will also be deleted from your room .you have to add module again in room.!!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        } 
      }, {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');
          let device_ID=JSON.stringify(this.device_status_res[0].device);
          console.log("device_id" + device_ID);
          console.log("paraller id of device id (will show in roominfo) use for delete device" + this.id_for_del_dev);
          this.user.present('deleting...');
          this.auth.putdeletedevice(this.id_for_del_dev).subscribe(res=>{
         console.log(res);
        this.user.showDevice=false; 
        this.user.showRoom = true; 
        this.navCtrl.navigateRoot('/mainpage');  
        this.user.dismiss();
          },err=>{
            this.user.showToast("something went wrong. please contact support@omilock.com");
            this.user.showDevice=false; 
            this.user.showRoom = true; 
        this.navCtrl.navigateRoot('/mainpage');
        this.user.dismiss();
          })       
        }
      }
    ]
  });
  await alert.present();
}

devicestatus(){
  console.log("special_roomname"+ this.d_roomname);
  this.user.present('please wait...');
  this.auth.getDeviceFromApi(this.d_roomname).subscribe(res=>{
    this.user.device_inRoom=res;
  console.log('room lock'+ JSON.stringify(res));
  for(let i of this.user.device_inRoom){
    if(i.is_online=='False'){
   i.is_online=true;
    }
    else if(i.is_online=='True'){
      i.is_online=false;
    }
   }
   this.user.dismiss();
},err=>{
  this.user.dismiss();
  console.log('getting device in room error')
})
}

adddeviceinfav(){
  console.log('fav click....');
  let device_ID=JSON.stringify(this.device_status_res[0].device);
  console.log("device_id" + device_ID);
  console.log('roomname'+ this.d_roomname);

  let body={
    "device": device_ID,
    "description": this.d_roomname
  }
this.user.present('please wait...');
  this.auth.adddeviceinfav(body).subscribe(res=>{
    console.log('res' + res);
    this.navCtrl.navigateRoot('/favlist');
this.user.dismiss();
  },err=>{
    this.user.dismiss();
    console.log(err.error);

  })
}
}
