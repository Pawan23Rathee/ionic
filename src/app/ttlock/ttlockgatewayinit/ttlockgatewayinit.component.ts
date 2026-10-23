import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { HttpParams, HttpHeaders } from '@angular/common/http';
declare var TTlockdata:any;
declare var WifiWizard2: any;


@Component({
  selector: 'app-ttlockgatewayinit',
  templateUrl: './ttlockgatewayinit.component.html',
  styleUrls: ['./ttlockgatewayinit.component.scss'],
})
export class TtlockgatewayinitComponent implements OnInit {

  lockGatewayinit:any;
  UUId:any;
  data:any;
  userPass:any;

  results1:Array<any> = [];
  info_txt1:any;

  deviceedit=false;
  connectbtn=false;
  wifiscan=false;
  scanbtn=true;
  addgateway=false;
  constructor(private user: UserService,
    private authService: AuthService,
    private navCtrl: NavController,
    private androidPermissions:AndroidPermissions) { }

  ngOnInit() {}

  scanLock(){
   
    this.lockGatewayInitialize()
    this.userPass=localStorage.getItem("ttPassword");
    //alert(this.userPass);
    //console.log("init call");
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION, this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION])
    .then(result =>{
      TTlockdata.scanGateway("scan",
      (res:any)=>{
        this.connectbtn=true;
        this.scanbtn=false;
        //alert("res:"+res);
       
      },(err:any)=>{
        alert(err);
      }) 
    })
    
 
  }
  connectlock(){ 
      TTlockdata.connectGateway("connect",
      (res:any)=>{
        this.connectbtn=false;
        this.wifiscan=true;
        // alert("res:"+res.ExtendedBluetoothDevice);
        alert('connected successful... Next step, You have to configure SSID and Password.')      
      },(err:any)=>{
        alert(err);
      })  
  }

  scanwifi(){
    TTlockdata.scanWifi("wifilist",
    (res:any)=>{
      //alert("res:"+JSON.stringify(res));
      let list=res;
      console.log("gg"+ (list));
      console.log("gg"+ JSON.stringify(list))
      let ssid=list[0].SSID;
      let rssi=list[0].Rssi;
      let ssid1=list[0].SSID;
      let rssi1=list[0].Rssi;
      console.log(ssid+" "+rssi)
      console.log(ssid1+" "+rssi1)
      
    },(err:any)=>{
      alert(err);
    }) 
  }


  lockGatewayInitialize(){
    // this.login();
    var d= new Date();
      var n = d.getTime();
      var x=n;
      //console.log(n);
    let TTtoken = localStorage.getItem('TTtoken')??"";
    // alert("t"+ TTtoken)
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: TTtoken,
        date:JSON.stringify(x),
      }
    });
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),
        'Access-Control-Allow-Origin': '*'
      })
    };
      this.user.present('initializing...');
    this.authService.tTlockGateway_userId(params).subscribe(res=>{
      this.lockGatewayinit=res;
      this.UUId=this.lockGatewayinit.uid;
      this.user.showToast("U"+JSON.stringify(this.lockGatewayinit.uid));
      //alert("U"+JSON.stringify(this.lockGatewayinit.uid))
      console.log(typeof(this.UUId));
      //alert(this.UUId)
      this.user.dismiss();
    },error=>{
      this.user.dismiss();
      this.user.showToast(JSON.stringify(error.error));
    })
    
   
  }

  addlock(){
    // TTlockdata.initgateway()
    let body={uId: this.UUId.toString(),
    UserPassword:this.userPass,
  SSID:this.ssid,
  wifiPass:this.userPass1
}
    TTlockdata.initgateway(body,
    (res:any)=>{
      //alert("res:"+res)
      console.log("connect res:"+res);
      this.isInitSuccess();    
    },(err:any)=>{
      alert(err)
    }) 
  }

  login(){
    const params = new HttpParams({
      fromObject: {
        username: 'dyfo_'+"ashish97",
        password: "CONFIGURE_PASSWORD_SECURELY",
        redirect_uri :'https://dyfolabs.com/',
        grant_type:"password",
      client_secret: "BACKEND_SECRET_REQUIRED" , 
      client_id: '7a614fea8d6f427caa982e9a1aa6afc1',
      
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),
        'Origin': 'Dyfo'
      })
    };

    this.user.present('wait');
    this.authService.loginTTLock(params).subscribe(res=>{
      console.log("login success");
      console.log((res));

      this.data=res;
      console.log(JSON.stringify(this.data));
      console.log(this.data.refresh_token);

      this.user.dismiss();

    },err=>{
      console.log(err);
    })
  }

