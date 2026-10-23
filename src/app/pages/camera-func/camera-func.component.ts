import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
//import { SocialSharing } from '@ionic-native/social-sharing/ngx';
declare var CameraCustom:any;



@Component({
  selector: 'app-camera-func',
  templateUrl: './camera-func.component.html',
  styleUrls: ['./camera-func.component.scss'],
})
export class CameraFuncComponent implements OnInit {
  members: any;
  icon: any;

  constructor(public user: UserService,
    private navCtrl: NavController,
    public actionsheetCtrl: ActionSheetController,
    private router: Router,
    public alertController: AlertController
    //private socialShare: SocialSharing
  ) { }
  id:any;
  ngOnInit() {
   this.icon= this.user.tuyaDeviceIcon;
   this.initDevice();
   }
  initDevice() {

    let body = { id:this.user.tuyaDeviceId}
      CameraCustom.initDevice(body,
        (res:any) => {
          //this.bitmap=res;
          //this.createdCode=res;
          alert(JSON.stringify(res))
        },
        (err:any) => {
          // alert(JSON.stringify(err))
          //alert("4" + err)
        })
    
  }
  deleteDevice() {
    let body = { 'devicelist':this.user.tuyaDeviceId}
    CameraCustom.deleteDevice(body,
      (res:any) => {
        //  this.bitmap=res;
        //  this.createdCode=res;
        alert("Deleted Successfully");
        this.navCtrl.navigateRoot('/mainpage');
      },
      (err:any) => {
        alert("Deleted Successfully");
        this.navCtrl.navigateRoot('/mainpage');
        //alert(err)
        // alert("4 error")
      })
  }
  addMember() {
    CameraCustom.addmember('newMember',
      (res:any) => {
        //this.user.showToast(JSON.stringify(res));
        //alert(JSON.stringify(res)) 
        this.shareMsg(res);
      },
      (err:any) => {
        alert(JSON.stringify(err))
      })

  }
  tuyaMessages() {
    let body = { 'id': this.user.tuyaDeviceId}
    CameraCustom.messagePanel(body,
      (res:any) => {
        //this.user.showToast(JSON.stringify(res));
        //alert(JSON.stringify(res)) 
        this.shareMsg(res);
      },
      (err:any) => {
        alert(JSON.stringify(err))
      })

  }
  cloudSer(){
    let body = { 'id': this.user.tuyaDeviceId }
    CameraCustom.cloudSer(body,
      (res:any) => {
        //this.user.showToast(JSON.stringify(res));
        //alert(JSON.stringify(res)) 
        this.shareMsg(res);
      },
      (err:any) => {
        alert(JSON.stringify(err))
      }
      )
  }
  shareMsg(msg:any) {
    const options = {
      message: msg,
      url: null
    }
    // this.socialShare.shareWithOptions(options);
  }
  inviteCode:any;
  joinByCode() {
    let body = { invitecode: this.inviteCode }
    CameraCustom.invitecode(body,
      (res:any) => {
        //alert(JSON.stringify(res))
        this.shareMsg(res);
      },
      (err:any) => {
        alert(JSON.stringify(err))
      })

  }

  getMembers() {
    let body = { "homeId": this.user.homeId }
    CameraCustom.memberlist(body,
      (res:any) => {
        this.members = res;
        this.user.memberList = this.members.account;
        this.navCtrl.navigateRoot('/tMem');
      },
      (err:any) => {
        alert(JSON.stringify(err))
      })

  }

  getMessage() {
    this.navCtrl.navigateRoot('/tMsg');
  }
  shareDevice() {
    this.navCtrl.navigateRoot('/shareTuya');
  }
  getFeatures() {
   this.smartScene();
  }
  smartScene() {
    this.navCtrl.navigateRoot('/smartSce');
  }
  // playback() {
  //   let body = { id: this.user.tuyaDevices[0].id }
  //   CameraCustom.playback(body,
  //     res => {

  //     }, err => {

