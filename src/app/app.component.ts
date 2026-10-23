import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { AlertController, IonRouterOutlet, NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
// import { FCM } from '@ionic-native/fcm/ngx';
//import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/v4";
//import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { UserService } from './services/user.service';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { FavlistComponent } from './pages/favlist/favlist.component';
import { Deeplinks } from '@awesome-cordova-plugins/deeplinks/ngx';
import { Router } from '@angular/router';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Location } from '@angular/common';
import { register } from 'swiper/element/bundle';
//declare var FCMPlugin: any;
declare var device: any;
declare var CameraCustom:any;
declare var espTouchSmartConfig:any;
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true }) routeroutlet!: IonRouterOutlet;
  @ViewChildren(IonRouterOutlet) routerOutlets!: QueryList<IonRouterOutlet>;


  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private network: Network,
    private user: UserService,
    private navctrl: NavController,
    private location: Location,
    private navCtrl: NavController,
    private deeplinks: Deeplinks,
    private alertController: AlertController,
  ) {

    this.initializeApp();
    this.backButtonEvent();
    //  this.NetworkButtonEvent()
    window.addEventListener('offline', () => {
      this.openAlert();
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      console.log("loading1");
      CameraCustom.init("vbhc",
        (res:any) => {
          //alert("1"+JSON.stringify(res))
        }, (err:any) => {
          // alert("2,,,,"+JSON.stringify(err))
        })
    });
  }



  NetworkButtonEvent() {
    this.platform.backButton.subscribeWithPriority(111, () => {

      // this.router.navigate(['']) 
      // navigator["app"].exitApp;
    })
  }
  async openAlert() {
    const alert = await this.alertController.create({
      header: 'Check Network Connection',
      message: 'You do not have Internet Connection',
      buttons: [{
        text: 'ok',
        handler: () => {
          // navigator['app'].exitApp();
        }
      }]
    });
    await alert.present();
  }
  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        if (this.router.url != '/mainpage') {
          // await this.router.navigate(['/']);
          await this.location.back();
        } else if (this.router.url === '/mainpage') {
          if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
            this.lastTimeBackPress = new Date().getTime();
            this.presentAlertConfirm();
          } else {
            // navigator['app'].exitApp();
          }
        }
      });
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      //message: "Are you sure you want to exit the Spira App?",
      message: "Are you sure you want to exit the THomes App?",
      //message: "Are you sure you want to exit the Bonfire App?",
      //message: "Are you sure you want to exit the DyfoSmart App?",
      //message: "Are you sure you want to exit the AIT App?",
      //message: "Are you sure you want to exit the livsmart App?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => { },
        },
        {
          text: "Close App",
          handler: () => {
            (navigator as any).app.exitApp();
          },
        },
      ],
    });

    await alert.present();
  }

}
