import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Platform, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

// import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from 'src/app/pages/login/login.component'
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UpdatepassComponent } from '../updatepass/updatepass.component';

import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  showpassword: any = "false";
  passwordToggleIcon = "eye";
  public token:any;
  result:Array<any>= [];
  prdetail:any;
  username:any;
  name:any;
  email:any;
  mobile:any;
  data: Observable<any>;
  otpenter = false;
  emailvalide = false;
  emailinvalide = true;
  formData: FormData = new FormData();

  croppedImagepath = "";
  isLoading = false;
  userImg: any = '';

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };


  constructor(public navCtrl: NavController,
    public http: HttpClient,
    private auth: AuthService,
    public user: UserService,
    public alertController: AlertController,
    private router: Router,
    private platform: Platform,
    private modalController: ModalController,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File
  ) { 
    this.data = new Observable<any>();
  }



  enable() {
    this.user.showToast('You have to validate your email id.please click on icon to validate email..!');
    console.log("enabkle click...");
    $(".ion-mail").prop('disabled', false);
    $("ion-icon").prop('disabled', false);

    // $("#user-mail").prop('disabled', true);
    // $("ion-input").css('color', "black");

    // $(".ion-padding").css('display' ,"block");
    // console.log("Enable text...");

  }



  profImg:any
  ngOnInit() {
    this.getData();
    setTimeout(() => { this.profImg = localStorage.getItem('pof_img') }, 3000);


  }
  predetail:any;
  getData() {
    this.user.present('please wait');
    let prof= localStorage.getItem('prof');
    this.prdetail = (prof)?JSON.parse(prof):"";
    this.auth.userProfile().subscribe(res => {
      this.user.dismiss();
      this.prdetail = res;
      this.username = this.prdetail.username;
      this.name = this.prdetail.name;
      this.email = this.prdetail.email;
      this.mobile = this.prdetail.mobile;
      this.user.username = this.email;    // use for loign after change password
    }, err => {
      this.user.dismiss();
      this.user.showToast('Oops! Something went wrong.you have to login again.')
      this.navCtrl.navigateRoot('/login');
    }
    )


  }


  validateEmail() {

    let email = (<HTMLInputElement>document.getElementById('user-mail')).value;
    let bodytosendotp = {
      'destination': email,
      'email': email
    }
    console.log("validate email click.." + JSON.stringify(bodytosendotp));
    this.user.present('sending otp...');
    this.auth.sendOtp(bodytosendotp).subscribe(res => {
      // this.popupforenterotp();
      this.otpenter = true;
      this.user.dismiss();

    }, err => {
      this.user.showToast(JSON.stringify(err.error.detail));
      this.user.dismiss();
      console.log(JSON.stringify(err.detail));
    })

  }
  validateOTP(data:any) {
    let enterOtp = data.otp;
    console.log(enterOtp);
    let otpbody = {
      'destination': this.email,
      'verify_otp': enterOtp
    };
    this.user.present('please wait...');
    this.auth.sendOtp(otpbody).subscribe(res => {
      $(".validmail").css("color", "green");
      this.emailvalide = true;
      this.emailinvalide = false;
      $(".ion-input").prop('disabled', false);
      $(".ion-padding").css('display', "block");
      this.otpenter = false;
      this.user.dismiss();
    }, err => {
      this.user.dismiss();
      this.user.showToast('please enter valid otp' + JSON.stringify(err.error.detail));
      this.otpenter = true;
      console.log(err.error);
    })
  }

  //  async popupforenterotp(){
  //     const alert = await this.alertController.create({
  //       message: 'Please enter one time verification code send to &nbsp;' + this.email,
  //       inputs: [
  //         {
  //           name: 'name1',
  //           type: 'number',
  //           max:6,
  //           placeholder: 'Enter otp here..'
  //         }
  //       ],    
  //        buttons: [
  //             {
  //               text: 'Cancel',
  //               role: 'cancel',
  //               cssClass: 'secondary',
  //               handler: () => {
  //                 console.log('Confirm Cancel');  
  //               }
  //             }, {
  //               text: 'Ok',
  //               handler: (alertData) => { //takes the data 
  //                 console.log(alertData.name1);
  //                 let otpbody={
  //                   'destination': this.email,
  //                   'verify_otp': alertData.name1
  //                 };
  //                 console.log(otpbody);
  //                 this.user.present('please wait..');
  //                 this.auth.sendOtp(otpbody).subscribe(res=>{
  //                   console.log("otp submit" + JSON.stringify(res));
  //                   $(".validmail").css("color", "green");
  //                   $(".ion-input").prop('disabled', false); 
  //                   $(".ion-padding").css('display' ,"block");
  //                   this.user.dismiss();



  //                 },err=>{
  //                   this.user.dismiss();
  //                   this.user.showToast('please enter valid otp'+ JSON.stringify(err.error.detail))
  //                   console.log(err.error);

  //                 })

  //             }
  //             }
  //           ]
  //   });
  //   await alert.present();
  //   }

  updatedetails(form: NgForm) {
    console.log("update Details")
    console.log(JSON.stringify(form.value));
    console.log(JSON.stringify(form.value.name));
    console.log(JSON.stringify(form.value.mobile));
    console.log(JSON.stringify(form.value.email));

    let b = localStorage.getItem('passwordforprofile');
    console.log('passwordfor-profile' + b)
    let bodyadmin = {
      'name': form.value.name,
      'mobile': form.value.mobile,
      'email': form.value.email,
    }
    if (b == 'null') {
      this.router.navigateByUrl('/login');
    }

    this.user.present('please wait..')
    this.auth.updateAdminProfile(bodyadmin).subscribe(res => {
      localStorage.clear();
      let bodylogin = {
        'username': form.value.email,
        'password': b
      }
      this.auth.loginUser(bodylogin).subscribe(res => {
        // localStorage.clear();
        // localStorage.removeItem('token');
        localStorage.setItem('token', res.token);
        console.log(res);
        this.getData();
        this.router.navigateByUrl('/profile');


        $(".ion-padding").css('display', "none");
        $("ion-input").prop('disabled', true);
        this.user.dismiss();
        console.log("checkpass" + JSON.stringify(bodylogin))
      }, err => {
        this.user.dismiss();
        this.user.showToast('Oops! Something went wrong.')
      })
      console.log(res);
    }, err => {
      this.user.dismiss();
      console.log(err.error);
    })

  }

  // togglepass():void{
  //   this.showpassword=!this.showpassword;
  //   if(this.passwordToggleIcon=='eye'){
  //     this.passwordToggleIcon='eye-off';
  //   }
  //   else{
  //     this.passwordToggleIcon='eye';
  //   }
  //    }

  async changePassword() {
    console.log('passs click')
    const modal = await this.modalController.create({
      component: UpdatepassComponent,
      componentProps: { username: this.user.username }
    });
    return await modal.present();
  }
  logout() {
    this.user.present('please wait...');
    this.auth.getLogoutFromApi().subscribe(res => {
      console.log(res)
      localStorage.clear();
      this.navCtrl.navigateRoot('/login');
      this.user.dismiss();
    }, err => {
      localStorage.clear();
      this.navCtrl.navigateRoot('/login');
      this.user.dismiss();
    })
  }


  pickImage(sourceType:any) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.croppedImagepath = 'data:image/jpeg;base64,' + imageData;
      this.userImg = this.croppedImagepath;
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
}
