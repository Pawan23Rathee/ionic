import { Component, OnInit } from '@angular/core';
import { Deeplinks } from '@awesome-cordova-plugins/deeplinks/ngx';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-alexa-link',
  templateUrl: './alexa-link.component.html',
  styleUrls: ['./alexa-link.component.scss'],
})
export class AlexaLinkComponent implements OnInit {

  constructor(private auth: AuthService,
    private user: UserService,
    private navCtrl: NavController,
    private deeplinks:Deeplinks ,
    private platform: Platform) {
    this.platform.ready().then(()=>{
    this.deeplinks.routeWithNavController(this.navCtrl, {
     // '/about-us': MainpageComponent,
     // '/products/:productId': alert
    }).subscribe((match:any) => {
        // alert(match.$route)
        // match.$args - the args passed in the link
        // match.$link - the full link data
        //alert(typeof match.$link.queryString)
        //alert(JSON.stringify(match.$link.queryString));



        let value=match.$link.queryString;
        var n =  value.indexOf("&");
        var result = value.substring(5, n);
        this.user.authCode=result;
       // alert(this.user.authCode);
        this.navCtrl.navigateRoot('/linkSuccess');
       //
       // document.getElementById("demo").innerHTML = res;
      }, (nomatch:any) => {
        // nomatch.$link - the full link data
        alert('Got a deeplink that didn\'t match'+nomatch);
      });
    });}
 urlsrc:any;
  ngOnInit() {
    let clientid="AMAZON_CLIENT_ID_PLACEHOLDER"
 //let clientid="AMAZON_CLIENT_ID_PLACEHOLDER"
  let url="https://alexa.amazon.com/spa/skill-account-linking-consent?fragment=skill-account-linking-consent&client_id="
  let openlink="&scope=alexa::skills:account_linking&skill_stage=development&response_type=code&redirect_uri=https://dyfolabs.com/&state=dyfolabs"
this.urlsrc=url+clientid+openlink
  }

}
