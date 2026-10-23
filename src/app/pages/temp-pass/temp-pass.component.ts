import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
declare var CameraCustom:any;
@Component({
  selector: "app-temp-pass",
  templateUrl: "./temp-pass.component.html",
  styleUrls: ["./temp-pass.component.scss"],
})
export class TempPassComponent implements OnInit {
  constructor(private user: UserService) {}
  //toShow=false;
  startDate:any;
  endDate:any;
  name:any;
  pass:any;
  allTempPass:any;
  tempPassToShow = [];
  ngOnInit() {
    this.allTempPass = this.user.allTempPass;
  }

  addPass() {
    //this.toShow=true;
    var x = document.getElementById("editEnter") as HTMLInputElement;
    x.style.display = "block";
    // if (x.style.display === "none") {
    //   console.log(x.style.display)

    // }
    //alert(this.toShow)
  }
  toShow() {
    var x = document.getElementById("editEnter") as HTMLInputElement;
    x.style.display = "none";
  }
  updatelockPass(data:any) {
    var x = document.getElementById("editEnter") as HTMLInputElement;
    // this.toShow=false;
    this.name = data.name;
    this.pass = data.pass;
    this.startDate = this.startDate.substr(0, 19).replace("T", " ");
    this.endDate = this.endDate.substr(0, 19).replace("T", " ");
    if (x.style.display === "block") {
      x.style.display = "none";
      console.log(this.pass);
      this.createTempPassword();
    }
  }

  createTempPassword() {
    let start = Date.parse(this.startDate);
    let end = Date.parse(this.endDate);
    console.log(end);
    let body = {
      id: this.user.tuyaDeviceId,
      name: this.name,
      password: this.pass,
      startTime: start,
      endTime: end,
    };
    CameraCustom.createTempPass(
      body,
      (res:any) => {
        console.log("created successfully");
        this.getTempPassword();
      },
      (err:any) => {}
    );
  }
  deleteTempPassword(id:any) {
    console.log(id);
    let body = { id: this.user.tuyaDeviceId, passId: id };
    CameraCustom.delTempPass(
      body,
      (res:any) => {
        this.getTempPassword();
      },
      (err:any) => {}
    );
  }
  getTempPassword() {
    let body = { id: this.user.tuyaDeviceId };
    CameraCustom.getTempPass(
      body,
      (res:any) => {
        this.allTempPass = res;
      },
      (err:any) => {}
    );
  }
}
