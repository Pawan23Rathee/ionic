import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
//import { Storage } from '@ionic/storage';
declare var CameraCustom:any;
@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"],
})
export class SideMenuComponent implements OnInit {
  public token2:any;
  //@ViewChild
  profName:any;
  constructor(
    private menu: MenuController,
    private authService: AuthService,
    public user: UserService,
    private navCtrl: NavController
  ) //private storage: Storage
  {
    setTimeout(() => {
      // this.profName = JSON.parse(localStorage.getItem('prof')).name
    }, 3000);
  }

  public menuItem = [
    /*{
      title: "Home",
      url: "/mainpage",
      icon: "home",
    },*/
    // {
    //   title: "Account Linking",
    //   url: "/accountLink",
    //   icon: "mic-outline",
    // },
    {
      title: "Favourites",
      url: "/favlist",
      icon: "heart",
    },
    {
      title: "Add Devices",
      url: "/mcategory",
      icon: "add-circle",
    },
    // {
    //   title: 'Scenes',
    //   url: '/mode',
    //   icon: "aperture"
    // },
    {
      title: "Scheduled Devices",
      url: "/newschedule",
      icon: "calendar",
    },
    // {
    //   title: 'Device Management',
    //   url: '/devicemanage',
    //   icon: "layers-outline"
    // },
    {
      title: "Energy Management",
      url: "/energychart",
      icon: "settings",
    },

    {
      title: "Help & Support",
      url: "/support",
      icon: "help-circle",
    },
  ];

  profImg:any;
  ngOnInit() {
    setTimeout(() => {
      this.profImg = localStorage.getItem("pof_img");
    }, 3000);
  }
  menuclick(ur: any) {
    if (ur == "Home") {
      this.navCtrl.navigateRoot("/mainpage");
      this.user.showDevice = false;
      this.user.showRoom = true;
      console.log("mainpage return");
    } else if (ur == "Scene") {
      this.navCtrl.navigateRoot("/mode");
      console.log("mode return");
    } else if (ur == "Set up a Device") {
      this.navCtrl.navigateRoot("/mcategory");
    } else if (ur == "Settings") {
      this.navCtrl.navigateRoot("/allmodule");
    }
  }

  openPage(page:any) {
      console.log("which page",page.url);
    //   // console.log(this.menu.enable(true))
    this.menu.close(); //.enable(false);
    // this.menu.open('first');
  }
  openFirst() {
    this.menu.enable(true, "first");
    this.menu.open("first");
  }
  logout() {
    this.authService.getLogoutFromApi().subscribe(
      (res) => {
        // this.storage.remove('token2').then((res)=>{
        //   console.log("wifitoken"+this.token2);
        //   });
        console.log(res);
        localStorage.clear();
        CameraCustom.logout(
          "logout",
          (res:any) => {},
          (err:any) => {}
        );
        //alert("Logout successfully.")
        this.navCtrl.navigateRoot("/login");
      },
      (err) => {
        // alert("please re-login again..");
        localStorage.clear();
        this.navCtrl.navigateRoot("/login");
      }
    );
  }
}
