import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
declare var CameraCustom:any;
declare var TTlockdata:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public token:any;
  phone:any;
  email = '';
  password = '';
  show = false;
  public loading:any;
  phoneLogin = false;
  // loginForm: FormGroup;

  formData: FormData = new FormData();
  prdetail: any;
  stdcode = '+91       India'
  constructor(
    private router: Router,
    public navCtrl: NavController,
    public authService: AuthService,
    public user: UserService,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
  ) {
  }
  ngOnInit() { }
  registrationForm = this.formBuilder.group({
    password: [],
    username: []
  });
  isActiveToggleTextPassword = true;
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }
  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

  validateEmail(data:any) {
    if (/(.+)@(.+){2,}\.(.+){2,}/.test(data.email)) {
      return {
        isValid: true,
        message: ''
      };
    } else {
      return {
        isValid: false,
        showErrorToast: 'Invalid Email',
        message: 'Email address is required'
      };
    }
  }
  async showErrorToast(data: any) {
    let toast = await this.toastCtrl.create({
      message: data,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }
  async forget() {
    const prompt = await this.alertCtrl.create({
      // header: 'Reset Password..',
      cssClass: 'my-custom-class',
      message: '<h2>Reset Password..</h2>'+'Please enter your registered email to reset your password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Enter your Email...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'alertButton',
          handler: data => {
          }
        },
        {
          text: 'submit',
          cssClass: 'alertButton',
          handler: data => {
            console.log(data.email);
            let validateObj = this.validateEmail(data);
            if (!validateObj.isValid) {
              this.showErrorToast("Please enter valid mail...");
              return;
            } else {
              this.user.present('please wait...')
              this.authService.check_User(data.email).subscribe(res => {
                console.log(res);
                let body = {
                  "destination": data.email,
                  "email": data.email
                }
                this.authService.sendOtp(body).subscribe(res => {
                  console.log(res);
                  this.user.user_mail = data.email;
                  this.user.otp_div = true;
                  this.user.enter_newpass = false;
                  this.router.navigateByUrl('/forgetpass');
                  this.user.dismiss();
                }, err => {
                  this.user.dismiss();
                  this.user.showToast(JSON.stringify(err.error.detail))
                  console.log('send otp error');
                })


              }, err => {
                this.user.dismiss();     // check_user error
                this.user.showToast(err.error);
                console.log(err.user_id);
              })
            }
          }
        }
      ]
    });
    await prompt.present();
  }
  async login(e:any) {

    let userName = this.phoneLogin ? this.stdcode.slice(1).split(" ")[0] + this.phone : this.email;
    userName = userName.replace(/\s/g, '')
    // let userName = this.phoneLogin ? this.phone : this.email;
    // alert(userName +userName.length)
    if ((userName == "") || (this.password == "")) {

      const alert = await this.alertCtrl.create({

        header: 'Alert',
        message: 'You can not login without filling username or password.',
        buttons: ['OK']
      });
    }
    else {
      console.log("login1");
      this.loading = await this.loadingCtrl.create({ message: 'loading...' });
      console.log("login2");
      this.loading.present().then(() => {
        console.log("login3");
        this.formData.append('password', this.password);
        this.formData.append('username', userName);
        localStorage.setItem('passwordforprofile', this.password);
        this.authService.loginUser(this.formData).subscribe((res:any) => {
          console.log("login4");
          localStorage.setItem('r_select_type','circle');
          // this.ttlogIn();
          this.loading.dismiss();
          localStorage.setItem('token', res.token);
          // this.tuyalogin();         
          this.getData();
          this.navCtrl.navigateRoot('/mainpage');
        }, err => {
          console.log("login5");
          this.loading.dismiss();
          if (err.data.status_code == 422) {
            this.user.showToast('Unable to log in with provided credentials.')
          } else { this.user.showToast('Unable to log in with provided credentials.') }
          //alert(JSON.stringify(err));
        })
      })

    }
  }

  getData(){
    //  let token=this.login.token;
    //  console.log(token)
        this.authService.userProfile().subscribe(res=>{ 
           this.prdetail=res;
           localStorage.setItem('prof', JSON.stringify(this.prdetail));
        
        let countrycode = this.prdetail.mobile.slice(0,this.prdetail.mobile.length-10);
        countrycode = "91";
        this.prdetail.mobile = this.prdetail.mobile.substr(this.prdetail.mobile.length-10)
        this.tuyalogin(countrycode,this.prdetail.mobile,localStorage.getItem('passwordforprofile'),this.prdetail.email);
        //this.authService.getProfileImg()
      },
      err=>{
        console.log("profile err"+err)
      });
    }
ttpass:any;
data:any;
    ttlogIn(){
    //this.user.showToast('tt login api callled')
      let body = { password: localStorage.getItem('passwordforprofile') }
      TTlockdata.encrypt(body,
        (res:any) => {
          this.ttpass = res;
          this.user.ttPassword = this.ttpass;
          localStorage.setItem("ttPassword", this.ttpass);
          // alert('ttPass: '+ this.ttpass)
          const params = new HttpParams({
            fromObject: {
              username: 'dyfo_' + (this.prdetail.email).split('@')[0],
              password: this.ttpass,
              redirect_uri: 'https://dyfolabs.com/',
              grant_type: "password",
              client_secret: "BACKEND_SECRET_REQUIRED",
              client_id: '7a614fea8d6f427caa982e9a1aa6afc1',
  
            }
          });
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + "SECRET_CONFIGURE_ON_BACKEND"),
              'Origin': 'Dyfo'
            })
          };
          this.user.present('wait');
          this.authService.loginTTLock(params).subscribe(res => {
            // console.log((res)); 
            this.data = res;
            // alert("ALl DaTA:"+JSON.stringify(this.data))
            // alert("Token:"+this.data.refresh_token);
            // localStorage.setItem('TTtoken',this.data.refresh_token);           
            this.user.dismiss();
            this.navCtrl.navigateRoot('/mainpage');
          }, error => {
            this.navCtrl.navigateRoot('/mainpage');
            console.log(JSON.stringify(error.error));
            console.log('error');
            this.user.dismiss();
          })
        },
        (err:any) => { console.log('ttlock error..')}
      )
    }
  
    tuyalogin(code:any, mobile:any, password:any, emailId:any) {
      // alert('tuya ocde:'+ code)
      // alert('tuya mobile:'+ mobile)
      // alert("Tuya mail:"+ emailId);
      // alert("Tuya pass:" +password)
      if (this.phoneLogin == true) {
        var body: any = { 'code': code, 'number': mobile, "password": password, 'mailId': null }
      }
      else {
        var body: any = { 'code': code, 'number': null, "password": password, 'mailId': emailId }
      }
      //alert(mobile+"....."+countrycode)
  
      //let body:any ={'code': "91", 'number':"6392349844","password":"12345678"}
      CameraCustom.login(body,
        (res:any) => {
          // alert("Tuya LoginRes:"+JSON.stringify(res));
          // this.show=true;  
          let homeName = this.authService.home_name;
          this.loading.dismiss();
          if (homeName != "") {
            //alert(this.authService.home_name)
            this.createHome(homeName);
            this.authService.home_name = "";
          }
        },
        (err:any) => {
          alert("Tuya loginError:"+JSON.stringify(err))
        })
    }
    createHome(homename:any) {
      let body = { homeName: homename, roomList: "room1" }
      CameraCustom.createhome(body,
        (res:any) => {
  // alert("TuyaHomeCreateRes:"+JSON.stringify(res))
        },(err:any)=> {
  // alert("createhomeerror"+JSON.stringify(err.error))
        })
    }
  
}
