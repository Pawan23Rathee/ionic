import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { AlertController, NavController, ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

declare var TTlockdata: any;


@Component({
  selector: 'app-ttic-cardlist',
  templateUrl: './ttic-cardlist.component.html',
  styleUrls: ['./ttic-cardlist.component.scss'],
})
export class TticCardlistComponent implements OnInit {

  show = false;
  iclist: any;
  icdata: any;
  // nodata=false;
  constructor(public alertController: AlertController,
    private router: Router,
    private auth: AuthService,
    private user: UserService,
    private navCtrl: NavController,
    public activateRoute: ActivatedRoute,
    public actionsheetCtrl: ActionSheetController,) {
    this.user.lockData;
    this.user.ttlockMac;

  }

  ngOnInit() {
    this.pluginclick();
    this.icList();

  }
  ionViewWillEnter() {
    // this.pluginclick();
    // this.icList();
  }




  pluginclick() {
    let body = {
      'lockdata': this.user.lockData,
      'macAddress': this.user.ttlockMac
    }
    TTlockdata.getAllValidCard(body,
      (res: any) => {
        // alert(res);
        this.icList();
      }, (err: any) => {
        alert(err)
      })
  }
  icList() {

    console.log("lockId:" + this.user.ttLockId);
    console.log("lockMac:" + this.user.ttlockMac);
    console.log("lockData:" + this.user.lockData);

    var d = new Date();
    var n = d.getTime();
    var x = n;
    console.log("currentTime:" + n);
    let TTtoken = localStorage.getItem('TTtoken') ?? "";
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: TTtoken,
        lockId: this.user.ttLockId,
        pageNo: "1",
        pageSize: "20",
        date: JSON.stringify(x),
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),

      })
    };
    this.user.present('wait..');
    this.auth.tTlockIc_list(params).subscribe(res => {
      this.user.dismiss();
      this.iclist = res;
      this.icdata = this.iclist.list;
      console.log(JSON.stringify(this.iclist.list))
      console.log("lenght" + this.iclist.list.length)
    }, error => {
      console.log(JSON.stringify(error.error));
      this.user.dismiss();
      console.log('error');
    })
  }



  async icAdd() {
    console.log("lockId:" + this.user.ttLockId);
    console.log("lockMac:" + this.user.ttlockMac);
    console.log("lockData:" + this.user.lockData);
    const actionSheet = await this.actionsheetCtrl.create({
      header: 'Modify your  IC Card',
      buttons: [
        {
          text: 'Add IC Card',
          icon: 'card-outline',
          handler: () => {
            console.log('add finger clicked');
            this.router.navigateByUrl('/ttlockicadd');
          }
        },

        {
          text: 'Clear',
          icon: 'remove-circle-outline',
          handler: () => {
            console.log('fav click clicked');
            this.clearFinger();
          }
        },

        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }
  clearFinger() {
    // clearFingerPrint
    let body = {
      "lockdata": this.user.lockData,
      "macAddress": this.user.ttlockMac
    }
    TTlockdata.clearFingerPrint(body,
      (res: any) => {
        // alert((res));
        this.clearfing();
      },
      (err: any) => {
      })
  }

  clearfing() {
    console.log("lockId:" + this.user.ttLockId);
    console.log("lockMac:" + this.user.ttlockMac);
    console.log("lockData:" + this.user.lockData);

    var d = new Date();
    var n = d.getTime();
    var x = n;
    console.log("currentTime:" + n);
    let TTtoken = localStorage.getItem('TTtoken') ?? "";
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: TTtoken,
        lockId: this.user.ttLockId,
        date: JSON.stringify(x),
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),

      })
    };
    this.user.present('wait..');
    this.auth.tTlockFingerClear(params).subscribe(res => {
      this.navCtrl.navigateRoot('/ttoperatiion');
      this.user.dismiss();
    }, error => {
      console.log(JSON.stringify(error.error));
      this.user.dismiss();
      console.log('error');
    })
  }

  async icCardDelete(cardNumber: any, cardid: any) {
    this.cardNum = cardNumber;
    this.cardId = cardid;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete...',
      message: 'Are you sure you want to delete',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            console.log('Confirm Okay');
            this.icCardDeleteSdk();
          }
        }
      ]
    });

    await alert.present();
  }
  cardNum: any;
  cardId: any;
  icCardDeleteSdk() {
    // deleteICCard 
    // cardNum, lockdata, lockMac 
    let body = {
      "cardNum": this.cardNum,
      "lockdata": this.user.lockData,
      "lockMac": this.user.ttlockMac
    }
    TTlockdata.clearFingerPrint(body,
      (res: any) => {
        this.deleteIc();
        console.log("delete ic card...");
      },
      (err: any) => {
      })

  }
  deleteIc() {
    console.log("lockId:" + this.user.ttLockId);
    console.log("lockMac:" + this.user.ttlockMac);
    console.log("lockData:" + this.user.lockData);

    var d = new Date();
    var n = d.getTime();
    var x = n;
    console.log("currentTime:" + n);
    let TTtoken = localStorage.getItem('TTtoken') ?? "";
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: TTtoken,
        lockId: this.user.ttLockId,
        cardId: this.cardId,
        deleteType: "1",
        date: JSON.stringify(x),
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),

      })
    };
    this.user.present('wait..');
    this.auth.tTlockIc_delete(params).subscribe(res => {
      this.navCtrl.navigateRoot('/ttlockiclist');
      this.user.dismiss();
    }, error => {
      console.log(JSON.stringify(error.error));
      this.user.dismiss();
      console.log('error');
    })
  }

}

