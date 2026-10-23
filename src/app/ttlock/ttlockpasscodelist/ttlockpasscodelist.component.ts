import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA, NgModule  } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
declare var TTlockdata:any;


@Component({
  selector: 'app-ttlockpasscodelist',
  templateUrl: './ttlockpasscodelist.component.html',
  styleUrls: ['./ttlockpasscodelist.component.scss'],
})
export class TtlockpasscodelistComponent implements OnInit {
  show=false;
  passlist:any;
  fingerdata:any;
  // nodata=false;
    constructor(  public alertController: AlertController,
      private router: Router,
      private auth: AuthService,
      private user: UserService,
      private navCtrl: NavController,
      public activateRoute: ActivatedRoute,
      public actionsheetCtrl: ActionSheetController,) { 
        this.user.lockData;
        this.user.ttlockMac;
        this. passcodeList();
      }
  
    ngOnInit() {
     
    }
   
    pluginclick(){
      let body={
        'lockdata':this.user.lockData,
        'macAddress':this.user.ttlockMac 
  }
  TTlockdata.getAllValidPasscodes(body,
  (res:any)=>{
//alert('pluginpassres:'+ res)
  this.passcodeList();
  },(err:any)=>{
  alert(err)
  })
    }
    passcodeList(){
      
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
          keyboardPwdVersion: '4',
          keyboardPwdType: '2', 
          startDate:"2019-12-09T15:43:40.39",
          endDate:"2021-01-31T15:43:40.39",
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
      this.auth.tTlockpasscode_get(params).subscribe(res=>{
        this.user.dismiss();
        this.passlist=res;
        console.log(this.passlist)
        //alert("passListRes:"+ JSON.stringify(res));
      },error=>{
        console.log(JSON.stringify(error.error));
        this.user.dismiss();
        console.log('error');
      })
    }
  
  
  
    async passcodeAdd(){
      console.log("lockId:"+ this.user.ttLockId);
      console.log("lockMac:"+ this.user.ttlockMac);
      console.log("lockData:"+ this.user.lockData);
      const actionSheet = await this.actionsheetCtrl.create({  
        header: 'Modify your device',  
        buttons: [  
          {  
            text: 'Add Passcode',  
            icon: 'finger-print-outline', 
            handler: () => {  
              console.log('add finger clicked');  
              this.router.navigateByUrl('/ttlockpasscodeadd');
              // this.passcodepersonDetails();              
            }  
          },
        
          {  
            text: 'Clear',  
            icon: 'remove-circle-outline',
            handler: () => {  
              console.log('fav click clicked');  
              this.resetpass();
              
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
      
      let body={
        "lockdata":this.user.lockData,
        "macAddress":this.user.ttlockMac
      }
      TTlockdata.clearFingerPrint(body,
        (res:any)=>{      
     
          // this.clearfing();   
        },
        (err:any)=>{
        })
    }
  
    resetpass(){   
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
        this.navCtrl.navigateRoot('/ttlockpasscodelist'); 
        this.user.dismiss();
      },error=>{
        console.log(JSON.stringify(error.error));
        this.user.dismiss();
        console.log('error');
      })
    }
  
    passcodepersonDetails(){
      console.log("fingeruser Details..");
      
    
     this.navCtrl.navigateRoot('/ttlockpasscodedetails'); 
    }
}
