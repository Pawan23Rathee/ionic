import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
declare var TTlockdata:any;


@Component({
  selector: 'app-ttlockfingerlist',
  templateUrl: './ttlockfingerlist.component.html',
  styleUrls: ['./ttlockfingerlist.component.scss'],
})
export class TtlockfingerlistComponent implements OnInit {

  show=false;
finglist:any;
fingerdata:any;
// nodata=false;
  constructor(  public alertController: AlertController,
    private router: Router,
    private auth: AuthService,
    private user: UserService,
    private navCtrl: NavController,
    public activateRoute: ActivatedRoute,
    public actionsheetCtrl: ActionSheetController,) { 
      // this.fingList();
      this.user.lockData;
      this.user.ttlockMac;
    }

  ngOnInit() {
    this.pluginclick();
  }
ionViewWillEnter(){
this. pluginclick();
}


 

  pluginclick(){
    let body={
      'lockdata':this.user.lockData,
      'macAddress':this.user.ttlockMac 
}
TTlockdata.getAllFingerPrint(body,
(res:any)=>{
// alert(res);
this.fingList();
},(err:any)=>{
alert(err)
})
  }
  fingList(){
    
    console.log("lockId:"+ this.user.ttLockId);
    console.log("lockMac:"+ this.user.ttlockMac);
    console.log("lockData:"+ this.user.lockData);

    var d= new Date();
      var n = d.getTime();
      var x=n;
      console.log("currentTime:"+n);
    let TTtoken = localStorage.getItem('TTtoken')??"";
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: TTtoken,
        lockId: this.user.ttLockId,
        pageNo: "1",
        pageSize: "20",
        date:JSON.stringify(x),
      }
    });
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),

      })
    };
      this.user.present('wait..');
    this.auth.tTlockFingerList(params).subscribe(res=>{
      this.user.dismiss();
      this.finglist=res;
      this.fingerdata=this.finglist.list;
      console.log(this.finglist.list)
      console.log(this.finglist.list.length)
      if(this.finglist.list.length=="0"){
        console.log('data null')
      }
    },error=>{
      console.log(JSON.stringify(error.error));
      this.user.dismiss();
      console.log('error');
    })
  }



  async fingerAdd(){
    console.log("lockId:"+ this.user.ttLockId);
    console.log("lockMac:"+ this.user.ttlockMac);
    console.log("lockData:"+ this.user.lockData);
    const actionSheet = await this.actionsheetCtrl.create({  
      header: 'Modify your  device',  
      buttons: [  
        {  
          text: 'Add Finger',  
          icon: 'finger-print-outline', 
          handler: () => {  
            console.log('add finger clicked');  
            this.router.navigateByUrl('/ttlockaddfinger');
            
            
          }  
        },
      
        {  
          text: 'Clear',  
          icon: 'remove-circle-outline',
          handler: () => {  
            console.log('fav click clicked');  
            this.clearFinger();
            
          }  
        },
      
         {  
          text: 'Cancel', 
          icon: 'close', 
          role: 'cancel',  
          handler: () => {  
            console.log('Cancel clicked');  
          }  
        }  
      ]  
    });  
    await actionSheet.present();  
  }  


  
  clearFinger(){
    // clearFingerPrint
    let body={
      "lockdata":this.user.lockData,
      "macAddress":this.user.ttlockMac
    }
    TTlockdata.clearFingerPrint(body,
      (res:any)=>{      
        // alert((res));
        this.clearfing();   
      },
      (err:any)=>{
      })
  }

  clearfing(){   
    console.log("lockId:"+ this.user.ttLockId);
    console.log("lockMac:"+ this.user.ttlockMac);
    console.log("lockData:"+ this.user.lockData);

    var d= new Date();
      var n = d.getTime();
      var x=n;
      console.log("currentTime:"+n);
    let TTtoken = localStorage.getItem('TTtoken')??"";
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: TTtoken,
        lockId: this.user.ttLockId,
        date:JSON.stringify(x),
      }
    });
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),

      })
    };
      this.user.present('wait..');
    this.auth.tTlockFingerClear(params).subscribe(res=>{
      this.navCtrl.navigateRoot('/ttoperatiion'); 
      this.user.dismiss();
    },error=>{
      console.log(JSON.stringify(error.error));
      this.user.dismiss();
      console.log('error');
    })
  }

  fingerAddButton(){
    this.navCtrl.navigateRoot('/ttlockaddfinger'); 
  }
  fingerpersonDetails(number:any,name:any,id:any){
    console.log("fingeruser Details..");
    
   this.user.fingusername=name;
   this.user.fingusernumber=number;
   this.user.finguserId=id;
   this.navCtrl.navigateRoot('/ttlockfingeruserdetails'); 
  }

  deleteFinger(){
    console.log("lockId:"+ this.user.ttLockId);
    console.log("lockMac:"+ this.user.ttlockMac);
    console.log("lockData:"+ this.user.lockData);

    var d= new Date();
      var n = d.getTime();
      var x=n;
      console.log("currentTime:"+n);
    let TTtoken = localStorage.getItem('TTtoken')??"";
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: TTtoken,
        lockId: this.user.ttLockId,
        fingerprintId: "",
        deleteType:"1",
        date:JSON.stringify(x),
      }
    });
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),

      })
    };
      this.user.present('wait..');
    this.auth.tTlockFingerClear(params).subscribe(res=>{
      this.navCtrl.navigateRoot('/ttoperatiion'); 
      this.user.dismiss();
    },error=>{
      console.log(JSON.stringify(error.error));
      this.user.dismiss();
      console.log('error');
    })
  }

}
