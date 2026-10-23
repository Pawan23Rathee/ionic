import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { AlertController, ActionSheetController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-ttlockekeylist',
  templateUrl: './ttlockekeylist.component.html',
  styleUrls: ['./ttlockekeylist.component.scss'],
})
export class TtlockekeylistComponent implements OnInit {

  show=false;
  ekeylist:any;
  ekeydata:any;
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
        this.ekeyList();
      }
  
    ngOnInit() {
    
    }

    ekeyList(){
      
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
      this.auth.tTlockekeylist(params).subscribe(res=>{
        this.user.dismiss();
        this.ekeylist=res;
        this.ekeydata=this.ekeylist.list;
        console.log(this.ekeylist)
        console.log(this.ekeylist.list.length)
       
      },error=>{
        console.log(JSON.stringify(error.error));
        this.user.dismiss();
        console.log('error');
      })
    }
  
  
  
    async openpages(){
      console.log("lockId:"+ this.user.ttLockId);
      console.log("lockMac:"+ this.user.ttlockMac);
      console.log("lockData:"+ this.user.lockData);
      const actionSheet = await this.actionsheetCtrl.create({  
        header: 'ekeys...',  
        buttons: [  
          {  
            text: 'send ekey',  
            icon: 'finger-print-outline', 
            handler: () => {  
              console.log('add finger clicked');  
              this.router.navigateByUrl('/ttlockekeysend');
              
              
            }  
          },
        
          {  
            text: 'Reset eKeys',  
            icon: 'remove-circle-outline',
            handler: () => {  
              console.log('fav click clicked');  
              this.resetkey();
              
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
  
  
    resetkey(){   
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
  
  
    ekeyListclick(keyid:any,keyname:any,keypass:any){
   this.user.ttkeyId=keyid;
   this.user.ttlockkeyname=keyname;
   this.user.ttkeypass=keypass;
   this.navCtrl.navigateRoot('/ttlockekeydetails'); 
    }
  }
  