  //     })
  // }
  async playback() {
    const actionSheet = await this.actionsheetCtrl.create({
      header: 'Playback Panel',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Start Playback',
          icon: 'play',
          cssClass: 'alert-message',
          handler: () => {
            let body = { id:this.user.tuyaDeviceId }
            console.log('edit device clicked');
            CameraCustom.playback(body,
                  (res:any) => {
            
                  }, (err:any) => {
            
                   })
             }
        },{
          text: "Record Video",
          icon: 'recording',
          cssClass: 'alert-message',
          handler: () => {
            let body = { id: this.user.tuyaDeviceId,num:"4" }
            console.log('delect click clicked');
             CameraCustom.playbackStatus(body,
              (res:any) => {
        
              }, (err:any) => {
        
               })
          }
        },
        {
          text: 'Record Switch',
          icon: 'close',
          role: 'cancel',
          cssClass: 'alert-message',
          handler: () => {
            let body = { id: this.user.tuyaDeviceId,num:"6" }
            console.log('Cancel clicked');
            CameraCustom.playbackStatus(body,
              (res:any) => {
        
              }, (err:any) => {
        
               })
          }
        },
        {
          text: 'SD Card Status',
          icon: 'hardware-chip',
          cssClass: 'alert-message',
          handler: () => {
            let body = { id: this.user.tuyaDeviceId,num:"1" }
            console.log('wifi click clicked');
            CameraCustom.playbackStatus(body,
              (res:any) => {
        
              }, (err:any) => {
        
               })

          }
        },
        {
          text: 'SD Card Format',
          icon: 'trash',
          cssClass: 'alert-message',
          handler: () => {
            let body = { id: this.user.tuyaDeviceId,num:"2" }
            console.log('fav click clicked');
            CameraCustom.playbackStatus(body,
              (res:any) => {
        
              }, (err:any) => {
        
               })

          }
        },
        {
          text: 'SD Card Format Status',
          icon: 'analytics',
          cssClass: 'alert-message',
          handler: () => {
            let body = { id: this.user.tuyaDeviceId,num:"3" }
            console.log('fav click clicked');
            CameraCustom.playbackStatus(body,
              (res:any) => {
        
              }, (err:any) => {
        
               })
          }
        },
        {
          text: 'SD Card Capacity',
          icon: 'file-tray-stacked',
          cssClass: 'alert-message',
          handler: () => {
            let body = { id: this.user.tuyaDeviceId,num:"5" }
            console.log('delect click clicked');
            CameraCustom.playbackStatus(body,
              (res:any) => {
        
              }, (err:any) => {
        
               })
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          cssClass: 'alert-message',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
        
      ]
    });
    await actionSheet.present();
    const result = await actionSheet.onDidDismiss();
  }
 

  async actionsheet() {
    const actionSheet = await this.actionsheetCtrl.create({
      header: 'Modify your  device',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Get Members',
          icon: 'person-add',
          cssClass: 'alert-message',
          handler: () => {
            console.log('edit device clicked');
            this.getMembers();

          }
        },
        {
          text: 'Add Members',
          icon: 'person-add',
          cssClass: 'alert-message',
          handler: () => {
            console.log('wifi click clicked');
            this.addMember();

          }
        },
        {
          text: 'Smart Scene',
          icon: 'analytics',
          cssClass: 'alert-message',
          handler: () => {
            console.log('fav click clicked');
            this.smartScene();

          }
        },
        {
          text: 'Cloud Service',
          icon: 'analytics',
          cssClass: 'alert-message',
          handler: () => {
            console.log('fav click clicked');
            this.cloudSer();

          }
        },
        {
          text: 'Rename Device',
          icon: 'analytics',
          cssClass: 'alert-message',
          handler: () => {
            console.log('fav click clicked');
            let titleName = prompt("Device Name:", "");
            if (titleName == null || titleName == "") {
              alert("Please Enter Device Name")
            } else {
              let body = {
                'devicelist': this.user.tuyaDeviceId,
                "titleName": titleName
              }
              //alert(body)
              CameraCustom.renameDevice(body,
                (res:any) => {
                  //alert("successfully Changed");
                }, (err:any) => {
                  // alert(err);
                })
            }
          }
        },
        {
          text: 'Delete Device',
          icon: 'trash',
          cssClass: 'alert-message',
          handler: () => {
            console.log('delect click clicked');
            this.presentAlertConfirm();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          cssClass: 'alert-message',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class1',
      header: 'Alert!',
      message: 'Are you sure you want to delete device? ',
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
            this.deleteDevice();
          }
        }
      ]
    });
    await alert.present();
  }


}

