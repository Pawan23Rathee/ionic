import { Component, OnInit } from '@angular/core';
import { Deeplinks } from '@awesome-cordova-plugins/deeplinks/ngx';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-link-success',
  templateUrl: './link-success.component.html',
  styleUrls: ['./link-success.component.scss'],
})
export class LinkSuccessComponent implements OnInit {

  constructor(  private auth: AuthService,
    private user: UserService,
    private navCtrl: NavController,
    private deeplinks:Deeplinks ,
    private platform: Platform) { }

  ngOnInit() {
  }
  getAccessToken(){
    let amazonAuthCode=this.user.authCode;
     this.auth.getAccessTokenForAmazon(amazonAuthCode).subscribe(res => {
       //alert(JSON.stringify(res[0]));
       let access_token=res;
       //alert(access_token);
       console.log(typeof access_token);
       this.user.amazonAccessToken=access_token.access_token;
    },err=>{
     alert(JSON.stringify(err));
    })
   }

   ClientId="zB8O5UaR7B3tIM3JxUAscmy5Q1h6QTX9";
clientSecret="BACKEND_SECRET_REQUIRED"
//ClientId="AMAZON_CLIENT_ID_PLACEHOLDER"
  ourauthUrl =
    "https://dev-2yui1jec.us.auth0.com/authorize?state=dyfolabs&client_id=" +
    this.ClientId +
    "&protocol=oauth2&response_type=code&scope=openid%20offline_access%20profile%20email&redirect_uri=https://dyfolabs.com/";
  this.ClientId +
  "&protocol=oauth2&response_type=code&scope=openid%20offline_access%20profile%20email&redirect_uri=https://dyfolabs.com/";



enableSkill(){
  let amazonAccessToken=this.user.amazonAccessToken;
  let ourauthCode=this.user.authCode;
  this.auth.enableAlexaLinking(amazonAccessToken,ourauthCode).subscribe(res => {
    //alert(JSON.stringify(res));
    this.navCtrl.navigateRoot('/linkSuccessUi');
 },err=>{
  alert(JSON.stringify(err));
 })
}
}
