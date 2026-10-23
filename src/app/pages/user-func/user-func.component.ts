import { Component, OnInit,NgZone } from "@angular/core";
import { UserService } from "src/app/services/user.service";
declare var CameraCustom:any;
@Component({
  selector: "app-user-func",
  templateUrl: "./user-func.component.html",
  styleUrls: ["./user-func.component.scss"],
})
export class UserFuncComponent implements OnInit {
  lockUser:any;
  editenter = false;
  constructor(private user: UserService,private ngZone:NgZone) {}

  ngOnInit() {
    this.lockUser = this.user.lockUser;
    console.log(JSON.stringify(this.lockUser));
  }
  addUser() {
    let name = prompt("Enter Name:", "   ");
    if (name == null || name == "") {
      alert("Enter Name");
    } else {
      let body = { name: name, id: this.user.tuyaDeviceId };
      CameraCustom.addLockUser(
        body,
        (res:any) => {
          alert("User Added");
            this.getUser();
          
          //alert(res);
        },
        (err:any) => {
          alert(err);
        }
      );
    }
  }

  getUser() {
    let body = { id: this.user.tuyaDeviceId };
    console.log(body);
    CameraCustom.getLockUser(
      body,
      (res:any) => {
        this.ngZone.run(()=>{
            this.lockUser = res;
        });
        
      },
      (err:any) => {}
    );
  }
  deleteUser(userId:any) {
    let body = { userId: userId, id: this.user.tuyaDeviceId };
    console.log(userId);
    CameraCustom.deleteLockUser(
      body,
      (res:any) => {
        alert("Deleted");
          this.getUser();
      },
      (err:any) => {
        alert(err);
      }
    );
  }
  updateUser(id:any, type:any) {
    if (type == "Family Member") {
      this.updateFamilyUser(id);
    } else if (type == "Non Family Member") {
      this.updateLockMember(id);
    }
  }

  updateLockMember(id:any) {
    let name = prompt("Enter Name:", "   ");
    if (name == null || name == "") {
      alert("Enter Name");
    } else {
      let body = { name: name, userId: id, id: this.user.tuyaDeviceId };
      console.log(body);
      CameraCustom.updateLockUser(
        body,
        (res:any) => {
          alert("Updated Non Family Member");
            this.getUser();
        },
        (err:any) => {
          alert(err);
        }
      );
    }
  }

  updateFamilyUser(id:any) {
    let body = { userId: id, id: this.user.tuyaDeviceId };
    console.log(body);
    CameraCustom.updateFamilyLockUser(
      body,
      (res:any) => {
        alert("Updated Family Member");
          this.getUser();
      },
      (err:any) => {
        alert(err);
      }
    );
  }
  editDestails(formValue:any){}
}
