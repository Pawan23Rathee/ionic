import { Component, OnInit, NgZone } from "@angular/core";
import { NavController } from "@ionic/angular";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";

declare var WifiWizard2: any;
declare var espTouchSmartconfig: any;
@Component({
  selector: "app-smart-config",
  templateUrl: "./smart-config.component.html",
  styleUrls: ["./smart-config.component.scss"],
})
export class SmartConfigComponent implements OnInit {
  wifiSSID: string = "";
  wifiBSSID: string = "";
  selectWifiDetails: boolean = true;
  selectDeviceType: boolean = false;
  mac_id: string = "";
  device_type: string = "";
  allDeviceTypes = [
    ["1 relay", "A_type"],
    ["2 relay", "B_type"],
    ["3 relay", "C_type"],
    ["4 relay", "D_type"],
    ["5 relay", "E_type"],
    ["Touch 1", "F_type"],
    ["Touch 2", "G_type"],
    ["Touch 3", "H_type"],
    ["Touch 4", "I_type"],
    ["Touch 5", "J_type"],
    ["Touch 6", "K_type"],
    ["Touch 7", "L_type"],
    ["Touch 8", "M_type"],
    ["Ir blaster", "N_type"],
    ["Curtain", "O_type"],
    ["Doorlock", "P_type"],
    ["Dimmer", "Q_type"],
    ["Water Device","W_type"]
  ];
  device_id: string = "";
  device_pi_id: string = "";
  constructor(
    private auth: AuthService,
    public user: UserService,
    public navCtrl: NavController,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    WifiWizard2.getConnectedSSID().then((ssid:any) => {
      this.wifiSSID = ssid;
    });
    WifiWizard2.getConnectedBSSID().then((bssid:any) => {
      this.wifiBSSID = bssid;
    });
  }
  getwifidetail() {
    let ssid = prompt("WIFI NAME:", this.wifiSSID);
    if (ssid == null || ssid == "") {
      alert("Please Enter WIFI Name");
    } else {
      let password = prompt("WIFI Password:", "");
      if (password == null || password == "") {
        alert("Please Enter WIFI passowrd");
      } else {
        this.user.present("Connecting to smart equipment");
        espTouchSmartconfig.start(
          ssid,
          this.wifiBSSID,
          password,
          1,
          1,
          "",
          (res:any) => {
            //alert(res);
            this.ngZone.run(() => {
              this.selectWifiDetails = false;
              this.selectDeviceType = true;
              this.user.dismiss();
              console.log(res);
              var parsedData = JSON.parse(res);
              this.mac_id = parsedData[0]["bssid"];
            });
          },
          (err:any) => {
            this.user.dismiss();
            // Errorcallback
            console.log(err);
          }
        );
      }
    }
  }
  async adddeviceinroom() {
    this.user.todayArr = this.device_id;
    console.log(this.user.todayArr);
    //this.user.showToast(this.user.todayArr);
    this.user.dismiss();
    this.navCtrl.navigateRoot("/devices");
  }
  submitdevice() {
    if (this.device_type == "") {
      alert("Please select a device type");
      return;
    }
    this.user.present("Sending details to the server");
    var body = {
      type: this.device_type,
      mac_id: this.mac_id,
    };
    console.log(JSON.stringify(body));
    this.auth.smartConfig(body).subscribe((res1:any) => {
      
        console.log(JSON.stringify(res1));
        //this.user.showToast(res1);
        this.device_pi_id = res1["data"]["pi_id"];
        console.log(this.device_pi_id);

        this.auth.qrCode(this.device_pi_id).subscribe((res) => {

          this.auth
            .getdevicemoduletoaddinroom(this.device_pi_id)
            .subscribe((res:any) => {
              //this.user.showToast(JSON.stringify(res[0].pi_id));
              console.log(this.device_id);
              console.log(res);
              //console.log(this.module_name);
              //this.modulepi_id = res[0].pi_id;
              console.log(res[0].name);
              // this.adddeviceinroom();
              if(this.device_pi_id.startsWith('W')){
                this.navCtrl.navigateRoot("/waterlist");
              }else 
              if (
                res[0].name == "Single" ||
                res[0].name == "Double" ||
                res[0].name == "Triple" ||
                res[0].name == "Quad" ||
                res[0].name == "Pent" ||
                res[0].name == "Touch5" ||
                res[0].name == "Touch6" ||
                res[0].name == "Touch7" ||
                res[0].name == "Touch8" ||
                res[0].name == "Touch9" ||
                res[0].name == "Touch10" ||
                "Curtain" ||
                "Touch2" ||
                "Touch4"
              ) {
                console.log("you selected" + res[0].name);
                this.user.dd_name = res[0].name;
                //this.modulepi_id = res[0].pi_id;
                //console.log(this.modulepi_id);
                this.adddeviceinroom();
              } else if (res[0].name == "Tam_Remote") {
                this.user.dd_name = res[0].name;
                this.user.moduleIdForKey = res[0].id;
                this.user.module_piId = res[0].id;
                {
                  this.user.dismiss();
                  this.navCtrl.navigateRoot("/ir-product");
                }
              } else if (res[0].name == "Mood_Lighting") {
                this.user.dd_name = res[0].name;
                this.user.moodDevice_id = res[0].id;
                {
                  this.user.dismiss();
                  this.navCtrl.navigateRoot("/devices");
                }
              } 
            });
        });
      
    },err=>{
      console.log(JSON.stringify(err));
      console.log("status");
      console.log(err["error"]["status"]);
      console.log("message");
      console.log(err["error"]["message"]);
      if (
        err["error"]["status"] == "ERROR" &&
        err["error"]["message"].includes("already exists")
      ) {
        this.auth.getPiId(this.mac_id).subscribe((res2:any) => {
          console.log(JSON.stringify(res2));
          //this.user.showToast(res1);
          this.device_pi_id = res2["data"]["pi_id"];
          console.log(this.device_pi_id);

          this.auth.qrCode(this.device_pi_id).subscribe((res) => {
            this.auth
              .getdevicemoduletoaddinroom(this.device_pi_id)
              .subscribe((res:any) => {
                //this.user.showToast(JSON.stringify(res[0].pi_id));
                console.log(this.device_id);
                console.log(res);
                //console.log(this.module_name);
                //this.modulepi_id = res[0].pi_id;
                console.log(res[0].name);
                // this.adddeviceinroom();
                if (this.device_pi_id.startsWith("W")) {
                  this.navCtrl.navigateRoot("/waterlist");
                } else if (
                  res[0].name == "Single" ||
                  res[0].name == "Double" ||
                  res[0].name == "Triple" ||
                  res[0].name == "Quad" ||
                  res[0].name == "Pent" ||
                  res[0].name == "Touch5" ||
                  res[0].name == "Touch6" ||
                  res[0].name == "Touch7" ||
                  res[0].name == "Touch8" ||
                  res[0].name == "Touch9" ||
                  res[0].name == "Touch10" ||
                  "Curtain" ||
                  "Touch2" ||
                  "Touch4"
                ) {
                  console.log("you selected" + res[0].name);
                  this.user.dd_name = res[0].name;
                  //this.modulepi_id = res[0].pi_id;
                  //console.log(this.modulepi_id);
                  this.adddeviceinroom();
                } else if (res[0].name == "Tam_Remote") {
                  this.user.dd_name = res[0].name;
                  this.user.moduleIdForKey = res[0].id;
                  this.user.module_piId = res[0].id;
                  {
                    this.user.dismiss();
                    this.navCtrl.navigateRoot("/ir-product");
                  }
                } else if (res[0].name == "Mood_Lighting") {
                  this.user.dd_name = res[0].name;
                  this.user.moodDevice_id = res[0].id;
                  {
                    this.user.dismiss();
                    this.navCtrl.navigateRoot("/devices");
                  }
                }
              });
          });
        });
      } else {
        this.user.dismiss();
        alert(JSON.stringify(err));
      }
    });
  }
  backbutton() {
    this.user.showDevice = false;
    this.user.showRoom = true;
  }
}
