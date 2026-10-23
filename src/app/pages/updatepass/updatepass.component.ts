import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-updatepass',
  templateUrl: './updatepass.component.html',
  styleUrls: ['./updatepass.component.scss'],
})
export class UpdatepassComponent implements OnInit {
  @Input() username: any;
  useroldpass;
  showpassword: any = "false";
  passwordToggleIcon = "eye";

  loginForm: FormGroup;

  error_messages = {
    'password': [
      { type: 'required', message: 'Old password is required.' },
    ],
    'newpassword': [
      { type: 'required', message: 'New password is required.' },
      { type: 'minlength', message: 'new password length should be >=8' },
      { type: 'maxlength', message: 'password length.' },
    ],
    'cpassword': [
      { type: 'required', message: 'Confirm password is required.' },
      { type: 'minlength', message: 'confirm password length should be >=8' },
      { type: 'maxlength', message: 'password length.' },
    ],
  }

  constructor(public viewCtrl: ModalController,
    private user: UserService,
    public formBuilder: FormBuilder,
    private auth: AuthService) {
    this.useroldpass = localStorage.getItem('passwordforprofile');
    console.log('passwordfor-profile' + this.useroldpass)
    console.log(this.user.username);

    this.loginForm = this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      newpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ])),
      cpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ])),
    }, {
      // validators: this.password.bind(this)
      validators: this.password.bind(this)
    });
  }

  ngOnInit() { }
  isActiveToggleTextPassword: Boolean = true;
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;

  }
  togglepass(): void {
    this.showpassword = !this.showpassword;
    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    }
    else {
      this.passwordToggleIcon = 'eye';
    }
  }



  password(formGroup: FormGroup) {
    const newpasswordControl = formGroup.get('newpassword');
    const newpassword = newpasswordControl?.value;
    // const { value: newpassword } = formGroup.get('newpassword');
    const confirmPasswordControl =formGroup.get('cpassword');
    const confirmPassword = confirmPasswordControl?.value;
    // const { value: confirmPassword } = formGroup.get('cpassword');
    console.log(newpassword);
    return newpassword === confirmPassword ? null : { passwordNotMatch: true };
  }

  submit() {
    let pass = this.loginForm.value.password;
    let oldp = this.useroldpass;
    console.log(pass);
    console.log(oldp);
    if (pass != oldp) {
      console.log('error');
      this.user.showToast('please enter your old password. without entering old password you can update new password.')
    }
    else {
      console.log('success..');
      console.log(this.loginForm.value.password);
      console.log(this.loginForm.value.newpassword);
      console.log(this.loginForm.value.cpassword);
      let newPass = this.loginForm.value.cpassword;
      let newpass = {
        "password": newPass
      }
      this.user.present('please wait..')
      this.auth.updateAdminProfile(newpass).subscribe(res => {
        console.log(res);
        localStorage.clear();
        let bodylogin = {
          'username': this.user.username,
          'password': this.loginForm.value.cpassword
        }
        this.auth.loginUser(bodylogin).subscribe(res => {
          this.dismiss();
          this.user.dismiss();
          console.log(res);
        }, err => {
          this.dismiss();
          this.user.dismiss();
          this.user.showToast('something went wrong.please try again later.');
          console.log('login error');
        })

      }, err => {
        console.log('password change error.....')
      }
      )
    }
  }



  dismiss() {
    this.viewCtrl.dismiss();
  }

}
