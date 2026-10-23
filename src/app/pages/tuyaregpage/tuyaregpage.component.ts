import { Component, OnInit } from "@angular/core";
import { NgForm, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
declare var CameraCustom:any;

@Component({
  selector: "app-tuyaregpage",
  templateUrl: "./tuyaregpage.component.html",
  styleUrls: ["./tuyaregpage.component.scss"],
})
export class TuyaregpageComponent implements OnInit {
  reg = false;
  login = false;
  constructor(private user: UserService) {}

  ngOnInit() {}

  tuyamail:any;
  getOtp(data:any) {
    //alert("requesting otp");
    console.log(data.mail);
    this.tuyamail = data.mail;
    this.reg = true;
    let body: any = {
      code: "91",
      number: null,
      mailId: this.tuyamail,
    };
    CameraCustom.getOtp(
      body,
      (res:any) => {
        //alert(JSON.stringify(res));
      },
      (err:any) => {
        alert(JSON.stringify(err));
      }
    );
  }

  tuyareg(reg:any) {
    this.login = true;

    console.log(reg.password);
    console.log(reg.mail);
    console.log(reg.otp);
    let body: any = {
      code: "91",
      number: null,
      password: reg.password,
      mailId: reg.mail,
      otp: reg.otp,
    };
    CameraCustom.reg(
      body,
      (res:any) => {
        //alert(JSON.stringify(res));
      },
      (err:any) => {
        alert(JSON.stringify(err));
      }
    );
  }

  tuyalogin(login:any) {
    //alert(login.mail);
    //alert(login.password);
    let body: any = {
      code: "91",
      number: null,
      password: login.password,
      mailId: login.mail,
    };
    CameraCustom.login(
      body,
      (res:any) => {
        //alert(JSON.stringify(res));
      },
      (err:any) => {
        alert(JSON.stringify(err));
      }
    );
  }

  createHome(home:any) {
    //alert(home.homename);
    console.log(home.homename);
    let body = {
      homeName: home.homename,
      roomList: "room1",
    };
    //alert(body);
    CameraCustom.createhome(
      body,
      (res:any) => {
        //alert("res" + JSON.stringify(res));
      },
      (err:any) => {
        alert(JSON.stringify(err));
      }
    );
  }
}
