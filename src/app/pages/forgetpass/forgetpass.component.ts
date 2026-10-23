import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-forgetpass",
  templateUrl: "./forgetpass.component.html",
  styleUrls: ["./forgetpass.component.scss"],
})
export class ForgetpassComponent implements OnInit {
  // @Input() username:any;
  otpvalue:any;
  useroldpass:any;
  showpassword: any = "false";
  passwordToggleIcon = "eye";

  loginForm: FormGroup;

  error_messages = {
    newpassword: [
      { type: "required", message: "New password is required." },
      { type: "minlength", message: "new password length should be >=8" },
      { type: "maxlength", message: "password length." },
    ],
    cpassword: [
      { type: "required", message: "Confirm password is required." },
      { type: "minlength", message: "confirm password length should be >=8" },
      { type: "maxlength", message: "password length." },
    ],
  };
  // password: any;
  timeLeft: number = 120;
  interval:any;

  constructor(
    private auth: AuthService,
    public user: UserService,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group(
      {
        newpassword: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30),
          ])
        ),
        cpassword: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30),
          ])
        ),
      },
      {
        // validators: this.password.bind(this)
        validators: this.password.bind(this),
      }
    );
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.startTimer();
  }
  isActiveToggleTextPassword: Boolean = true;
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword =
      this.isActiveToggleTextPassword == true ? false : true;
  }
  togglepass(): void {
    this.showpassword = !this.showpassword;
    if (this.passwordToggleIcon == "eye") {
      this.passwordToggleIcon = "eye-off";
    } else {
      this.passwordToggleIcon = "eye";
    }
  }

  submit() {
    let new_pass = this.loginForm.value.newpassword;
    console.log(this.user.user_mail);
    console.log(new_pass);
    let new_Pass = {
      password: new_pass,
      email: this.user.user_mail,
    };
    this.user.present("please wait...");
    this.auth.submit_New_Pass(new_Pass).subscribe(
      (res) => {
        console.log(res);
        this.user.showToast("Your password has been reset successfully!");
        this.router.navigateByUrl("/home");
        this.user.dismiss();
      },
      (err) => {
        this.user.showToast("something went wrong.please try again later.");
        this.user.dismiss();
        console.log(err.error);
      }
    );
  }

  password(formGroup: FormGroup) {
    const { value: newpassword } = formGroup.get("newpassword")?? { value: null };
    const { value: confirmPassword } = formGroup.get("cpassword")?? { value: null };
    console.log(newpassword);
    return newpassword === confirmPassword ? null : { passwordNotMatch: true };
  }

  @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any;
  config = {
    //otp config..........
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "",
    inputStyles: {
      width: "35px",
      height: "35px",
    },
  };

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  onOtpChange(otpval:any) {
    console.log(otpval);
    console.log(this.user.user_mail);

    this.otpvalue = otpval;
  }

  otp_submit() {
    console.log(this.otpvalue);
    console.log(this.user.user_mail);

    let body = {
      destination: this.user.user_mail,
      verify_otp: this.otpvalue,
    };
    this.user.present("please wait...");
    this.auth.sendOtp(body).subscribe(
      (res) => {
        console.log(res);
        this.user.otp_div = false;
        this.user.enter_newpass = true;
        this.user.dismiss();
      },
      (err) => {
        this.user.otp_div = true;
        this.user.enter_newpass = false;
        this.user.dismiss();
        this.user.showToast(err.error.detail);
        console.log(err.error);
      }
    );
  }
  resend_otp() {
    let body = {
      destination: this.user.user_mail,
      email: this.user.user_mail,
    };
    this.user.present("please wait...");
    this.auth.sendOtp(body).subscribe(
      (res) => {
        this.startTimer();
        console.log("resend otp success..." + res);
        this.user.dismiss();
      },
      (err) => {
        this.user.showToast(err.error.detail);
        this.user.dismiss();
        console.log("resend otp error..." + err.error.detail);
      }
    );
  }
  backbutton() {
    this.user.showDevice = false;
    this.user.showRoom = true;
  }
}