gatewayID:any;

  isInitSuccess(){
    // this.login();
    var d= new Date();
      var n = d.getTime();
      var x=n;
      //console.log(n);
    let TTtoken = localStorage.getItem('TTtoken')??"";
    // alert("t"+ TTtoken);
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: TTtoken,
        gatewayNetMac:"FA:9B:30:4E:35:0E",
        date:JSON.stringify(x),
      }
    });
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),
        'Access-Control-Allow-Origin': '*'
      })
    };
      this.user.present('loading...');
    this.authService.tTlockGateway_isInitSuccess(params).subscribe(res=>{
      //alert('gatewayId'+ JSON.stringify(res));
      this.uploadDetails();
     this.gatewayID=JSON.stringify(res);
      console.log('gateway'+ res)
      this.user.dismiss();
    },error=>{
      this.user.dismiss();
      this.user.showToast(JSON.stringify(error.error));
    })
    
   console.log(params);
  }

  

  uploadDetails(){
    // this.login();
    var d= new Date();
      var n = d.getTime();
      var x=n;
      //console.log(n);
    let TTtoken = localStorage.getItem('TTtoken');
    // alert("t"+ TTtoken)
    let gatewayID=91986;
    // const params = new HttpParams({
    //   fromObject: {
    //     clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
    //     accessToken: TTtoken,
    //     //gatewayId:"91986",
    //     modelNum:"SN227",
    //     hardwareRevision:"1.1.2",
    //     firmwareRevision:"1.1.20.1027",
    //     networkName:"Redmi",
    //     date:JSON.stringify(x),
    //   }
    // });
    const params = {
          clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
          accessToken: TTtoken,
          //gatewayId:"91986",
          modelNum:"SN227",
          hardwareRevision:"1.1.2",
          firmwareRevision:"1.1.20.1027",
           networkName:"Dyfo",
           date:JSON.stringify(x),
        }
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),
        'Access-Control-Allow-Origin': '*'
      })
    };
    //   this.user.present('uploading...');
    // this.authService.tTlockGateway_uploadDetails(params,gatewayID).subscribe(res=>{
    //   alert("upload:"+ JSON.stringify(res));
    //    this.navCtrl.navigateRoot('/ttgatewaylist'); 
    //   this.user.dismiss();
    // },error=>{
    //   this.user.dismiss();
    //   this.user.showToast(JSON.stringify(error.error));
    // })
    
   //console.log(params);
  }

  async getbothnetwork() {
               
    this.info_txt1 = "loading...";
    this.user.present('loading...');
    try {
      let results1 = await WifiWizard2.scan();
      this.results1 = results1;
      this.info_txt1 = "";
      this.user.dismiss();
     //alert('results1' + JSON.stringify(results1));
     // alert(JSON.stringify(results1));
     this.deviceedit=true;
    } catch (error) {
      this.info_txt1 = error;
      this.user.dismiss();
      this.user.showToast('something went wrong.please try again later.');
    }
  }
  pass=false;
  ssid:any;
  wificheck(e:any){
    //alert('wifi name:'+ e);
    console.log('selected wifi:'+ e);
    this.ssid=e;
    this.pass=true;
  }

  userPass1:any;
  onSubmit(contactForm:any){
    this.pass=false;
    this.deviceedit=false;
    console.log(contactForm.value);
 this.userPass1=contactForm.value.password;
 //alert("WIFIPAss:"+this.userPass1);
 this.wifiscan=false;
 this.addgateway=true;
  }

}
