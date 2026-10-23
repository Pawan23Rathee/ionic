import { Component, OnInit, NgZone } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { HttpParams, HttpHeaders } from "@angular/common/http";
import { NavController, ModalController } from "@ionic/angular";
import { AlertController, ActionSheetController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions/ngx";
declare var CameraCustom:any;
declare var TTlockdata:any;

@Component({
  selector: "app-securitylock",
  templateUrl: "./securitylock.component.html",
  styleUrls: ["./securitylock.component.scss"],
})
export class SecuritylockComponent implements OnInit {
  lo_res: any;
  lock_response:Array<any> = [];
  imgPath: string='';
  mo_res: any;
  gatewayList1:any;
  gatewayList2:any;
  password:any;
  ttpass:any;
  tuya_security_lock:Array<any> = [];
  allDevices:Array<any> = [];
  constructor(
    private authService: AuthService,
    private androidPermissions: AndroidPermissions,
    public alertController: AlertController,
    private router: Router,
    private auth: AuthService,
    public user: UserService,
    public activateRoute: ActivatedRoute,
    public actionsheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    public modalController: ModalController,
    private zone: NgZone
  ) {
    this.allDevices = [];
    this.getTuyahome();
    // let TTtoken = localStorage.getItem('TTtoken');
    // console.log(this.user.username2);
    // this.password=localStorage.getItem('passwordforprofile');
    // console.log(this.password);
    // console.log("token:"+ TTtoken);
    // if(TTtoken==null || TTtoken=="undefined"){
    //   console.log('tt null');
    //   let body={
    //     password:this.password
    //   }
    //   TTlockdata.encrypt(body,
    //     res=>{
    //       this.ttpass=res;
    //       this.user.ttPassword=this.ttpass;
    //       localStorage.setItem("ttPassword",this.ttpass);
    //       const params = new HttpParams({
    //         fromObject: {
    //           username: 'dyfo_'+this.user.username2.split('@')[0],
    //           password: this.ttpass,
    //           redirect_uri :'https://dyfolabs.com/',
    //           grant_type: "password",
    //         client_secret: "BACKEND_SECRET_REQUIRED" ,
    //         client_id: '7a614fea8d6f427caa982e9a1aa6afc1',
    //         }
    //       });
    //       const httpOptions = {
    //         headers: new HttpHeaders({
    //           'Content-Type':'application/x-www-form-urlencoded',
    //           'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),
    //           'Origin': 'Dyfo'
    //         })
    //       };
    //       this.user.present('wait');
    //       this.authService.loginTTLock(params).subscribe(res=>{
    //         console.log((res));
    //         this.user.showToast(JSON.stringify(res))
    //         this.user.dismiss();
    //       },error=>{
    //       console.log(JSON.stringify(error.error));
    //       console.log('error');
    //       this.user.dismiss();
    //       })
    //     },err=>{}
    //     )
    // }
  }

  ngOnInit() {
    this.tTLocklist();
    //  this.getlockmodule();
  }

  //*************** * TTLOck Started here ***************/
  tTlockData:any;
  ttLockdataAll:any;
  tTLocklist() {
    console.log("testing5");
    var d = new Date();
    var n = d.getTime();
    var x = n;
    console.log(n);
    let TTtoken = localStorage.getItem("TTtoken")??'';
    // this.user.showToast(TTtoken);
    const params = new HttpParams({
      fromObject: {
        clientId: "7a614fea8d6f427caa982e9a1aa6afc1",
        accessToken: TTtoken,
        type: "2-Lift",
        pageNo: "1",
        pageSize: "20",
        date: JSON.stringify(x),
      },
    });
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "Dyfo",
      }),
    };

    console.log("testing6");
    console.log(JSON.stringify(params));

    // alert("data---"+ params);
    this.user.present("");
    this.auth.TTlock_list(params).subscribe(
      (res) => {
        console.log("testing7");
        console.log(JSON.stringify(res));
        this.user.dismiss();
        this.tTlockData = res;
        this.ttLockdataAll = this.tTlockData.list;
        if (this.ttLockdataAll.length > 0) {
          this.zone.run(() => {
            for (var i = 0; i < this.ttLockdataAll.length; i++) {
              this.allDevices.push({
                type: "ttlock",
                item: this.ttLockdataAll[i],
              });
            }
          });
        }
        this.user.ttLockId = this.ttLockdataAll.lockId;
        console.log(this.ttLockdataAll);
      },
      (err) => {
        this.user.dismiss();
        this.user.showToast(JSON.stringify(err.error));
      }
    );
  }

  lockID:any;

  ttLockClick(lockId:any, lockData:any, lockMac:any) {
    this.user.ttLockId = lockId;
    this.user.lockData = lockData;
    this.user.ttlockMac = lockMac;
    // localStorage.setItem('lockId',lockId);
    this.navCtrl.navigateRoot("/ttoperation");
  }

  //************* */  Dyfo Lock code  started  ***********//

  dyfo_lock_response = [];
  // imgPath: string;

  getlockmodule() {
    this.user.present("Please wait...");
    this.auth.getDoorLockModuleApi().subscribe(
      (res) => {
        this.mo_res = res;
        this.user.dismiss();
        console.log(this.mo_res);
        for (let i = 0; i < this.mo_res.length; i++) {
          this.auth.getDoorStatus(this.mo_res[i].pi_id).subscribe(
            (res) => {
              this.user.dismiss();
              this.lo_res = res;

              console.log(this.lo_res);
              if (this.lo_res[i].status == true) {
                this.imgPath = "assets/icon/unlock.jpeg";
              }
              if (this.lo_res[i].status == false) {
                this.imgPath = "assets/icon/lock.png";
              }
              this.lock_response[i] = {
                id: this.lo_res[i].id??"",
                device: this.lo_res[i].device,
                pi_id: this.lo_res[i].pi_id,
                name: this.lo_res[i].name,
                device_type: "Door_Lock",
                status: this.lo_res[i].status,
                img: this.imgPath,
              };
              if (i == this.mo_res.length - 1) {
                this.zone.run(() => {
                  if (this.lock_response.length > 0) {
                    for (var i = 0; i < this.lock_response.length; i++) {
                      this.allDevices.push({
                        type: "lock",
                        item: this.lock_response[i],
                      });
                    }
                  }
                });
              }
            },
            (err) => {
              this.user.dismiss();
              // alert(err.errror);
            }
          );
        }
      },
      (err) => {
        this.user.dismiss();
        // alert(err.errror);
      }
    );
  }
  changeDyfoLockStatus(e: any) {
    var img = document.getElementById(e) as HTMLInputElement;
    this.user.present("Please Wait...");
    if (((event as Event).currentTarget as HTMLInputElement).checked == true) {
      this.auth.changeStatuswithCheck(e, 1).subscribe((res) => {
        this.user.dismiss();
        this.imgPath = "assets/icon/unlock.jpeg";
        img.setAttribute("src", this.imgPath);
      });
    }
    if (((event as Event).currentTarget as HTMLInputElement).checked == false) {
      this.auth.changeStatuswithCheck(e, 0).subscribe((res) => {
        this.user.dismiss();
        this.imgPath = "assets/icon/lock.png";
        img.setAttribute("src", this.imgPath);
      });
    }
  }

  // ****************** dyfo lock  ended here ****** and TTLock stared here*******//

  initDevice(id:any, ev:any) {
    // alert(id)
    let body = { id: id };
    if (ev.currentTarget.checked) {
      CameraCustom.initDevice(
        body,
        (res:any) => {
          //this.bitmap=res;
          //this.createdCode=res;
          //alert(JSON.stringify(res))
        },
        (err:any) => {
          // alert(JSON.stringify(err))
          // alert("4 error")
        }
      );
    }
  }

  getTuyahome() {
    console.log("testing8-1");
    CameraCustom.home(
      "body",
      (res:any) => {
        console.log("testing8");
        console.log(res);
        console.log(JSON.stringify(res));
        let temp = res.substring(6);
        this.user.homeId = temp;
        //alert("Tuya homeIdRes:" + JSON.stringify(res));
        //alert("Tuya homeIdRes:" + JSON.stringify(this.user.homeId));
        this.getTuyaDevices();
      },
      (err:any) => {
        console.log("testing8-2");
        console.log(JSON.stringify(err));
        alert("TuyaHomeIdError:" + JSON.stringify(err));
      }
    );
  }
  getTuyaDevices() {
    console.log("testing9-1");
    CameraCustom.devicelist(
      "body",
      (res:any) => {
        console.log("testing9");
        console.log(res);
        console.log(JSON.stringify(res));
        this.zone.run(() => {
          this.user.tuyaDevices = res;
          for (let i = 0; i < this.user.tuyaDevices.length; i++) {
            if (this.user.tuyaDevices[i]["category"] != "dj") {
              this.tuya_security_lock.push(this.user.tuyaDevices[i]);
            }
          }
          if (this.tuya_security_lock.length > 0) {
            this.zone.run(() => {
              for (var i = 0; i < this.tuya_security_lock.length; i++) {
                this.allDevices.push({
                  type: "tuya",
                  item: this.tuya_security_lock[i],
                });
              }
            });
          }
        });

        console.log(JSON.stringify(this.user.tuyaDevices));
        //alert("abcd List"+JSON.stringify(this.user.tuyaDevices))
      },
      (err:any) => {
        console.log("testing9-2");
        console.log(JSON.stringify(err));
        alert("TuyaListError:" + JSON.stringify(err.error));
      }
    );
  }

  goToTuyaSettings(name:any, icon:any, id:any) {
    // alert(name)
    this.user.tuyaDeviceName = name;
    this.user.tuyaDeviceIcon = icon;
    this.user.tuyaDeviceId = id;
    let body = { id: id };
    CameraCustom.findDeviceType(
      body,
      (res:any) => {
        if (res == "camera") {
          this.navCtrl.navigateRoot("/camFunc");
        } else if (res == "lock") {
          this.navCtrl.navigateRoot("/lockFunc");
        }
      },
      (err:any) => {}
    );
  }

  gatewayList() {
    // this.login();
    var d = new Date();
    var n = d.getTime();
    var x = n;
    //console.log(n);
    let TTtoken = localStorage.getItem("TTtoken")??"";
    // alert("t"+ TTtoken)
    const params = new HttpParams({
      fromObject: {
        clientId: "7a614fea8d6f427caa982e9a1aa6afc1",
        accessToken: TTtoken,
        pageNo: "1",
        pageSize: "20",
        date: JSON.stringify(x),
      },
    });

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            "7a614fea8d6f427caa982e9a1aa6afc1" +
              ":" +
              "SECRET_CONFIGURE_ON_BACKEND"
          ),
        "Access-Control-Allow-Origin": "*",
      }),
    };
    this.user.present("loading...");
    this.authService.tTlockGateway_list(params).subscribe(
      (res) => {
        this.user.dismiss();
        this.gatewayList2 = res;
        this.gatewayList1 = JSON.stringify(this.gatewayList2.list[0].gatewayId);
        this.gatewaylistLock();
      },
      (error) => {
        this.user.dismiss();
        this.user.showToast(JSON.stringify(error.error));
      }
    );
  }

  gatewaylist12:any;
  gatewaylist13:any;
  gatewaylistLock() {
    // alert(this.gatewayList1);
    // this.login();
    var d = new Date();
    var n = d.getTime();
    var x = n;
    //console.log(n);
    let TTtoken = localStorage.getItem("TTtoken")??"";
    // alert("t"+ TTtoken)
    const params = new HttpParams({
      fromObject: {
        clientId: "7a614fea8d6f427caa982e9a1aa6afc1",
        accessToken: TTtoken,
        gatewayId: this.gatewayList1,
        date: JSON.stringify(x),
      },
    });

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            "7a614fea8d6f427caa982e9a1aa6afc1" +
              ":" +
              "SECRET_CONFIGURE_ON_BACKEND"
          ),
        "Access-Control-Allow-Origin": "*",
      }),
    };
    this.user.present("loading...");
    this.authService.tTlockGateway_gatewayList(params).subscribe(
      (res) => {
        this.user.dismiss();

        this.gatewaylist12 = res;
        this.gatewaylist13 = this.gatewaylist12.list;
        if (this.gatewaylist13.length > 0) {
          this.zone.run(() => {
            for (var i = 0; i < this.gatewaylist13.length; i++) {
              this.allDevices.push({
                type: "gateway",
                item: this.gatewaylist13[i],
              });
            }
          });
        }
        this.navCtrl.navigateRoot("/ttgatewayoperation");
      },
      (error) => {
        this.user.dismiss();
        this.user.showToast(JSON.stringify(error.error));
      }
    );
  }

  // gatwaylockid;
  ttGateWayLockClick(g_id:any, g_mac:any, g_name:any, g_alias:any) {
    // alert(g_id);
    // alert(g_mac);
    // alert(g_name);
    this.user.gatewaylockid = g_id;
    this.user.gatewaylockMac = g_mac;
    this.user.gatewaylockName = g_name;
    this.navCtrl.navigateRoot("/ttgatewayoperation");
  }
  mainpage() {
    this.navCtrl.navigateRoot("/mainpage");
  }
  favpage() {
    this.navCtrl.navigateRoot("/favlist");
  }
  rgbpage() {
    this.navCtrl.navigateRoot("/rgb-list");
  }
  modepage() {
    this.navCtrl.navigateRoot("/mode");
  }
  allDevicesClick(d:any) {
    if (d.type == "ttlock") {
      this.ttLockClick(d.item.lockId, d.item.lockData, d.item.lockMac);
    } else if (d.type == "gateway") {
      this.ttGateWayLockClick(
        d.item.lockId,
        d.item.lockMac,
        d.item.lockName,
        d.item.lockAlias
      );
    } else if (d.type == "tuya") {
      this.goToTuyaSettings(d.item.name, d.item.icon, d.item.id);
    } else if (d.type == "lock") {
      this.ttLockClick(d.item.lockId, d.item.lockData, d.item.lockMac);
    }
  }
}
