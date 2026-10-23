import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
// import { Key } from 'protractor';
import { DOCUMENT } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
//import {Response} from '';
//import 'rxjs/add/operator/map';


@Injectable({
  providedIn: "root",
})
export class AuthService {
  // URL = 'https://cors-anywhere.herokuapp.com/http://13.127.176.213:4000/';

  // URL = 'http://52.66.67.111:4000/';
  // URL = 'http://3.6.190.10:4000/';
  //  URL = 'http://13.127.176.213:4000/';
  // URL = 'https://dyfolite.dyfolabs.com:13000/';
  //  URL = 'http://13.127.176.213:4000/';
  URL = "https://dyfolite.dyfolabs.com/";
  // URL = 'http://3.6.190.10:8007';

  url = "http://cors.dyfolabs.com/api.ttlock.com/";
  isLoggedIn = false;
  token: any;
  home_name: any;
  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private _document: Document,
    public user: UserService
  ) { }

  isAuthenticated(): any {
    let token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  loginUser(b: any): Observable<any> {
    console.log(b);
    console.log(b.get("username"));
    let headers = new HttpHeaders();
    console.log("login6");
    headers.append("Content-Type", "application/json ");
    console.log("login7");
    return this.http
      .post(this.URL + "api/register/login/", b, { headers: headers })
      .pipe(
        tap((res: any) => {
          //alert(JSON.stringify(res));
          //alert(res["token"]);
          let token = localStorage.setItem("token", res["token"]);
          console.log(res["token"]);
        }),
        catchError((err) => {
          if (err.status === 422) {
            alert("Unable to login with the provided credentials");
          } else {
            alert(err.statusText);
          }

          return throwError(err);
        })
      );
  }

  sendOtp(b: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json ");
    console.log(b);
    console.log(typeof b);
    return this.http
      .post(this.URL + "api/register/verifyotp/", b, { headers: headers })
      .pipe(tap((res) => { }));
  }

  sendDetails(body: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json ");
    console.log(body);
    console.log(typeof body);
    return this.http
      .post(this.URL + "api/register/register/", body, { headers: headers })
      .pipe(tap((res) => { }));
  }

  uploadProfileImg(imgData: any) {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    let body: FormData = new FormData();
    body.append("image", imgData, "profile.jpg");
    return this.http
      .post(this.URL + "api/user_profile/create/", body, { headers: headers })
      .pipe(tap((res) => { }));
  }

  getProfileImg() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    this.http
      .get(this.URL + "api/user_profile/get/", { headers: headers })
      .pipe(tap((res) => { }))
      .subscribe(
        (img: any) => {
          let profImg = img[0].image.replace("https", "http");
          profImg = img[0].image.replace("http", "https");
          // alert(profImg);
          localStorage.setItem("pof_img", profImg);
        },
        (err) => alert(JSON.stringify(err))
      );
  }
  userProfile() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/register/account/", { headers: headers })
      .pipe(tap((res) => { }));
  }

  updateAdminProfile(body: any) {
    console.log(body);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .patch(this.URL + "api/register/account/", body, { headers: headers })
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }
  getLogoutFromApi() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/register/logout/", { headers: headers })
      .pipe(tap((res) => { }));
  }
  getToEditRoomInfo(roomName: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/room/room/?name=" + roomName, { headers: headers })
      .pipe(tap((res) => { }));
  }
  editRoomInfo(id: any, name: any) {
    console.log(id);
    console.log(name);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    let body = {
      name: name,
    };
    return this.http
      .put(this.URL + "api/room/room/" + id + "/", body, { headers: headers })
      .pipe(tap((res) => { }));
  }
  getModuleFromApi() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/device/modules/", { headers: headers })
      .pipe(tap((res) => { }));
  }
  switchWifiForModule(id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    let body = {
      module_id: id,
    };
    return this.http
      .post(this.URL + "api/device/switch/wifi/", body, { headers: headers })
      .pipe(tap((res) => { }));
  }
  qrCode(b: any): Observable<any> {
    //this.user.showToast(b);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    console.log(token);
    const body = {
      qr_code: b,
    };
    return this.http.post(this.URL + "api/qr_code/qr/", body, {
      headers: headers,
    });
  }

  showAllAddedDevicesScheduler(id: any) {
    console.log(id);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http.get(this.URL + "api/device/status/all/?id=" + id, {
      headers: headers,
    });
  }
  showAllAddedDevices() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http.get(this.URL + "api/device/status/all/", {
      headers: headers,
    });
  }
  showaddedDevices(id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http.get(this.URL + "api/device/status/all/?id=" + id, {
      headers: headers,
    });
  }
  devicesForModule(pi_id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http.get(
      this.URL + "api/device/status/all/?device__pi_id__pi_id=" + pi_id,
      { headers: headers }
    );
  }
  createRoom(name: any, type: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    let body = {
      name: name,
      room_type: type,
    };
    return this.http.post(this.URL + "api/room/room/", body, {
      headers: headers,
    });
  }
  setMinMax(id: any, min: any, max: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    let body = {
      maximum: max,
      minimum: min,
    };
    return this.http.put(this.URL + "api/device/min_max/" + id + "/", body, {
      headers: headers,
    });
  }
  setDeviceName(id: any, deviceType: any, name: any) {
    console.log(id);
    console.log(name);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    let body = {
      name: name,
      device_type: deviceType,
    };
    return this.http.put(this.URL + "api/device/name/" + id + "/", body, {
      headers: headers,
    });
  }
  savedChangedRoom(id: any, device: any) {
    console.log("rooom_id" + id);
    console.log("device_id" + device);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    let body = JSON.stringify({
      device: parseInt(device),
      room: id,
    });
    return this.http
      .post(this.URL + "api/room/room/device/", body, { headers: headers })
      .pipe(tap((res) => { }));
  }
  checkForRoom(pi_id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http.get(
      this.URL + "api/ir_blaster/check/room/?pi_id__id=" + pi_id,
      { headers: headers }
    );
  }
  getRoomFromApi() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/room/room/", { headers: headers })
      .pipe(tap((res) => { }));
  }
  getDeviceFromApi(roomName: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/room/room/device/?room__name=" + roomName, {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }
  getDeviceStatus(id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/device/status/all/?id=" + id, { headers: headers })
      .pipe(tap((res) => { }));
  }
  changeStatuswithCheck(id: any, a: any) {
    //alert("switching on/off");
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    let body = JSON.stringify({
      status: a,
    });
    console.log(body);
    return this.http
      .put(this.URL + "api/device/status/" + id + "/", body, {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }
  putDimmerValueFromApi(id: any, setdimmer: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    let body = JSON.stringify({
      dimmer: setdimmer,
    });
    return this.http
      .put(this.URL + "api/device/status/" + id + "/", body, {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }
  deleteRoom(id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .delete(this.URL + "api/room/room/" + id + "/", { headers: headers })
      .pipe(tap((res) => { }));
  }
  getDimmerStatusApi(id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/device/min_max/all/?id=" + id, { headers: headers })
      .pipe(tap((res) => { }));
  }

  putdeletedevice(id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .delete(this.URL + "api/room/room/device/" + id + "/", {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }
  // <---------------IR blaster All API started from here------>

  getIRproductApi() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/remote/product/", { headers: headers })
      .pipe(tap((res) => { }));
  }

  getIRcompanyApi(id: any) {
    console.log("auth" + id);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/remote/company/?product_name__id=" + id, {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }

  getIRCompanyRemoteApi(productid: any, companyid: any) {
    console.log("auth_companyid" + companyid);
    console.log("auth_productid" + productid);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(
        this.URL +
        "api/remote/key/?product_name__id=" +
        productid +
        "&company_name__id=" +
        companyid,
        { headers: headers }
      )
      .pipe(tap((res) => { }));
  }
  remoteForAc(productid: any, companyid: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(
        this.URL +
        "api/remote/ac/?product_name__id=" +
        productid +
        "&company_name__id=" +
        companyid,
        { headers: headers }
      )
      .pipe(tap((res) => { }));
  }
  saveRemote(remoteId: any, pi_id: any, roomId: any):Observable<any>{
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    if (!remoteId || !pi_id || !roomId) {
      return of(null); // Return an observable with null if any of the required values is missing
    }
    if (this.user.checkForAcRemote != 2) {
      let body = {
        remote: remoteId,
        room: roomId,
        pi_id: pi_id,
      };
      console.log(JSON.stringify(body));
      return this.http.post(this.URL + "api/ir_blaster/device/", body, {
        headers: headers,
      });
    }
    if (this.user.checkForAcRemote == 2) {
      let body = {
        ac_remote: remoteId,
        room: roomId,
        pi_id: pi_id,
      };
      console.log(JSON.stringify(body));
      return this.http.post(this.URL + "api/ir_blaster/device/", body, {
        headers: headers,
      });
    }
    return of(null);
    //console.log(body)
    //return this.http.post(this.URL + 'api/ir_blaster/device/', body, { headers: headers });
  }
  pressKey(key_id: any, name: any, module_id: any): Observable<any> {
    console.log(key_id);
    console.log(name);
    console.log(module_id);
    if (!key_id || !name || !module_id) {
      return of(null); // Return an observable with null if any of the required values is missing
    }
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    if (this.user.productName != "AC") {
      console.log(this.user.productName);
      let body = {
        key_id: key_id,
        button_name: name,
        module_id: module_id,
      };
      return this.http.post(this.URL + "api/ir_blaster/press/", body, {
        headers: headers,
      });
    }
    if (this.user.productName == "AC") {
      console.log(this.user.productName);
      let body = {
        // "ac_key_id": key_id,
        // "button_name": name,
        // "module_id": module_id

        module_id: module_id,
        button_name: name,
        ac_key_id: key_id,
      };
      return this.http.post(this.URL + "api/ir_blaster/press/", body, {
        headers: headers,
      });
    }
    return of(null);
  }

  showAddedIRModule() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/ir_blaster/module/", { headers: headers })
      .pipe(tap((res) => { }));
  }
  getAllSavedRemoteForRoom(roomName: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/ir_blaster/device/?room__name=" + roomName, {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }

  del_ir_devicefromrum(irid: any) {
    console.log(irid);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .delete(this.URL + "api/ir_blaster/device/" + irid + "/", {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }

  // -----------Mood Lighting API

  getshowAddedMoodDevice() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/mood_lighting/module/", { headers: headers })
      .pipe(tap((res) => { }));
  }

  postmooddevice(room: any, pi_id: any) {
    console.log("moodroom_id" + room);
    console.log("moodpi_id" + pi_id);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    let body = {
      room: room,
      pi_id: pi_id,
    };
    return this.http.post(this.URL + "api/mood_lighting/device/", body, {
      headers: headers,
    });
  }

  getAddedMoodDevices(roomName: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/mood_lighting/device/?room__name=" + roomName, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          //console.log(res)
        })
      );
  }
  putColorCodeFromApi(id: any, colorcode: any) {
    console.log(id);
    console.log(colorcode);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    let body = JSON.stringify({
      color_code: colorcode,
    });
    return this.http
      .put(this.URL + "api/mood_lighting/update/color/" + id + "/", body, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }

  putMoodTypeFromApi(id: any, moodtype: any) {
    console.log(id);
    console.log(moodtype);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    let body = JSON.stringify({
      type: moodtype,
    });
    return this.http
      .put(this.URL + "api/mood_lighting/update/type/" + id + "/", body, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }

  deleteMoodDevicefromRoom(id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .delete(this.URL + "api/mood_lighting/delete/" + id + "/", {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }

  getAllMode() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/mode/mode/", { headers: headers })
      .pipe(tap((res) => { }));
  }
  getAllDevForModes() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http.get(this.URL + " api/mode/all/devices/", {
      headers: headers,
    });
  }

  getDevForMode(mode_id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/mode/mode/device/?mode__id=" + mode_id, {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }

  createMode(name: any) {
    let token = localStorage.getItem("token");
    let body = { name: name };
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .post(this.URL + "api/mode/create/mode/", body, { headers: headers })
      .pipe(tap((res) => { }));
  }

  addModeDevices(deviceDetail: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    if (deviceDetail.dimmer !== null) {
      let dimBody = {
        dimmer: deviceDetail.dimmer,
        device: deviceDetail.device,
        mode: deviceDetail.mode,
        status: deviceDetail.status,
      };
      return this.http
        .post(this.URL + "api/mode/device/both/", dimBody, { headers: headers })
        .pipe(tap((res) => { }));
    } else {
      //alert('nooooooo'+deviceDetail.dimmer)
      let devBody = {
        device: deviceDetail.device,
        mode: deviceDetail.mode,
        status: +deviceDetail.status,
      };
      return this.http
        .post(this.URL + "api/mode/device/status/", devBody, {
          headers: headers,
        })
        .pipe(tap((res) => { }));
    }
  }
  mode_dimmer(d: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    let dim_Body = {
      mode: d.mode,
      device: d.device,
      dimmer: d.dimmer,
    };
    return this.http
      .post(this.URL + "api/mode/device/dimmer/", dim_Body, {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }

  del_Mod(id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .delete(this.URL + "api/mode/delete/" + id + "/", { headers: headers })
      .pipe(tap((res) => { }));
  }
  del_Mod_device(id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .delete(this.URL + "api/mode/device/delete/" + id + "/", {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }
  activateMode(id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    console.log(JSON.stringify(headers) + id);
    let body = {};
    return this.http
      .put(this.URL + "api/mode/activate/" + id + "/", body, {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }

  refreshPage() {
    this._document?.defaultView?.location.reload();
  }

  lockQR(snInfo: any) {
    let body = {
      qr_code: snInfo,
    };
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);

    return this.http
      .post(this.URL + "api/qr_code/lock/qr/", body, { headers: headers })
      .pipe(tap((res) => { }));
  }

  addLockInRoom(lockId: any, roomId: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    let body = {
      room: roomId,
    };
    return this.http
      .put(this.URL + "api/device/lock/update/" + lockId + "/", body, {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }

  getLocks() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/device/lock/", { headers: headers })
      .pipe(tap((res) => { }));
  }

  recordLockActivity(id: any, lockStatus: any) {
    let body = {
      lock: id,
      status: lockStatus,
    };
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);

    return this.http
      .post(this.URL + "api/device/lock/history/create/", body, {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }

  getLockRecord(lockId: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/device/lock/history/?lock__id=" + lockId, {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }

  deleteRecord(id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .delete(this.URL + "api/device/lock/history/" + id + "/", {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }
  deleteAllRecords(lock_id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .delete(this.URL + "api/device/lock/history/all/" + lock_id + "/", {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }

  deleteLock(lock_id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .delete(this.URL + "api/device/lock/" + lock_id + "/", {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }

  //---------------- Door Lock API ------------//

  getDoorLockModuleApi() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/device/door_lock/modules/", { headers: headers })
      .pipe(tap((res) => { }));
  }

  getDoorStatus(device_pi_id_pi_id: any) {
    // console.log("idauth"+ id);
    // console.log("authpi"+ device_pi_id_pi_id)
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(
        this.URL +
        "api/device/door_lock/status/all/?device_pi_id_pi_id=" +
        device_pi_id_pi_id,
        { headers: headers }
      )
      .pipe(tap((res) => { }));
  }

  //-----------------Device Scheduler start from here ------//
  getDeviceforSchedularfromApi() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/scheduler/get/", { headers: headers })
      .pipe(tap((res) => { }));
  }

  postDeviceSchedularFromApi(sdevice: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    let body = {
      name: sdevice.name,
      is_daily: sdevice.is_daily,
      is_enabled: true,
      on_time: sdevice.on_time,
      off_time: sdevice.off_time,
      device: sdevice.device,
    };
    return this.http
      .post(this.URL + "api/scheduler/create/", body, { headers: headers })
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }

  del_ScheduledDevice(id: any) {
    console.log("authdeleteschedule_device_id" + id);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .delete(this.URL + "api/scheduler/delete/" + id + "/", {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }
  //--------- ended scheduler api-----//

  forguestUser(body: any) {
    console.log(body);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);

    return this.http
      .post(this.URL + "api/guest/create/", body, { headers: headers })
      .pipe(tap((res) => { }));
  }

  guestforqrlogin(body: any) {
    console.log(body);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);

    return this.http
      .post(this.URL + "api/qr_code/qr/", body, { headers: headers })
      .pipe(tap((res) => { }));
  }

  //----- get module pi id for device status--------//
  putdevicestatus(roomid: any) {
    console.log("roomid_for_offline_online_sttaus:" + roomid);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    let body = {
      room_id: roomid,
    };
    return this.http
      .put(this.URL + "api/room/pi/status/", body, { headers: headers })
      .pipe(tap((res) => { }));
  }

  getdeviceinroombyRoomid(room_id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/room/room/?id=" + room_id, { headers: headers })
      .pipe(tap((res) => { }));
  }
  getdevicemoduletoaddinroom(pi_id: any) {
    console.log(pi_id);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/device/modules/?pi_id__pi_id=" + pi_id, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }

  postIrcompanyproduct(body: any) {
    console.log(body);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);

    return this.http
      .post(this.URL + "api/remote/add/", body, { headers: headers })
      .pipe(tap((res) => { }));
  }

  postIrbuttondata(body: any) {
    console.log(body);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);

    return this.http
      .post(this.URL + "api/remote/add/data/", body, { headers: headers })
      .pipe(tap((res) => { }));
  }

  adddeviceinfav(body: any) {
    console.log(body);
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);

    return this.http
      .post(this.URL + "api/favourite/add/", body, { headers: headers })
      .pipe(tap((res) => { }));
  }

  getfavlist() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/favourite/favourite/", { headers: headers })
      .pipe(tap((res) => { }));
  }

  deleteFavDevice(id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .delete(this.URL + "api/favourite/delete/" + id + "/", {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }
  // -----------------forget password....-------------------//
  /*   
  1. i have to use https://dyfolite.dyfolabs.com/api/register/email/ashish@dyfolabs.com/ this api to get user_id serial number then
  2. i have to use https://dyfolite.dyfolabs.com/api/register/verifyotp/ to get OTP 
  3.  I have to use same api to verify otp which use will be submit https://dyfolite.dyfolabs.com/api/register/verifyotp/ in this api i have to send email and verify_otp . this api will use to verify otp only 
   4.  In last i have to use https://dyfolite.dyfolabs.com/api/register/forget/ api to update password , I have to send email and new password
  */

  check_User(mail_id: any) {
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");

    return this.http
      .get(this.URL + "api/register/email/" + mail_id + "/", {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }

  submit_New_Pass(body: any) {
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");

    return this.http
      .put(this.URL + "api/register/forget/", body, { headers: headers })
      .pipe(tap((res) => { }));
  }

  //------********* get Room number and running devices ****//
  getDeviceNumber() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/device/stats/", { headers: headers })
      .pipe(tap((res) => { }));
  }

  //        "client_id":"AMAZON_CLIENT_ID_PLACEHOLDER" ,
  //"client_secret":"SECRET_CONFIGURE_ON_BACKEND"

  getAccessTokenForAmazon(amazonAuthCode: any): Observable<any> {
    // OAuth token exchange must be implemented by a secure backend.
    throw new Error(
      "Amazon OAuth token exchange requires backend configuration."
    );
  }

  enableAlexaLinking(amazonAccessToken: any, ourAuthCode: any) {
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append(
      "Authorization",
      "Bearer" + " " + amazonAccessToken
    );
    let skillId = "amzn1.ask.skill.207fc274-f9f6-4a0b-ab34-e2b1cf24e9c8";
    let body = {
      stage: "live",
      accountLinkRequest: {
        redirectUri: "https://dyfolabs.com/",
        authCode: ourAuthCode,
        type: "AUTH_CODE",
      },
    };
    let herkou = "https://cors-anywhere.herokuapp.com/";
    let enableUrl =
      "https://cors-anywhere.herokuapp.com/https://api.eu.amazonalexa.com/v1/users/~current/skills/" +
      skillId +
      "/enablement";
    return this.http
      .post(enableUrl, body, { headers: headers })
      .pipe(tap((res) => { }));
  }

  openappfromgoogle() {
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    let clientId = "zB8O5UaR7B3tIM3JxUAscmy5Q1h6QTX9";
    let enableUrl =
      "https://cors-anywhere.herokuapp.com/https://dev-2yui1jec.us.auth0.com/authorize?client_id=" +
      clientId +
      "&redirect_uri=https://oauth-redirect.googleusercontent.com/r/dyfo-lite-e7b2e&state=dyfolabs&response_type=code&user_locale=en";
    return this.http
      .get(enableUrl, { headers: headers })
      .pipe(tap((res) => { }));
  }
  //*******************Energy Apis *********Started.. */
  getDeviceFromApiEnergy() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/room/room/devices/", { headers: headers })
      .pipe(tap((res) => { }));
  }

  getTodayEnergyFromApi(d_Id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/device/get-hours-by-day/?days=7&device_id=" + d_Id, {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }
  getWeeklyEnergyFromApi(d_Id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(
        this.URL + "api/device/get-hours-by-week/?days=7&device_id=" + d_Id,
        { headers: headers }
      )
      .pipe(tap((res) => { }));
  }
  getMonthlyEnergyFromApi(d_Id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(
        this.URL + "api/device/get-hours-by-month/?days=7&device_id=" + d_Id,
        { headers: headers }
      )
      .pipe(tap((res) => { }));
  }
  getTimeEnergyFromApiAll() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/device/get-hours-by-day/?days=7", {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }

  getTodayTEnergyFromApi() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/device/get-all-device-hours-by-day/", {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }
  getMonthlyTotalEnergyFromApi() {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/device/get-all-device-hours-by-month/", {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }

  /********** *  TTLock****************/

  TTtoken: any;
  data: any;
  data_ls = [];
  loginTTLock(body: any) {
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    console.log("body1");
    console.log(body.toString);
    console.log(JSON.stringify(body));
    console.log("body2");
    return this.http.post(this.url + "oauth2/token/", body, options).pipe(
      tap((res) => {
        this.data = res;
        console.log(this.data.access_token);
        // alert(JSON.stringify(this.data))
        localStorage.setItem("TTtoken", this.data.access_token);
        let token_get = localStorage.getItem("TTtoken");
        // alert("TTToken:"+  token_get);
      })
    );
  }

  TTlock_list(body: any) {
    console.log(JSON.stringify(body));
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http.post(this.url + "v3/lock/list", body, options).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  TTlock_Reg(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http.post(this.url + "v3/user/register", body, options).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  tTlock_record(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };

    return this.http.post(this.url + "v3/lockRecord/list", body, options).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  tTlock_details(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http.post(this.url + "v3/lock/detail", body, options).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  tTlock_setautoTime(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/lock/setAutoLockTime", body, options)
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }

  tTlock_uploadBattery(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/lock/updateElectricQuantity", body, options)
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }

  tTlock_ReName(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http.post(this.url + "v3/lock/rename", body, options).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  tTlock_Unlock(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http.post(this.url + "/v3/lock/unlock", body, options).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  tTlock_Lock(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http.post(this.url + "/v3/lock/lock", body, options).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  tTlockDelete(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };

    return this.http.post(this.url + "v3/lock/delete", body, options).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  tTlockInitialize(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/lock/initialize", body, options)
      .pipe(tap((res) => { }));
  }
  //************ TTLock finger proccess *********/
  tTlockFingerAdd(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/fingerprint/add", body, options)
      .pipe(tap((res) => { }));
  }
  tTlockFingerList(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/fingerprint/list", body, options)
      .pipe(tap((res) => { }));
  }
  tTlockFingerDelete(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/fingerprint/delete", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockFingerClear(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/fingerprint/clear", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockFingerChangePeriod(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/fingerprint/changePeriod", body, options)
      .pipe(tap((res) => { }));
  }

  // ***************** Ekey Started ******//
  tTlockekey_Send(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/key/send", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockekeylist(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/key/list", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockekey_delete(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/key/delete", body, options)
      .pipe(tap((res) => { }));
  }
  //*********** Ekey ended  here */

  //**************Passcode started here  */
  tTlockpasscode_get(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/keyboardPwd/get", body, options)
      .pipe(tap((res) => { }));
  }
  tTlockpasscode_delete(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/keyboardPwd/delete", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockpasscode_add(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/keyboardPwd/add", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockpasscode_change(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/keyboardPwd/change", body, options)
      .pipe(tap((res) => { }));
  }

  //************Passcode ended here  */

  //***************** IC card started here  ************ */
  tTlockIc_list(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/identityCard/list", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockIc_add(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/identityCard/add", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockIc_delete(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/identityCard/add", body, options)
      .pipe(tap((res) => { }));
  }

  tTlock_upload(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/lockRecord/upload", body, options)
      .pipe(tap((res) => { }));
  }

  //************* IC card Eneded here ******/

  //****************GateWay Started here  */

  tTlockGateway_isInitSuccess(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/gateway/isInitSuccess", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockGateway_userId(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/user/getUid", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockGateway_lockTime(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/lock/queryDate", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockGateway_AdjustTime(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/lock/updateDate", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockGateway_Unlock(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/lock/unlock", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockGateway_lock(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/lock/lock", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockGateway_OpenState(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/lock/queryOpenState", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockGateway_freeze(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/lock/freeze", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockGateway_State(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/lock/queryStatus", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockGateway_list(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/gateway/list", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockGateway_lockDetails(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/gateway/listByLock", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockGateway_delete(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/gateway/delete", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockGateway_transfer(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/gateway/transfer", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockGateway_gatewayList(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http.post(this.url + "v3/gateway/listLock", body, options).pipe(
      tap((res) => {
        //alert("auth:"+JSON.stringify(res));
      })
    );
  }

  tTlockGateway_uploadDetails(body: any, gateway: any) {
    console.log(body);
    //let sendParams=body;
    const params = new HttpParams({
      fromObject: {
        clientId: body.clientId,
        accessToken: body.accessToken,
        gatewayId: gateway,
        modelNum: body.modelNum,
        hardwareRevision: body.hardwareRevision,
        firmwareRevision: body.firmwareRevision,
        networkName: body.networkName,
        date: body.date,
      },
    });
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/gateway/uploadDetail", params, options)
      .pipe(tap((res) => { }));
  }

  tTlockGateway_upgradeCheck(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/gateway/upgradeCheck", body, options)
      .pipe(tap((res) => { }));
  }

  tTlockGateway_setUpgradeMode(body: any) {
    console.log(body);
    let options = {
      headers: new HttpHeaders().set(
        "contentType",
        "application/x-www-form-urlencoded"
      ),
      headers1: new HttpHeaders().set("Origin", "Dyfo"),
    };
    return this.http
      .post(this.url + "v3/gateway/setUpgradeMode", body, options)
      .pipe(tap((res) => { }));
  }
  //**********Gateway ended here  */

  //****************Water level Apis */
  getWaterLevel(device_id: any) {
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    return this.http
      .get(this.URL + "api/device/get-water-level/?device_id=" + device_id, {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }

  smartConfig(body: any) {
    console.log(JSON.stringify(body));
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);

    return this.http
      .post(this.URL + "api/qr_code/create/pi-id/", body, { headers: headers })
      .pipe(
        tap((res) => { }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  getPiId(mac_id: any) {
    //console.log(JSON.stringify(body));
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);

    return this.http
      .get(this.URL + "api/qr_code/get-mac-id-info/?mac_id=" + mac_id, {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }
  getWaterDevices() {
    //console.log(JSON.stringify(body));
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);

    return this.http
      .get(this.URL + "api/device/get-water-device/", {
        headers: headers,
      })
      .pipe(tap((res) => { }));
  }
  changeTankDepth(body: any, device_id: any) {
    console.log(JSON.stringify(body));
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);

    return this.http
      .post(this.URL + "api/device/get-water-level/?device_id=" + device_id, body, {
        headers: headers,
      })
      .pipe(
        tap((res) => { }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  OnOffdevice(body:any){
    let token = localStorage.getItem("token");
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json ");
    headers = headers.append("Authorization", "Bearer" + " " + token);
    // let body: FormData = new FormData();
    // body.append("room_id",'2288');
    // body.append("room_id",type);
    return this.http
      .post(this.URL + "api/room/room-device-status/", body, { headers: headers })
      .pipe(tap((res) => { }));
  }
}

