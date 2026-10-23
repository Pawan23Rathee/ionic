import { Component, OnInit } from "@angular/core";
import {
  MenuController,
  ActionSheetController,
  ModalController, NavController
} from "@ionic/angular";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
// import { IrnumberComponent } from '../irnumber/irnumber.component';
import { IrremotemoreComponent } from "../irremotemore/irremotemore.component";
import { IrremotenumberComponent } from "../irremotenumber/irremotenumber.component";
import { NgxGaugeModule } from "ngx-gauge";

@Component({
  selector: "app-ir-remote",
  templateUrl: "./ir-remote.component.html",
  styleUrls: ["./ir-remote.component.scss"],
})
export class IrRemoteComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public user: UserService,
    public actionsheetCtrl: ActionSheetController,
    private router: Router,
    private modalController: ModalController,
    public navCtrl: NavController
  ) { }

  remote: string="";
  text:any;
  bar = 0;
  temp = 16;
  tempValue:any;
  fanstate = "FL";
  toggleStatus = "ON";
  keyid:any;
  device_id:any;
  button_value:any;
  token:any;
  allAcHex:any;
  capValue = "round";
  dType:any;
  tempArray = [
    { id: 16, val: "sixteen" },
    { id: 17, val: "seventeen" },
    { id: 18, val: "eighteen" },
    { id: 19, val: "nineteen" },
    { id: 20, val: "twenty" },
    { id: 21, val: "twentyone" },
    { id: 22, val: "twentytwo" },
    { id: 23, val: "twentythree" },
    { id: 24, val: "twentyfour" },
    { id: 25, val: "twentyfive" },
    { id: 26, val: "twentysix" },
    { id: 27, val: "twentyseven" },
    { id: 28, val: "twentyeight" },
    { id: 29, val: "twentynine" },
    { id: 30, val: "thirty" },
  ];
  remotetv = false;
  remoteac = false;
  ngOnInit() {
    console.log(this.user.productName);
    console.log(this.user.companyName);
    this.remote = this.user.productName;
    if (this.remote == "TELEVISION") {
      this.remotetv = true;
      this.remoteac = false;
      console.log(" tvclick" + this.remote);
    } else if (this.remote == "AC") {
      console.log("acclick" + this.remote);
      this.remotetv = false;
      this.remoteac = true;
    } else if (this.remote == "SETTOP BOX") {
      this.remotetv = true;
      this.remoteac = false;
      console.log(" tvclick" + this.remote);
    } else if (this.remote == "TATA sky") {
      this.remotetv = true;
      this.remoteac = false;
      console.log(" tvclick" + this.remote);
    } else if (this.remote == "DTH") {
      this.remotetv = true;
      this.remoteac = false;
      console.log(" tvclick" + this.remote);
    } else if (this.remote == "DVD PLAYER") {
      this.remotetv = true;
      this.remoteac = false;
      console.log(" tvclick" + this.remote);
    } else if (this.remote == "HOME THEATRE") {
      this.remotetv = true;
      this.remoteac = false;
      console.log(" tvclick" + this.remote);
    } else if (this.remote == "MUSIC SYSTEM") {
      this.remotetv = true;
      this.remoteac = false;
      console.log(" tvclick" + this.remote);
    } else if (this.remote == "MOOD LIGHTING") {
      this.remotetv = false;
      this.remoteac = false;
      // this.colorpick1();
    }
  }
  ionViewWillEnter() {
    console.log(this.user.productName);
    this.remote = this.user.productName;
  }

  keyPress(btnValue:any, event:any) {
    console.log(event);
    var d = document.getElementsByClassName("device_card1")[0];
    if (d != undefined) {
      d.classList.remove("device_card1");
    }

    console.log(document.getElementsByClassName("device_card1")[0]);
    event.currentTarget.classList.add("device_card1");
    console.log(this.user.moduleIdForKey);
    this.auth
      .pressKey(
        this.user.remoteIdforKeyPress,
        btnValue,
        this.user.moduleIdForKey
      )
      .subscribe((res) => { });
  }
  // power(btnValue){
  //   console.log(btnValue)
  //   this.auth.pressKey(this.user.remoteIdforKeyPress,"on",this.user.moduleIdForKey).subscribe(res=>{
  //   })
  // }
  pow = false;
  power(event:any) {
    let opacity = event.target.getAttribute("opacity");
    this.pow = !this.pow;
    if (this.pow) {
      event.currentTarget.setAttribute("fill", "#595959");
      event.currentTarget.setAttribute("style", "filter:floodColor:#FFF");
      this.keyPress("on", event);
    } else {
      //event.target.setAttribute('opacity',opacity + 0.2)
      event.currentTarget.setAttribute("fill", "#a3c2c2");
      event.currentTarget.removeAttribute("style", "filter:floodColors");
      this.keyPress("off", event);
    }
  }
  pressEffect(event:any) {
    let x = event.target.getAttribute("x");
    let y = event.target.getAttribute("y");
    let height = event.target.getAttribute("height");
    let width = event.target.getAttribute("width");
    let opacity = event.target.getAttribute("opacity");
    //  event.target.removeAttribute('x y height width')
    if (x == null) {
      event.target.setAttribute("opacity", opacity - 0.7);
      setTimeout(() => {
        event.target.setAttribute("opacity", opacity);
      }, 1000);
    }
    event.target.setAttribute("x", x + 2);
    event.target.setAttribute("y", y + 2);
    event.target.setAttribute("height", height - 2);
    event.target.setAttribute("width", width - 2);
    setTimeout(() => {
      //  event.target.removeAttribute('x y height width')
      event.target.setAttribute("x", x);
      event.target.setAttribute("y", y);
      event.target.setAttribute("height", height);
      event.target.setAttribute("width", width);
    }, 1000);
  }

  async irunmber() {
    const modal = await this.modalController.create({
      component: IrremotenumberComponent,
      cssClass: "my-custom-modal-css",
      componentProps: { remoteid: 29 },
    });
    return await modal.present();
  }

  async irmore() {
    console.log("ir remote more click...");
    const modal = await this.modalController.create({
      component: IrremotemoreComponent,
      cssClass: "my-custom-modal-css",
      componentProps: { remote_id: 29 },
    });
    return await modal.present();
  }

  gaugeType = "arch";
  gaugeValue = 22;
  gaugeLabel = "Temperature";
  gaugeAppendText = "°C";
  x = 36;
  y = 33;
  fanval = 20;
  current = 50;
  animate(e:any) {
    console.log(e.offsetX + "  " + this.x);
    let x = e.offsetX;
    let y = e.offsetY;
    if (x >= 0 || x <= 200) {
      if (x > this.x) {
        // alert("c")
        if (this.gaugeValue < 30) this.gaugeValue = this.gaugeValue + 1;
        this.x = x;
        this.y = y;
      } else if (this.x > x) {
        if (this.gaugeValue > 16) this.gaugeValue = this.gaugeValue - 1;
        this.x = x;
        this.y = y;
      }
    }
  }
  decrease() {
    if (this.gaugeValue > 18) {
      this.gaugeValue = this.gaugeValue - 1;
    }
  }
  increase() {
    if (this.gaugeValue < 30) {
      this.gaugeValue = this.gaugeValue + 1;
    }
  }

  getTemp(Cur_temp:any) {
    for (let tem of this.tempArray) {
      if (tem.id == Cur_temp) {
        this.tempValue = tem.val;
      }
    }
    //this.tempValue=this.gaugeValue;
  }

  minus(event:any) {
    console.log(event);
    if (this.gaugeValue > 16) {
      this.gaugeValue = this.gaugeValue - 1;
      this.getTemp(this.gaugeValue);
      let hexkey = this.tempValue + this.fanstate + this.toggleStatus;
      this.keyPress(hexkey, event);
    }
    //this.pressEffect(event)
  }

  plus(event:any) {
    console.log(event);
    if (this.gaugeValue < 30) {
      this.gaugeValue = this.gaugeValue + 1;
      this.getTemp(this.gaugeValue);
      let hexkey = this.tempValue + this.fanstate + this.toggleStatus;
      this.keyPress(hexkey, event);
    }
    // this.pressEffect(event)
  }
  //  fanUp(event){
  //   if(this.bar < 2){
  //    this.bar=this.bar+1;
  //   }
  //  let b=document.getElementsByClassName('bar1');
  //  let b1=document.getElementsByClassName('bar2');
  //   if(this.bar==2){
  //    this.fanstate='FH'
  //    for(let i=0;i<b1.length;i++){
  //      // b1[i].setAttribute('style','fill:rgba(32, 12, 46, 0.36)')
  //      b1[i].setAttribute('style','stroke:rgba(31,30,30,0.37)')
  //    }
  //    console.log(this.bar)
  //    this.getTemp(this.temp);
  //  let hexkey = this.tempValue+this.fanstate+this.toggleStatus;
  //  this.keyPress(hexkey,event);
  //   }
  //   if(this.bar==1){
  //    this.fanstate='FM'
  //    for(let i=0;i<b.length;i++){
  //      // b[i].setAttribute('style','fill:rgba(32, 12, 46, 0.36)')
  //      b[i].setAttribute('style','stroke:rgba(31,30,30,0.37)')
  //    }
  //    console.log(this.bar)
  //    this.getTemp(this.temp);
  //  let hexkey = this.tempValue+this.fanstate+this.toggleStatus;
  //  this.keyPress(hexkey,event);
  //   }
  //   this.pressEffect(event)
  // }
  // fanToggle = false;
  // fan(event){
  //  this.fanToggle = !this.fanToggle;
  //  if(this.fanToggle){
  //    this.fanstate = 'FL'
  //  } else {
  //    this.fanstate = 'A'
  //  }
  //  this.getTemp(this.temp);
  //  let hexkey = this.tempValue+this.fanstate+this.toggleStatus;
  //  this.keyPress(hexkey,event);
  //  this.pressEffect(event)
  // }
  //   fanDown(event){
  //     if(this.bar > 0){
  //       this.bar=this.bar-1;
  //      }
  //      let b=document.getElementsByClassName('bar1');
  //     let b1=document.getElementsByClassName('bar2');
  //     if(this.bar==1){
  //       this.fanstate='FM'
  //       for(let i=0;i<b1.length;i++){
  //         b1[i].removeAttribute('style')
  //         b1[i].setAttribute('style','stroke:white; fill:white')
  //         console.log(this.bar)
  //       }
  //     this.getTemp(this.temp);
  //     let hexkey = this.tempValue+this.fanstate+this.toggleStatus;
  //     this.keyPress(hexkey,event);
  //     }
  //     if(this.bar==0){
  //       this.fanstate='FL'
  //       for(let i=0;i<b.length;i++){
  //         b[i].removeAttribute('style')
  //         b[i].setAttribute('style','stroke:white; fill:white')
  //         console.log(b+'fgh'+this.bar)
  //         }
  //         this.getTemp(this.temp);
  //     let hexkey = this.tempValue+this.fanstate+this.toggleStatus;
  //     this.keyPress(hexkey,event);
  //       }

  //       this.pressEffect(event)
  //  }
  timer(event:any) {
    this.pressEffect(event);
  }
  swingToggle = false;
  //  swing(event){
  //   this.pressEffect(event)
  //    this.swingToggle = !this.swingToggle;
  //    if(this.swingToggle){
  //     this.toggleStatus = 'ON';
  //    } else {
  //     this.toggleStatus = 'OFF';
  //    }
  //    this.getTemp(this.temp);
  //   let hexkey = this.tempValue+this.fanstate+this.toggleStatus;
  //   this.keyPress(hexkey,event);
  //  }
  backbutton() {
    this.user.showDevice = false;
    this.user.showRoom = true;
  }
  changeVal(ev:any) {
    this.fanval = ev.currentTarget.value;
    //alert(this.fanval)
    if (this.fanval >= 20 && this.fanval <= 40) {
      this.fanstate = "FL";
    } else if (this.fanval > 40 && this.fanval <= 60) {
      this.fanstate = "FM";
    } else if (this.fanval > 60 && this.fanval <= 80) {
      this.fanstate = "FH";
    }
    let hexkey = "twentytwo" + this.fanstate + this.toggleStatus;
    this.keyPress(hexkey, ev);
  }

  async actionsheet() {
    const actionSheet = await this.actionsheetCtrl.create({
      header: "select ir remote",
      buttons: [
        {
          text: "Tam data Learning",
          icon: "md-add-circle",
          handler: () => {
            console.log("Tam remore");
            this.user.productName;
            this.user.companyName;
            this.router.navigateByUrl("/irdatacolletion");
          },
        },

        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }
  sendmoodType(btnValue:any) {
    // this.btnValue=this.user.moodtype;
    console.log(btnValue);
    // console.log(this.user.moodtype)
    // console.log(this.user.moodDevice_id)
    //  this.auth.putMoodTypeFromApi(this.user.moodDevice_id,this.user.moodtype).subscribe(res=>{
    //     console.log(res)
    //     this.navCtrl.navigateRoot('/mainpage');
    // },err=>{console.log(err.error)})
    console.log(this.user.moduleIdForKey);
    this.user.present('');
    this.auth.pressKey(this.user.remoteIdforKeyPress, btnValue, this.user.moduleIdForKey).subscribe(res => {
      this.user.dismiss();
    }, err => {
      this.user.dismiss()
    })
  }
  sendmoodcolor() {
    console.log(" click")
    console.log(this.user.moodDevice_id)
    var colorcode = (<HTMLInputElement>document.querySelector('#hexVal')).value;
    console.log(colorcode)
    debugger
    this.auth.putColorCodeFromApi(this.user.moodDevice_id, colorcode).subscribe(res => {
      console.log(res)
      this.navCtrl.navigateRoot('/mainpage');
    }, err => {
      err.console.error();
    })
  }
  checkChecked(e:any) {
    this.dType = e.currentTarget.value;
    console.log(this.dType);
    this.user.moodtype = this.dType;
    console.log(this.user.moodDevice_id)
    //  this.auth.putMoodTypeFromApi(this.user.moodDevice_id,this.user.moodtype).subscribe(res=>{
    //     console.log(res)
    //     this.navCtrl.navigateRoot('/mainpage');
    // },err=>{console.log(err.error)})
  }
  colorpick1() {
    var bCanPreview = true; // can preview
    // create canvas and context objects
    var canvas = <HTMLCanvasElement>document.getElementById('picker');
    var ctx = canvas.getContext('2d');
    // drawing active image
    var image = new Image();
    
    image.onload = function () {
      if(ctx){
        ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
      }
    }
    // select desired colorwheel
    var imageSrc = '../../../assets/images/colorwheel5.png';
    switch ($(canvas).attr('var')) {
      case '2':
        imageSrc = 'assets/images/colorwheel2.png';
        break;
      case '3':
        imageSrc = 'assets/images/colorwheel3.png';
        break;
      case '4':
        imageSrc = 'assets/images/colorwheel4.png';
        break;
      case '5':
        imageSrc = '../../../assets/images/colorwheel5.png';
        break;
    }
    image.src = imageSrc;
    var self = this;
    $('#picker').mousemove(function (e) { // mouse move handler
      if (bCanPreview) {
        // get coordinates of current position
        var canvasOffset = $(canvas).offset();
        var canvasX:any;
        var canvasY:any;
        if(canvasOffset){
           canvasX = Math.floor(e.pageX - canvasOffset.left);
           canvasY = Math.floor(e.pageY - canvasOffset.top);
        }
       
        // get current pixel
        var imageData:any
        if(ctx){
           imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
        }

        
        var pixel = imageData.data;
        // update preview color
        var pixelColor = "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
        $('.preview').css('backgroundColor', pixelColor);
        // update controls
        $('#rVal').val(pixel[0]);
        $('#gVal').val(pixel[1]);
        $('#bVal').val(pixel[2]);
        $('#rgbVal').val(pixel[0] + ',' + pixel[1] + ',' + pixel[2]);
        var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
        $('#hexVal').val('#' + ('0000' + dColor.toString(16)).substr(-6));
        var abc = $('#hexVal').val('#' + ('0000' + dColor.toString(16)).substr(-6));
        console.log(dColor);


      }
      var colorcode = (<HTMLInputElement>document.querySelector('#hexVal')).value;
      console.log(colorcode);
      if (colorcode == "#0154a4" || colorcode == "#3276b5" || colorcode == "#85acd3" || colorcode == "#cedeed" || colorcode == "#eaf1f7") {
        console.log("blue");
        self.user.present('');
        let btnValue = "up_button";
        self.auth.pressKey(self.user.remoteIdforKeyPress, btnValue, self.user.moduleIdForKey).subscribe(res => {
          self.user.dismiss();
        }, err => {
          self.user.dismiss()
        })
      }
      else if (colorcode == "#ed1b24" || colorcode == "#ef444a" || colorcode == "#f69195" || colorcode == "#fbd3d4" || colorcode == "#fdedee" || colorcode == "#f04950") {
        console.log("red");
        // self.bluecall();
        self.user.present('');
        let btnValue = "down_button";
        self.auth.pressKey(self.user.remoteIdforKeyPress, btnValue, self.user.moduleIdForKey).subscribe(res => {
          self.user.dismiss();
        }, err => {
          self.user.dismiss()
        })
      }
      else if (colorcode == "#6b439b" || colorcode == "#8869ad" || colorcode == "#b7a5cd" || colorcode == "#e3daeb" || colorcode == "#f3f0f7") {
        console.log("purple");
        self.user.present('');
        let btnValue = "left_button";
        self.auth.pressKey(self.user.remoteIdforKeyPress, btnValue, self.user.moduleIdForKey).subscribe(res => {
          self.user.dismiss();
        }, err => {
          self.user.dismiss()
        })
      }
      else if (colorcode == "#a64499" || colorcode == "#b868ad" || colorcode == "#d3a4ce" || colorcode == "#eddbeb" || colorcode == "f770f7") {
        console.log("violet purple");
        self.user.present('');
        let btnValue = "right_button";
        self.auth.pressKey(self.user.remoteIdforKeyPress, btnValue, self.user.moduleIdForKey).subscribe(res => {
          self.user.dismiss();
        }, err => {
          self.user.dismiss()
        })
      }
      else if (colorcode == "#e44097" || colorcode == "#e966ac" || colorcode == "#f1a3cd" || colorcode == "#fad9ea" || colorcode == "#fcaff6") {
        console.log("vivid pink");
        self.user.present('');
        let btnValue = "select_button";
        self.auth.pressKey(self.user.remoteIdforKeyPress, btnValue, self.user.moduleIdForKey).subscribe(res => {
          self.user.dismiss();
        }, err => {
          self.user.dismiss()
        })

      }
      else if (colorcode == "#f37020" || colorcode == "#f58d4e" || colorcode == "#f9bb94" || colorcode == "#fde3d4" || colorcode == "#fef3ed") {
        console.log("bright orange");
        self.user.present('');
        let btnValue = "exit_button";
        self.auth.pressKey(self.user.remoteIdforKeyPress, btnValue, self.user.moduleIdForKey).subscribe(res => {
          self.user.dismiss();
        }, err => {
          self.user.dismiss()
        })

      }
      else if (colorcode == "#f78f1e" || colorcode == "#f9a544b" || colorcode == "#fbc994" || colorcode == "#fde8d3" || colorcode == "#f3f5ee") {
        console.log("orange");
        self.user.present('');
        let btnValue = "play_button";
        self.auth.pressKey(self.user.remoteIdforKeyPress, btnValue, self.user.moduleIdForKey).subscribe(res => {
          self.user.dismiss();
        }, err => {
          self.user.dismiss()
        })

      }
      else if (colorcode == "#f78f1e" || colorcode == "#f9a54b" || colorcode == "#fbc994" || colorcode == "#fde8d3" || colorcode == "#fef5ee") {
        console.log("amber");
        self.user.present('');
        let btnValue = "pause_button";
        self.auth.pressKey(self.user.remoteIdforKeyPress, btnValue, self.user.moduleIdForKey).subscribe(res => {
          self.user.dismiss();
        }, err => {
          self.user.dismiss()
        })
      }

      else if (colorcode == "#fef200" || colorcode == "#fff533" || colorcode == "#fef984" || colorcode == "#fffded" || colorcode == "#ffeea9") {
        console.log("yellow");
        self.user.present('');
        let btnValue = "record_button";
        self.auth.pressKey(self.user.remoteIdforKeyPress, btnValue, self.user.moduleIdForKey).subscribe(res => {
          self.user.dismiss();
        }, err => {
          self.user.dismiss()
        })

      }
      else if (colorcode == "#8dfc07" || colorcode == "#a3fd39" || colorcode == "#c8fd87" || colorcode == "#e9ffd0" || colorcode == "#f6ffec") {
        console.log("electric indigo");
        self.user.present('');
        let btnValue = "previous_button";
        self.auth.pressKey(self.user.remoteIdforKeyPress, btnValue, self.user.moduleIdForKey).subscribe(res => {
          self.user.dismiss();
        }, err => {
          self.user.dismiss()
        })

      }
      else if (colorcode == "#00a88f" || colorcode == "#33b8a5" || colorcode == "#84d4c9" || colorcode == "#ceeeed" || colorcode == "#ecf8f6") {
        console.log("persian green");
        self.user.present('');
        let btnValue = "next_button";
        self.auth.pressKey(self.user.remoteIdforKeyPress, btnValue, self.user.moduleIdForKey).subscribe(res => {
          self.user.dismiss();
        }, err => {
          self.user.dismiss()
        })

      }
      else if (colorcode == "#0092ce" || colorcode == "#33a7d8" || colorcode == "#85acd3" || colorcode == "#cedeed" || colorcode == "#e9f0f6") {
        console.log("pacfic blue");
        self.user.present('');
        let btnValue = "fast_forward_button";
        self.auth.pressKey(self.user.remoteIdforKeyPress, btnValue, self.user.moduleIdForKey).subscribe(res => {
          self.user.dismiss();
        }, err => {
          self.user.dismiss()
        })

      }

      // this.colorcode1=colorcode;
    });

    this
    $('#picker').click(function (e) { // click event handler
      bCanPreview = !bCanPreview;

    });
    $('.preview').click(function (e) { // preview click
      $('.colorpicker').fadeToggle("slow", "linear");
      bCanPreview = true;
    });


  }
}
