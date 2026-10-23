import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { async } from '@angular/core/testing';
import { ToastController, LoadingController, AlertController, NavController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
// import * as $ from 'jquery';
declare var CameraCustom: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  cameraon = false;
  currentImage: any;


  dataFromService: any = "";
  otp = false;
  otpverified = false;
  otpvalue: string = "";
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  config = {     //otp config..........
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '35px',
      'height': '35px'
    }
  };

  formData: FormData = new FormData();
  otpver: any;
  loading: any;
  backreg = false;

  timeLeft: number = 120;
  interval: any;



  isActiveToggleTextPassword: Boolean = true;
  public registrationForm: FormGroup;
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;

  }
  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

  constructor(private authService: AuthService,
    public user: UserService,
    private router: Router,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private httpClient: HttpClient,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    // private cameraPreview: CameraPreview,
    private platform: Platform,
    // private statusBar: StatusBar,
    // private splashScreen: SplashScreen
  ) {
    this.registrationForm = this.formBuilder.group({
      // username: ['', [Validators.required,
      //                 Validators.maxLength(30)
      //                 ]],
      name: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern("(0/91)?[0-9]{10}"),
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          this.getpass.bind(this)
        ]
      ],
      // cpassword: ['', 
      //         [    
      //           Validators.required,
      //            Validators.minLength(8),
      //            this.matchpass.bind(this)
      //           ]
      //          ],   
    });
  }

  ngOnInit() {
    $("#successImg").fadeIn("slow");
  }
  test_key: any;


  username() {
    return this.registrationForm.get("username");
  }
  name() {
    return this.registrationForm.get("name");
  }
  email() {
    return this.registrationForm.get("email");
  }
  phone() {
    return this.registrationForm.get('phone');
  }
  password() {
    return this.registrationForm.get('password');
  }
  // get cpassword() {
  //   return this.registrationForm.get("cpassword");
  // }
  matched = false;
  matchedpass = false;

  getpas: any;
  getpass(formGroup: FormGroup) {
    this.getpas = formGroup.value
  }
  // matchpass(formGroup:FormGroup){
  //   if((formGroup.value === this.getpas)){
  //     this.matched= false;
  //     this.matchedpass=true;
  //     if(formGroup.value ==''){
  //       this.matchedpass=false;
  //   }}
  //    else {
  //     this.matched= true;
  //     this.matchedpass=false;
  //   }
  //   console.log(formGroup.value)
  // }

  public errorMessages = {
    username: [
      { type: 'required', message: 'You must enter username' },
      { type: 'maxlength', message: 'Name cant be longer than 30 characters' }

    ],
    name: [
      { type: 'required', message: 'You must enter name' },
      { type: 'maxlength', message: 'Name cant be longer than 30 characters' }
    ],
    email: [
      { type: 'required', message: 'You must enter Email' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    phone: [
      { type: 'required', message: 'You must enter phone number' },
      { type: 'pattern', message: 'Please enter 10 digit phone number only' }
    ],
    password: [
      { type: 'required', message: 'You must enter password' },
      { type: 'minlength', message: 'password must be at least 8 characters long.' },
      // { type: 'pattern', message: 'Your username must contain only numbers and letters.' },

    ],
    cpassword: [
      { type: 'required', message: 'You must enter confirm password' },
      { type: 'minlength', message: 'confirm password must be at least 8 characters' }
    ],

  };




  getText(e: any) {
    var elementValue = e.srcElement.value;
    // if(elementValue){
    //   var regex = /^[a-z0-9\-]+$/;   
    //    var tempValue = elementValue.substring(0, elementValue.length - 1);
    //    if (!regex.test(elementValue)) {
    //      console.log("Entered char is not alphabet");
    //      e.srcElement.value = tempValue;

    //    }
    // }

  }
  onlyLetter(e: any) {
    var elementValue = e.srcElement.value;
    if (elementValue) {
      var regex = /^[a-zA-Z\s]+$/;
      var tempValue = elementValue.substring(0, elementValue.length - 1);
      if (!regex.test(elementValue)) {
        console.log("Entered char is not alphabet");
        e.srcElement.value = tempValue;

      }
    }
  }

  onInput($event: any) {
    let theEvent = $event || window.event,
      key = theEvent.target.value,

      regex = /[0-9]+/g
    if (!regex.test(key)) {
      let resp = $event.target.value.match(regex)
      $event.target.value = resp ? resp.join('') : ''
    }
    console.log(key.length);
  }

  async cancelButton() {
    console.log("cancel button");
    this.otp = false;
    const toast = await this.toastController.create({
      message: 'You can not register without verified otp  ',
      duration: 2000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }

  verify_otp() {
    this.startTimer();
    this.loadingController.create({
      message: 'Processing Server Request',
      duration: 5000,
      showBackdrop: false,
    }).then(res => {
      res.present();
      res.onDidDismiss().then(dis => {
        console.log('Loading dismissed! after 2 Seconds');
      });
    });
    this.formData = new FormData();
    this.formData.append('destination', this.registrationForm.value.email ?? "");
    this.formData.append('email', this.registrationForm.value.email ?? "");
    this.authService.sendOtp(this.formData).subscribe((res) => {
      // alert("sending otp:"+JSON.stringify(res))

    }, err => this.user.showToast('otp failed'))
  }

  onOtpChange(otpval: any) {
    //  alert(otpval)
    this.onOtpChange = otpval;
  }
  registered = false;
  async submit() {
    this.formData = new FormData();
    this.formData.append("username", this.registrationForm.value.email ?? "");
    this.formData.append("name", this.registrationForm.value.name ?? "");
    this.formData.append("email", this.registrationForm.value.email ?? "");
    this.formData.append("mobile", this.stdcode.slice(1).split(" ")[0].replace(/\s/g, '') + this.registrationForm.value.phone);
    // const passwordControl = this.registrationForm.get('password');
    // const passwordValue = passwordControl?.value?.[0] || '';
    const passwordControl = this.registrationForm.get('password');
    const passwordValue = passwordControl?.value?.[0];

    if (typeof passwordValue === 'string') {
      this.formData.append('password', passwordValue);
    }
    // this.formData.append("password", passwordValue);
    console.log(JSON.stringify(this.formData));
    this.formData.append('destination', this.registrationForm.value.email ?? "");
    this.formData.append('verify_otp', this.otpvalue);
    console.log(JSON.stringify(this.formData));
    // API for verified otp

    this.loading = await this.loadingCtrl.create({
      message: 'please wait..'
    });
    this.loading.present().then(() => {

      this.authService.sendOtp(this.formData).subscribe((res) => {
        this.otp = false;
        this.otpverified = true;
        // API for sending new user's details on server 
        this.authService.sendDetails(this.formData).subscribe(res => {
          this.loadingController.dismiss();
          this.registered = true;
          this.step3 = false;
          this.step4 = true;
          $('.step3').removeClass('active')
          $('.step4').addClass('active')
          this.getOtp()

          let tuyaotp = prompt("Security OTP:", "");
          if (tuyaotp == null || tuyaotp == "") {

          } else {
            this.tuyareg(tuyaotp);
            setTimeout(() => this.loginAfterReg(this.formData), 2000);
          }
          // setTimeout(()=>this.loginAfterReg(this.formData),2000);
          // alert('OTP submited successfully. Congratulations, your registration has been completed successfully.');
          // this.router.navigateByUrl('/mainpage'); 
        },
          err => {
            this.user.showToast("Email Address already exists")
            this.loadingController.dismiss();
            this.registered = false;
            this.step3 = false;
            this.step1 = true;
            $('.step3').removeClass('active')
            $('.step1').addClass('active')
          })
      },
        err => {
          console.log(err.status + "getting error");
          this.otpverified = false;
          this.user.showToast('Oops! Please enter valid OTP')
          this.loadingController.dismiss();
        })
    })
  }

  async resend_otp() {
    console.log("resend otp method call...")
    this.startTimer();
    this.loading = await this.loadingCtrl.create({
      message: 'please wait..'
    });
    this.loading.present().then(() => {
      this.formData.append('destination', this.registrationForm.value.email ?? "");
      this.formData.append('email', this.registrationForm.value.email ?? "");

      // this.loading = await this.loadingCtrl.create({ message: 'loading...' });
      // this.loading.present().then(()=>{
      this.authService.sendOtp(this.formData).subscribe(res => {
        this.loading.dismiss();
        console.log("resending otp:" + JSON.stringify(res))
      },
        err => {
          this.loading.dismiss();
          this.loading.dismiss();
          this.user.showToast('Network/Server Error')
        }
      )

    })
    // })
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  getOtp() {
    let code = this.stdcode.slice(1).split(" ")[0].replace(/\s/g, '');
    let mobile = this.registrationForm.value.phone;
    let emailId = this.registrationForm.value.email;
    let body: any = { 'code': code, 'number': mobile, 'mailId': emailId }
    CameraCustom.getOtp(body,
      (res: any) => {
        alert(JSON.stringify(res));
        // alert("1 success");

      },
      (err: any) => {
        alert(JSON.stringify(err))
      })
  }
  tuyareg(otp: any) {
    let code = this.stdcode.slice(1).split(" ")[0].replace(/\s/g, '');
    let mobile = this.registrationForm.value.phone;
    let emailId = this.registrationForm.value.email;
    let val = otp;
    let password = this.registrationForm.value.password;

    let body: any = { 'code': code, 'number': mobile, "password": password, 'mailId': emailId, "otp": val }
    CameraCustom.reg(body,
      (res: any) => {
        //alert(JSON.stringify(res));
        // this.show=true;  
      },
      (err: any) => {
        alert(JSON.stringify(err))
      })
  }
  loginAfterReg(formData: any) {
    this.user.present('please wait...')
    this.authService.loginUser(formData).subscribe(res => {
      this.user.dismiss();
      if (this.fileToUpload !== null) {
        this.uploadImg(this.fileToUpload)
      }
      this.authService.userProfile().subscribe(res => {
        let prdetail: any = res;
        localStorage.setItem('prof', JSON.stringify(prdetail));
        this.authService.getProfileImg()
        let homeName = prompt("HOME NAME:", "");
        if (homeName == null || homeName == "") {
          this.authService.home_name = prdetail.name.toUpperCase() + " HOME"
        } else {
          this.authService.home_name = homeName
        }
        //  console.log("profile res"+ this.prdetail.username);
      },
        err => {
          console.log("profile err" + err)
        });

      this.router.navigateByUrl('/login');
    }, err => {
      this.router.navigateByUrl('/home');
      this.user.dismiss();
    })
  }

  skip_step() {
    this.fileToUpload = null;
    this.verify_otp()
    this.step2 = false;
    this.step3 = true;
    $('.step2').removeClass('active')
    $('.step3').addClass('active')
  }
  stdcode = '+91       India'
  regData: any;
  step1data() {
    this.regData = {
      "username": this.registrationForm.value.email,
      "name": this.registrationForm.value.name,
      "email": this.registrationForm.value.email,
      "mobile": this.stdcode.slice(1).split(" ")[0].replace(/\s/g, '') + this.registrationForm.value.phone,
      "password": this.registrationForm.value.password
    }
    // alert(JSON.stringify(this.regData))
  }
  next_step() {
    if (this.step1) {
      if (this.registrationForm.invalid) {
        return;
      }
      this.step1data()
      this.step1 = false;
      this.step2 = true;
      $('.step1').removeClass('active')
      $('.step1').addClass('finish')
      $('.step2').addClass('active')
      return;
    }
    if (this.step2) {
      // this.uploadImg(this.fileToUpload)
      this.verify_otp()
      this.step2 = false;
      this.step3 = true;
      $('.step2').removeClass('active')
      $('.step2').addClass('finish')
      $('.step3').addClass('active')
      return;
    }
    if (this.step3) {
      this.submit()
      $('.step3').removeClass('active')
      $('.step3').addClass('finish')
      $('.step4').addClass('active')
      return;
    }
  }
  stepback() {
    if (this.step2) {
      this.step2 = false;
      this.step1 = true;
      $('.step2').removeClass('active')
      $('.step1').removeClass('finish')
      $('.step1').addClass('active')
      return;
    }
    if (this.step3) {
      this.step3 = false;
      this.step2 = true;
      $('.step3').removeClass('active')
      $('.step2').removeClass('finish')
      $('.step2').addClass('active')
      return;
    }
    if (this.step4) {
      // this.step4=false;
      // this.step3= true;
      // $('.step4').removeClass('active')
      // $('.step3').addClass('active')
      // return;
    }
  }

  getImage() {

    // this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
    //   (res) => {
    //     this.cameraon = true;

    //   },
    //   (err) => {
    //     this.user.showToast(JSON.stringify(err))

    //   });

  }
  takePicture() {
    // take a picture
    // this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
    //   this.currentImage = 'data:image/jpeg;base64,' + imageData;

    //     this.fileToUpload = null;
    //   this.fileToUpload = this.DataURIToBlob(this.currentImage);

    // this.stopCamera()
    // }, (err) => {
    //   this.user.showToast(JSON.stringify(err))
    //   console.log(err);
    // });
  }
  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }

  uploadImg(data: any) {

    this.authService.uploadProfileImg(data).subscribe(res => {
      // alert('result'+JSON.stringify(res))
    }, err => { this.user.showToast('Oops! Something went wrong.') })
  }
  fileToUpload: any = null;
  handleFileInput(data: any) {
    let file = data.target.files;
    this.fileToUpload = file.item(0);
  }

  swichCam() {
    // this.cameraPreview.switchCamera();
  }
  stopCamera() {
    // this.cameraPreview.stopCamera();
    this.cameraon = false;
  }



  presentActionSheet(fileLoader: any) {
    fileLoader.click();
    var that = this;
    fileLoader.onchange = function () {
      var file = fileLoader.files[0];
      var reader = new FileReader();
      // alert("load"+that.currentImage)
      reader.onload = function () {

        that.getOrientation(fileLoader.files[0], function (orientation: any) {
          if (orientation > 1) {
            that.resetOrientation(reader.result, orientation, function (resetBase64Image: any) {
              that.currentImage = resetBase64Image;
              // alert("base64---"+that.currentImage)
            });
          } else {
            that.currentImage = reader.result;
            // alert(that.currentImage)
          }
        });
      }
      // , false);

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  getOrientation(file: any, callback: any) {
    var reader = new FileReader();
    reader.onload = function (e: any) {

      var view = new DataView(e.target.result);
      if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
      var length = view.byteLength, offset = 2;
      while (offset < length) {
        var marker = view.getUint16(offset, false);
        offset += 2;
        if (marker == 0xFFE1) {
          if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
          var little = view.getUint16(offset += 6, false) == 0x4949;
          offset += view.getUint32(offset + 4, little);
          var tags = view.getUint16(offset, little);
          offset += 2;
          for (var i = 0; i < tags; i++)
            if (view.getUint16(offset + (i * 12), little) == 0x0112)
              return callback(view.getUint16(offset + (i * 12) + 8, little));
        }
        else if ((marker & 0xFF00) != 0xFF00) break;
        else offset += view.getUint16(offset, false);
      }
      return callback(-1);
    };
    reader.readAsArrayBuffer(file);
  }
  resetOrientation(srcBase64: any, srcOrientation: any, callback: any) {
    var img = new Image();

    img.onload = function () {
      var width = img.width,
        height = img.height,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");

      // set proper canvas dimensions before transform & export
      if (4 < srcOrientation && srcOrientation < 9) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }

      // transform context before drawing image
      if (ctx) {
        switch (srcOrientation) {
          case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
          case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
          case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
          case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
          case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
          case 7: ctx.transform(0, -1, -1, 0, height, width); break;
          case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
          default: break;
        }
        // draw image
        ctx.drawImage(img, 0, 0);
      }
      // export base64
      callback(canvas.toDataURL());
    };

    img.src = srcBase64;
  }

  getErrorMessages(controlName: string): string[] {
    const control = this.registrationForm.get(controlName);
    console.log("control",control);
    const errors: Array<any> = [];
    // let error: any;
    if (control?.errors) {
      for (const key of Object.keys(control.errors)) {
        // Customize the error messages based on your requirements
        
        switch (key) {
          case 'required':
            errors.push(controlName + ' is required.');
            break;
          case 'pattern':
            errors.push('Invalid' + controlName + ' format.');
            break;
          case 'maxlength':
            errors.push(controlName + ' cant be longer than 30 characters');
            break;
          case 'minlength':
            errors.push(controlName + ' must be at least 8 characters long.');
            break;
          // Add more cases for other error types if needed
        }
      }
    }
    // console.log("Error", errors);
    return errors;
  }


}