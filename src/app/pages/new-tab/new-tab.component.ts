import { Component, OnInit } from '@angular/core';
import { InAppBrowser,InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx'; 
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { DevicesComponent } from '../devices/devices.component';
declare var WifiWizard2: any;
@Component({
  selector: 'app-new-tab',
  templateUrl: './new-tab.component.html',
  styleUrls: ['./new-tab.component.scss'],
})
export class NewTabComponent implements OnInit {
  module_name: any;
  modulepi_id: any;
  info_txt1: any;
  results1: any;

  constructor(private iab:InAppBrowser,
              public navCtrl: NavController,
              public modalController: ModalController,
              private user: UserService,public auth: AuthService,) {
    //setTimeout(function(){
    //   this.enableUrl1();
    // },2000);
    alert(this.user.todayArr)
   // this.iab.create('http://192.168.4.1/','_blank',this.options);
   }
   show=false;
  options:InAppBrowserOptions = {
    location : 'no',//Or 'no' 
    //hidden : 'yes', //Or  'yes'
   // clearcache : 'yes',
   // clearsessioncache : 'yes',
   // zoom : 'no',//Android only ,shows browser zoom controls 
   hardwareback : 'no',
   hideurlbar:'yes',
   // mediaPlaybackRequiresUserAction : 'no',
   // shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    closebuttoncolor:"#0000ff",
    footer:'yes',
   // disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
   // enableViewportScale : 'no', //iOS only 
   // allowInlineMediaPlayback : 'no',//iOS only 
   // presentationstyle : 'pagesheet',//iOS only 
   // fullscreen : 'yes',//Windows only    
};
  ngOnInit() {
    //this.enableUrl1();
  }
  enableUrl(){
    this.iab.create('http://192.168.4.1/','_blank',this.options);
  }
  enableUrl1(){
    this.iab.create('http://192.168.4.1/','_blank',this.options);
  }
 
  room(){
    this.user.pi_id="P-399"
    this.auth.getdevicemoduletoaddinroom(this.user.pi_id).subscribe((res:any)=>{
      //alert("ggg"+res[0].name);
     // alert(this.user.pi_id)
      this.module_name=res[0].name;
      this.modulepi_id=res[0].pi_id;
      this.user.todayArr=this.modulepi_id;
     // alert(this.module_name+"  "+this.modulepi_id)
      if(res[0].name=='Mono_Devices'||'Duo_Devices'||'Trio_Devices')
            {
              this.modulepi_id=res[0].pi_id;
              this.adddeviceinroom(); 
            }
            else if(res[0].name=='Ir_Blaster'){
              this.user.dd_name=res[0].name;
              this.user.moduleIdForKey=res[0].id;
              this.user.module_piId=res[0].id;
              {
                this.navCtrl.navigateRoot('/ir-product');
              }
            }
            else if(res[0].name=='Mood_Lighting'){
              this.user.dd_name=res[0].name;
              this.user.moodDevice_id=res[0].id;
            {
           this.navCtrl.navigateRoot('/devices');
            }
            }
     // this.user.showToast("Successfully added your modules...");
    },err=>{
      alert(err.error);
    }
        )
  }
  async adddeviceinroom(){
    this.user.todayArr=this.modulepi_id;
    console.log(this.user.todayArr);
    //this.user.showToast(this.user.todayArr);
 const modal = await this.modalController.create({
     component: DevicesComponent,
     componentProps: { player:  this.user.todayArr}
   });
   return await modal.present();
  }

  disable(){
    WifiWizard2.getConnectedSSID().then((res:any)=>{
      WifiWizard2.disconnect(res);
      WifiWizard2.disable(res);
    })
    this.show=true;
    this.getbothnetwork();
  }

  async getbothnetwork() {
               this.info_txt1 = "loading...";
                this.user.present('loading...');
                try {
                  let results1 = await WifiWizard2.scan();
                  this.results1 = results1;
                  this.info_txt1 = "";
                  this.user.dismiss();
                } catch (error) {
                  this.info_txt1 = error;
                  this.user.dismiss();
                  this.user.showToast('something went wrong.please try again later.');
                }
              }
              wificheck(data:any){
                let pass = prompt("WIFI PASSWORD:", "   ");  
            if (pass == null || pass == "") {
            }
            else{
            
              WifiWizard2.connect(data,true,pass);
              this.show=false;
             // }
            }

              }





              gaugeType = "semi";
              gaugeValue = 22;
              gaugeLabel = "Temprature";
              gaugeAppendText = "°C";
              thresholdConfig = {
                '16': {color: 'green'},
                '24': {color: 'orange'},
                '30': {color: 'red'}
            };
              x=36;
              y=33;
              current=50;
              animate(e:any){
              console.log(e.offsetX+"  "+this.x);
               let x = e.offsetX;
               let y = e.offsetY;
                 if(x>=0||x<=200){
                   if(x>this.x){
                     if(this.gaugeValue<30)
                    this.gaugeValue=this.gaugeValue+1; 
                       this.x=x;
                       this.y=y;
                   }
                   else if(this.x>x){
                     if(this.gaugeValue>16)
                    this.gaugeValue=this.gaugeValue-1; 
                    this.x=x;
                    this.y=y;
                   }
               }
               }
}