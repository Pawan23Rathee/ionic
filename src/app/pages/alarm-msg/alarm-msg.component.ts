import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
declare var CameraCustom:any;
@Component({
  selector: 'app-alarm-msg',
  templateUrl: './alarm-msg.component.html',
  styleUrls: ['./alarm-msg.component.scss'],
})
export class AlarmMsgComponent implements OnInit {

  constructor(private user:UserService) { }

  ngOnInit() {}


 
  setHijackConfig(){
    let body={id:this.user.tuyaDeviceId}
    console.log(body)
  CameraCustom.setHijackConfig(
    body,
     (res:any)=>{
     //alert(res);
     },
     (err:any)=>{
       
     }
  )
  }
  removeHijackConfig(){
    let body={id:this.user.tuyaDeviceId}
    console.log(body)
  CameraCustom.rmHijackConfig(
    body,
     (res:any)=>{
     //alert(res);
     },
     (err:any)=>{
       
     }
  )
  }
}
