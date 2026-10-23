import { Component, OnInit,NgZone } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
declare var CameraCustom:any;
@Component({
  selector: 'app-lock-recors',
  templateUrl: './lock-recors.component.html',
  styleUrls: ['./lock-recors.component.scss'],
})
export class LockRecorsComponent implements OnInit {

  constructor(private user:UserService,private ngZone:NgZone) { }
  lockRecords:any;
  ngOnInit() {
    this.ngZone.run(()=>{
      this.lockRecords = this.user.lockRecords;
    });
    
    console.log(JSON.stringify(this.lockRecords));

  }
  getLockRecords(){
    let hide=document.getElementById("hide") as HTMLInputElement;
    let show=document.getElementById("show") as HTMLInputElement;
    hide.style.display="block";
    show.style.display="none";
    let body={id:this.user.tuyaDeviceId}
    console.log(body)
  CameraCustom.getRecords(
    body,
     (res:any)=>{
       this.ngZone.run(()=>{
          this.lockRecords = res;
       })
       
     //console.log(JSON.stringify(res));
     },
     (err:any)=>{
       
     }
  )
  }
  getUnlockRecords(){
    let hide=document.getElementById("hide") as HTMLInputElement;
    let show=document.getElementById("show") as HTMLInputElement;
    hide.style.display="none";
    show.style.display="block";
    let body={id:this.user.tuyaDeviceId}
    console.log(body)
  CameraCustom.getUnlockRecords(
    body,
     (res:any)=>{
       this.user.lockRecords=[];
     this.user.lockRecords=res;
     this.ngOnInit();
     },
     (err:any)=>{
       
     }
  )
  }
  getHijackRecords(){
    let body={id:this.user.tuyaDeviceId}
    console.log(body)
  CameraCustom.getHijackRecords(
    body,
     (res:any)=>{
      this.user.lockRecords=[];
      this.user.lockRecords=res;
      this.ngOnInit();
     },
     (err:any)=>{
       
     }
  )
  }
}
