import { Component, OnInit, Input } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-irremotemore',
  templateUrl: './irremotemore.component.html',
  styleUrls: ['./irremotemore.component.scss'],
})
export class IrremotemoreComponent implements OnInit {
  @Input() remoteid:any;

  constructor(public viewCtrl: ModalController,
             private user: UserService,
             private auth: AuthService) { }

  ngOnInit() {}

  dismiss() {
    this.viewCtrl.dismiss();
    }

    keyPress(btnValue:any,event:any){
      console.log(event);
    var d= document.getElementsByClassName('device_card1')[0]; 
    if(d!=undefined){
      d.classList.remove("device_card1");
     }  
    
    console.log(document.getElementsByClassName('device_card1')[0]);
     event.currentTarget.classList.add("device_card1");
      console.log(this.user.moduleIdForKey);
      console.log('remoteid:' + this.user.moduleIdForKey);
      console.log('bynvalue' + btnValue)
     this.auth.pressKey(this.user.remoteIdforKeyPress,btnValue,this.user.moduleIdForKey).subscribe(res=>{
     })
    }

}
