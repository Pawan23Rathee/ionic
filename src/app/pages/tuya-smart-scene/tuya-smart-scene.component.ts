import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Geolocation } from "@awesome-cordova-plugins/geolocation/ngx";
declare var CameraCustom:any;
@Component({
  selector: "app-tuya-smart-scene",
  templateUrl: "./tuya-smart-scene.component.html",
  styleUrls: ["./tuya-smart-scene.component.scss"],
})
export class TuyaSmartSceneComponent implements OnInit {
  lat: any;
  lang: any;

  constructor(private user: UserService, private geolocation: Geolocation) {}

  ngOnInit() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.lat = resp.coords.latitude;
        this.lang = resp.coords.longitude;
        //alert(lat +"         "+lang)
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
  }
  getConditionList() {
    let body = { homeId: this.user.homeId };
    CameraCustom.getConditionList(
      body,
      (res:any) => {
        //this.bitmap=res;
        //this.createdCode=res;
        this.user.showToast(res);
        //alert(res)
      },
      (err:any) => {
        alert(JSON.stringify(err));
        //alert("4 error")
      }
    );
  }
  createTempCondition() {
    let body = { lat: this.lat, lang: this.lang };
    CameraCustom.createTempCondition(
      body,
      (res:any) => {
        this.user.showToast(res);
        //alert(res) ;
        //this.bitmap=res;
        //this.createdCode=res;
      },
      (err:any) => {
        alert(JSON.stringify(err));
        //alert("4 error")
      }
    );
  }
  getDeviceTaskOperationList() {
    var body = {
      homeId: this.user.homeId,
      devicelist: this.user.tuyaDevices[0].id,
    };
    CameraCustom.getDeviceTaskOperationList(
      body,
      (res:any) => {
        //this.bitmap=res;
        //this.createdCode=res;
        this.user.showToast(res);
        //alert(res)
      },
      (err:any) => {
        alert(JSON.stringify(err));
        //alert("4 error")
      }
    );
  }
  createDevCondition() {
    let body = {
      homeId: this.user.homeId,
    };
    CameraCustom.createDevCondition(
      body,
      (res:any) => {
        this.user.showToast(res);
        //alert(res)
      },
      (err:any) => {
        alert(JSON.stringify(err));
        //alert("4 error")
      }
    );
  }

  createTimerCondition() {
    let body = {
      homeId: this.user.homeId,
    };
    CameraCustom.createTimingCondition(
      body,
      (res:any) => {
        this.user.showToast(res);
        //alert(res)
      },
      (err:any) => {
        alert(JSON.stringify(err));
        //alert("4 error")
      }
    );
  }
  createSceneTask() {
    var body = {
      devicelist: this.user.tuyaDevices[0].id,
    };
    CameraCustom.createSceneTask(
      body,
      (res:any) => {
        this.user.showToast(res);
        //alert(res)
      },
      (err:any) => {
        alert(JSON.stringify(err));
        //alert("4 error")
      }
    );
  }
  getDeviceConditionOperationList() {
    var body = {
      devicelist: this.user.tuyaDevices[0].id,
    };
    CameraCustom.getDeviceConditionOperationList(
      body,
      (res:any) => {
        this.user.showToast(res);
        //alert(res)
      },
      (err:any) => {
        alert(JSON.stringify(err));
        //alert("4 error")
      }
    );
  }
  createScene() {
    let body = {
      homeId: this.user.homeId,
      devicelist: this.user.tuyaDevices[0].id,
    };
    CameraCustom.createScene(
      body,
      (res:any) => {
        this.user.showToast(res);
        //alert(res)
      },
      (err:any) => {
        this.user.showToast(err);
        //  alert(JSON.stringify(err))
        //  alert("4 error")
      }
    );
  }
  modifyScene() {
    let body = {
      homeId: this.user.homeId,
    };
    CameraCustom.modifyScene(
      body,
      (res:any) => {
        this.user.showToast(res);
        //alert(res)
      },
      (err:any) => {
        alert(JSON.stringify(err));
        //alert("4 error")
      }
    );
  }
  deleteScene() {
    let body = {
      homeId: this.user.homeId,
    };
    CameraCustom.deleteScene(
      body,
      (res:any) => {
        this.user.showToast(res);
        //alert(res)
      },
      (err:any) => {
        alert(JSON.stringify(err));
        //alert("4 error")
      }
    );
  }
  executeScene() {
    let body = {
      homeId: this.user.homeId,
    };
    CameraCustom.executeScene(
      body,
      (res:any) => {
        this.user.showToast(res);
        //alert(res)
      },
      (err:any) => {
        alert(JSON.stringify(err));
        //alert("4 error")
      }
    );
  }
  menu(){}
}
