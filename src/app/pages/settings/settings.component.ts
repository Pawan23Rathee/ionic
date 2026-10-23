import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  items = [
    {
      name: 'Configuration',
      subItems: [
        { name: 'Rooms' },
        { name: 'Devices' },
        // { name: 'Remotes' },
      ],
    },
    {
      name: 'Support',
      subItems: [
        { name: 'FAQ' },
        { name: 'Contact Us' },
      ],
    },
    {
      name: 'Others',
      subItems: [
        // { name: 'Change Theme' },
        { name: 'Wifi Configuration' },
        // { name: 'Wifi Lock Admin Access' },
        { name: 'LogOut' },
      ],
    },
    // Add more items with sub-lists as needed
  ];
  isItemExpanded: boolean[] = [];
  admincard = false;
  constructor(

    private authService: AuthService,
    public user: UserService,
    private navCtrl: NavController
  ) {
    this.items.forEach(() => {
      this.isItemExpanded.push(true);
    });
  }

  ngOnInit() { }
  toggleItem(index: number): void {
    this.isItemExpanded[index] = !this.isItemExpanded[index];
  }
  routing(index: any, subindex: any) {
    let name = this.items[index].subItems[subindex].name;
    if (name == "Rooms") {
     this.navCtrl.navigateForward('/rooms');
    } else if (name == "Devices") {
      this.navCtrl.navigateForward('/mcategory');
    } else if (name == "Remotes") {
      alert("Remotes");
    } else if (name == "FAQ") {
      this.navCtrl.navigateForward('/faqs');
    } else if (name == "Contact Us") {
     this.navCtrl.navigateForward('/support');
    } else if (name == "Change Theme") {
      this.navCtrl.navigateForward("/theme");
    } else if (name == "Wifi Configuration") {
      this.navCtrl.navigateForward("/wifi");
    } else if (name == "Wifi Lock Admin Access") {
      this.tuyaregCLick();
    } else if (name == "LogOut") {
     this.logout();
    }
  }
  tuyaregCLick() {
    this.admincard = true;
  }
  logout() {
    this.authService.getLogoutFromApi().subscribe(
      (res) => {
        console.log(res);
        localStorage.clear();
        this.navCtrl.navigateRoot("/login");
      },
      (err) => {
        localStorage.clear();
        this.navCtrl.navigateRoot("/login");
      }
    );
  }
}
