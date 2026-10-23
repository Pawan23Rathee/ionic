import { Component, OnInit,NgZone } from '@angular/core';
declare var CameraCustom:any;

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class NotificationComponent implements OnInit {
  tuya_messages:Array<any> = [];
  constructor(private ngZone:NgZone) {}

  ngOnInit() {
    CameraCustom.getmessage("",
      (messages:any) => {
        console.log(JSON.stringify(messages));
        this.ngZone.run(()=>{
          this.tuya_messages = messages;
        });
        
      },
      (err:any) => {
        alert(JSON.stringify(err));
      }
    );
  }
  deleteMessage(id:any){
    var body={
      id:id
    }
    CameraCustom.deletemessage(body,(res:any)=>{
      //alert(res);
      for (var i = this.tuya_messages.length; i--;) {
        if (this.tuya_messages[i].id === id) {
          this.ngZone.run(()=>{
            this.tuya_messages.splice(i, 1);
          });
        }
      }
    },(err:any)=>{
      alert(JSON.stringify(err));
    });
  }
}
