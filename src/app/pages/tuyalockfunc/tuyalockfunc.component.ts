import { Component, OnInit, NgZone } from "@angular/core";
import {
  ActionSheetController,
  NavController,
  PopoverController,
} from "@ionic/angular";
import { UserService } from "src/app/services/user.service";
declare var CameraCustom: any;
@Component({
  selector: "app-tuyalockfunc",
  templateUrl: "./tuyalockfunc.component.html",
  styleUrls: ["./tuyalockfunc.component.scss"],
})
export class TuyalockfuncComponent implements OnInit {
  //allTempPass: any;

  constructor(
    public user: UserService,
    public popoverController: PopoverController,
    public actionsheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private ngZone: NgZone
  ) { }
  icon: any;
  pass: any = "00000000";
  receiveListener: any;
  ngOnInit() {
    this.icon = this.user.tuyaDeviceIcon;
    let body = { id: this.user.tuyaDeviceId };
    CameraCustom.initDevice(
      body,
      (res: any) => {
        this.receiveListener = res;
        console.log(res);
        //alert(JSON.stringify(res))
        if (this.receiveListener == "RemoteUnlock") {
          this.ngZone.run(() => {
            this.createDialog();
          });

        }
      },
      (err: any) => {
        alert(err);
      }
    );
  }

  clickRemoteListener() {
    let body = { id: this.user.tuyaDeviceId };
    // CameraCustom.initDevice(body,
    //   res => {
    //     this.receiveListener=res;
    //     alert(JSON.stringify(res))
    //     if(this.receiveListener=="RemoteUnlock"){
    //    this.createDialog(ev);
    //  }
    //   },
    //   err => {
    //     alert("4" + err)
    //   })
    this.createDialog();
  }
  async createDialog() {
    const actionSheet = await this.actionsheetCtrl.create({
      header: "Remote Unlocking",
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "Yes",
          cssClass: "alert-message",
          handler: () => {
            let body = { id: this.user.tuyaDeviceId, allow: true };
            CameraCustom.remoteUnlock(
              body,
              (res: any) => { },
              (err: any) => { }
            );
          },
        },
        {
          text: "No",
          cssClass: "alert-message",
          handler: () => {
            let body = { id: this.user.tuyaDeviceId, allow: false };
            CameraCustom.remoteUnlock(
              body,
              (res: any) => { },
              (err: any) => { }
            );
          },
        },
        {
          text: "Please ensure the lock is woken up before you unlock/lock and is connected to wifi. (9 and # to be pressed on some locks)",
          cssClass: "message-text",
          handler: () => {

          }
        }
      ],

    });
    await actionSheet.present();
  }

  async actionsheet() {
    const actionSheet = await this.actionsheetCtrl.create({
      header: "Lock Records",
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "Lock Records",
          cssClass: "alert-message",
          handler: () => {
            let body = { id: this.user.tuyaDeviceId };
            console.log(body);
            CameraCustom.getRecords(
              body,
              (res: any) => {
                let body = { id: this.user.tuyaDeviceId };
                console.log(body);
                CameraCustom.getRecords(
                  body,
                  (res: any) => {
                    this.user.lockRecords = res;
                    this.navCtrl.navigateRoot("/lockRecords");
                    //console.log(JSON.stringify(res));
                  },
                  (err: any) => { }
                );
                //alert(res);
              },
              (err: any) => { }
            );
          },
        },
        {
          text: "Unlock Records",
          cssClass: "alert-message",
          handler: () => {
            let body = { id: this.user.tuyaDeviceId };
            console.log(body);
            CameraCustom.getUnlockRecords(
              body,
              (res: any) => {
                this.navCtrl.navigateRoot("/lockRecords");
                //alert(res);
              },
              (err: any) => { }
            );
          },
        },
        {
          text: "Hijack Records",
          cssClass: "alert-message",
          handler: () => {
            let body = { id: this.user.tuyaDeviceId };
            console.log(body);
            CameraCustom.getHijackRecords(
              body,
              (res: any) => {
                this.navCtrl.navigateRoot("/lockRecords");
                //alert(res);
              },
              (err: any) => { }
            );
          },
        },
      ],
    });
    await actionSheet.present();
  }

  createDynamicPass() {
    let dynapass = document.getElementById("dyna") as HTMLElement;
    let body = { id: this.user.tuyaDevices[0].id };
    console.log(body);
    CameraCustom.createDynaPass(
      body,
      (res: any) => {
        let pass = res;
        dynapass.innerHTML = res;
        this.pass = res;
        //alert(this.pass);
        // alert(res);
      },
      (err: any) => { }
    );
  }

  editName() {
    let titleName = prompt("Device Name:", "");
    if (titleName == null || titleName == "") {
      alert("Please Enter Device Name");
    } else {
      let body = {
        devicelist: this.user.tuyaDevices[0].id,
        titleName: titleName,
      };
      //alert(body)
      CameraCustom.renameDevice(
        body,
        (res: any) => {
          //alert("Successfully Changed");
          this.ngZone.run(() => {
            this.user.tuyaDeviceName = titleName;
          });
        },
        (err: any) => {
          //alert(err);
        }
      );
    }
  }
  getTempPassword() {
    let body = { id: this.user.tuyaDeviceId };
    CameraCustom.getTempPass(
      body,
      (res: any) => {
        this.user.allTempPass = res;
        this.navCtrl.navigateRoot("/tempPass");
      },
      (err: any) => { }
    );
  }
  getUser() {
    let body = { id: this.user.tuyaDeviceId };
    console.log(body);
    CameraCustom.getLockUser(
      body,
      (res: any) => {
        this.user.lockUser = res;
        this.navCtrl.navigateRoot("/userFunc");
      },
      (err: any) => { }
    );
  }
}
