import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ActionSheetController, AlertController } from '@ionic/angular';
// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Route, Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ttlockgatewaylist',
  templateUrl: './ttlockgatewaylist.component.html',
  styleUrls: ['./ttlockgatewaylist.component.scss'],
})
export class TtlockgatewaylistComponent implements OnInit {

  gatewayList1: any;
  gatewayList2: any;
  constructor(private authService: AuthService,
    private androidPermissions: AndroidPermissions,
    public alertController: AlertController,
    private router: Router,
    private auth: AuthService,
    private user: UserService,
    private navCtrl: NavController,
    public activateRoute: ActivatedRoute,
    public actionsheetCtrl: ActionSheetController,
  ) { }

  ngOnInit() {
    this.gatewayList();

  }

  gatewayList() {

    // this.login();
    var d = new Date();
    var n = d.getTime();
    var x = n;
    //console.log(n);
    let TTtoken = localStorage.getItem('TTtoken');
    // alert("t"+ TTtoken)
    const accessToken: string = TTtoken !== null ? TTtoken : '';
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: accessToken,
        pageNo: "1",
        pageSize: "20",
        date: JSON.stringify(x),
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),
        'Access-Control-Allow-Origin': '*'
      })
    };
    this.user.present('loading...');
    this.authService.tTlockGateway_list(params).subscribe(res => {
      this.user.dismiss();
      this.gatewayList2 = res;
      this.gatewayList1 = JSON.stringify(this.gatewayList2.list[0].gatewayId);
      this.gatewaylistLock();

    }, error => {
      this.user.dismiss();
      this.user.showToast(JSON.stringify(error.error));
    })


  }
  gatewaylist12: any;
  gatewaylist13: any;
  gatewaylistLock() {
    //alert(this.gatewayList1);
    // this.login();
    var d = new Date();
    var n = d.getTime();
    var x = n;
    //console.log(n);
    let TTtoken = localStorage.getItem('TTtoken');
    // alert("t"+ TTtoken)
    const accessToken: string = TTtoken !== null ? TTtoken : '';
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: accessToken,
        gatewayId: this.gatewayList1,
        date: JSON.stringify(x),
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),
        'Access-Control-Allow-Origin': '*'
      })
    };
    this.user.present('loading...');
    this.authService.tTlockGateway_gatewayList(params).subscribe(res => {
      this.user.dismiss();
      this.gatewaylist12 = res;
      this.gatewaylist13 = this.gatewaylist12.list;
    }, error => {
      this.user.dismiss();
      this.user.showToast(JSON.stringify(error.error));
    })


  }
  gatwaylockid: any;
  ttGateWayLockClick(g_id: any, g_mac: any, g_name: any, g_alias: any) {
    // alert(g_id);
    // alert(g_mac);
    // alert(g_name);
    this.gatwaylockid = g_id;


  }
  lock() {
    // this.login();
    var d = new Date();
    var n = d.getTime();
    var x = n;
    let TTtoken = localStorage.getItem('TTtoken');
    // alert("t"+ TTtoken)
    const accessToken: string = TTtoken !== null ? TTtoken : '';
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: accessToken,
        lockId: this.gatwaylockid,
        date: JSON.stringify(x),
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),
        'Access-Control-Allow-Origin': '*'
      })
    };
    //   this.user.present('loading...');
    // this.authService.tTlockGateway_lock(params).subscribe(res=>{
    //   this.user.dismiss();  
    //   alert(JSON.stringify(res))



    // },error=>{
    //   this.user.dismiss();
    //   this.user.showToast(JSON.stringify(error.error));

    // })


  }
  unlock() {
    // this.login();
    var d = new Date();
    var n = d.getTime();
    var x = n;
    let TTtoken = localStorage.getItem('TTtoken');
    // alert("t"+ TTtoken)
    const accessToken: string = TTtoken !== null ? TTtoken : '';
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: accessToken,
        lockId: this.gatwaylockid,
        date: JSON.stringify(x),
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),
        'Access-Control-Allow-Origin': '*'
      })
    };
    //   this.user.present('loading...');
    // this.authService.tTlockGateway_Unlock(params).subscribe(res=>{
    //   this.user.dismiss();  
    // alert(JSON.stringify(res))



    // },error=>{
    //   this.user.dismiss();
    //   this.user.showToast(JSON.stringify(error.error));

    // })
  }

  gatewaylock_Status() {
    var d = new Date();
    var n = d.getTime();
    var x = n;
    let TTtoken = localStorage.getItem('TTtoken');
    const accessToken: string = TTtoken !== null ? TTtoken : '';
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: accessToken,
        lockId: this.gatwaylockid,
        date: JSON.stringify(x),
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),
        'Access-Control-Allow-Origin': '*'
      })
    };
    //   this.user.present('loading...');
    // this.authService.tTlockGateway_State(params).subscribe(res=>{
    //   this.user.dismiss();  
    // alert(JSON.stringify(res)) 

    // },error=>{
    //   this.user.dismiss();
    //   this.user.showToast(JSON.stringify(error.error));

    // })
  }

  gatewayOpenState() {
    var d = new Date();
    var n = d.getTime();
    var x = n;
    let TTtoken = localStorage.getItem('TTtoken');
    const accessToken: string = TTtoken !== null ? TTtoken : '';
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: accessToken,
        lockId: this.gatwaylockid,
        date: JSON.stringify(x),
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),
        'Access-Control-Allow-Origin': '*'
      })
    };
    //   this.user.present('loading...');
    // this.authService.tTlockGateway_OpenState(params).subscribe(res=>{
    //   this.user.dismiss();  
    // alert(JSON.stringify(res))



    // },error=>{
    //   this.user.dismiss();
    //   this.user.showToast(JSON.stringify(error.error));

    // })
  }

  deleteGateway() {
    // tTlockGateway_delete
    var d = new Date();
    var n = d.getTime();
    var x = n;
    let TTtoken = localStorage.getItem('TTtoken');
    const accessToken: string = TTtoken !== null ? TTtoken : '';
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: accessToken,
        gatewayId: this.gatewayList1,
        date: JSON.stringify(x),
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),
        'Access-Control-Allow-Origin': '*'
      })
    };
    //   this.user.present('loading...');
    // this.authService.tTlockGateway_delete(params).subscribe(res=>{
    //   this.user.dismiss();  
    // alert(JSON.stringify(res))



    // },error=>{
    //   this.user.dismiss();
    //   this.user.showToast(JSON.stringify(error.error));

    // })

  }

  async gatewayListDetails() {
    const actionSheet = await this.actionsheetCtrl.create({
      header: 'Gateway Operation..',
      buttons: [
        {
          text: 'Gateway List',
          icon: 'finger-print-outline',
          handler: () => {
            this.gatewaylistLock();
            console.log('gateway list clicked');
          }
        },

        {
          text: 'Status',
          icon: 'remove-circle-outline',
          handler: () => {
            this.gatewaylock_Status();
            console.log('fav click clicked');


          }
        },

        {
          text: 'Open State',
          icon: 'remove-circle-outline',
          handler: () => {
            this.gatewayOpenState();
            console.log('open State click clicked');


          }
        },

        {
          text: 'Delete Gateway',
          icon: 'remove-circle-outline',
          handler: () => {
            this.deleteGateway();
            console.log('delete gateway click clicked');


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

}


