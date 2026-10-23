import { Component, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
declare var CameraCustom: any;

@Component({
  selector: "app-tuya-rgb-control",
  templateUrl: "./tuya-rgb-control.component.html",
  styleUrls: ["./tuya-rgb-control.component.scss"],
})
export class TuyaRgbControlComponent implements OnInit {
  device_status_res: any;
  dev_status: any;
  d_online = false;
  d_name: any;
  d_brightness: number = 0;
  d_temperature: number = 0;
  d_mode: any;
  d_scene: any;
  d_id: any;
  onDevice: boolean = false;
  d_hue: number = 0;
  d_saturation: number = 100;
  d_value: number = 39.2;
  d_hsvtohex: any;

  constructor(
    public activateRoute: ActivatedRoute,
    private zone: NgZone,
    private user: UserService,
    private auth: AuthService
  ) {
    this.activateRoute.queryParams.subscribe((params) => {
      this.d_id = params['id'];
      this.d_name = params['name'];
      this.d_online = params['isOnline'];
    });
  }

  ngOnInit() {
    let body = { id: this.d_id };
    console.log("testing25");
    console.log(JSON.stringify(body));
    //let rgb = this.hsv2rgb(this.d_hue, this.d_saturation, this.d_value);
    //this.setHexColor();

    CameraCustom.rgbLightStatus(
      body,
      (res: any) => {
        //alert(JSON.stringify(res));
        console.log(JSON.stringify(res));
        this.d_brightness = res.brightness;
        this.d_temperature = res.colorTemperature;
        switch (res.workMode) {
          case "MODE_WHITE":
            this.d_mode = "white";
            break;
          case "MODE_COLOUR":
            this.d_mode = "color";
            break;
          case "MODE_SCENE":
            this.d_mode = "scene";
            break;
        }
        switch (res.scene) {
          case "SCENE_CASUAL":
            this.d_scene = "casual";
            break;
          case "SCENE_GOODNIGHT":
            this.d_scene = "goodnight";
            break;
          case "SCENE_WORK":
            this.d_scene = "work";
            break;
          case "SCENE_READ":
            this.d_scene = "read";
            break;
        }
        this.onDevice = res.powerSwitch;

        this.d_hue = res.hue;
        this.d_saturation = res.saturation;
        this.d_value = res.value;
        //this.setHexColor();
        this.colorpick1();
        this.initialColor();
      },
      (err: any) => { }
    );
  }
  changeMode() {
    let body = { id: this.d_id, workMode: this.d_mode };
    CameraCustom.rgbLightWorkMode(
      body,
      (res: any) => { },
      (err: any) => {
        alert(JSON.stringify(err));
      }
    );
  }
  changeScene() {
    let body = { id: this.d_id, scene: this.d_scene };
    CameraCustom.rgbLightScene(
      body,
      (res: any) => { },
      (err: any) => {
        alert(JSON.stringify(err));
      }
    );
  }
  changeColor() {
    /*     this.d_hue = Number(
      (<HTMLInputElement>document.getElementById("huevalue")).value
    );
    this.d_saturation = Number(
      (<HTMLInputElement>document.getElementById("saturationvalute")).value
    );
    this.d_value = Number(
      (<HTMLInputElement>document.getElementById("valuevalue")).value
    ); */
    let body = {
      id: this.d_id,
      hue: this.d_hue,
      saturation: this.d_saturation,
      value: this.d_value,
    };
    //alert(JSON.stringify(body));
    CameraCustom.rgbLightColorHSV(
      body,
      (res: any) => { },
      (err: any) => {
        alert(JSON.stringify(err));
      }
    );
  }
  setTemperature() {
    this.d_temperature = Number(
      (<HTMLInputElement>document.getElementById("temperaturedimmervalue"))
        .value
    );
    let body = { id: this.d_id, percentage: this.d_temperature };
    CameraCustom.rgbLightColorTemperature(
      body,
      (res: any) => { },
      (err: any) => {
        alert(JSON.stringify(err));
      }
    );
  }
  setBrightness() {
    this.d_brightness = Number(
      (<HTMLInputElement>document.getElementById("brightnessdimmervalue")).value
    );
    let body = { id: this.d_id, percentage: this.d_brightness };
    CameraCustom.rgbLightBrightness(
      body,
      (res: any) => { },
      (err: any) => {
        alert(JSON.stringify(err));
      }
    );
  }
  powerStatus(status: String) {
    let onoff = false;
    if (status == "on") {
      onoff = true;
    }
    let body = { id: this.d_id, onoff: onoff };
    CameraCustom.rgbLightPowerSwitch(
      body,
      (res: any) => {
        //alert(this.onDevice);
        this.zone.run(() => {
          this.onDevice = !this.onDevice;
        });
      },
      (err: any) => {
        alert(JSON.stringify(err));
      }
    );
  }
  mix(a: any, b: any, v: any) {
    return (1 - v) * a + v * b;
  }
  hsv2rgb(H: any, S: any, V: any) {
    var V2 = V * (1 - S);
    var r =
      (H >= 0 && H <= 60) || (H >= 300 && H <= 360)
        ? V
        : H >= 120 && H <= 240
          ? V2
          : H >= 60 && H <= 120
            ? this.mix(V, V2, (H - 60) / 60)
            : H >= 240 && H <= 300
              ? this.mix(V2, V, (H - 240) / 60)
              : 0;
    var g =
      H >= 60 && H <= 180
        ? V
        : H >= 240 && H <= 360
          ? V2
          : H >= 0 && H <= 60
            ? this.mix(V2, V, H / 60)
            : H >= 180 && H <= 240
              ? this.mix(V, V2, (H - 180) / 60)
              : 0;
    var b =
      H >= 0 && H <= 120
        ? V2
        : H >= 180 && H <= 300
          ? V
          : H >= 120 && H <= 180
            ? this.mix(V2, V, (H - 120) / 60)
            : H >= 300 && H <= 360
              ? this.mix(V, V2, (H - 300) / 60)
              : 0;

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }

  initialColor() {
    let rgb = this.hsv2rgb(
      this.d_hue,
      this.d_saturation / 100,
      this.d_value / 100
    );
    var pixelColor = "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
    $(".preview").css("backgroundColor", pixelColor);
  }
  rgb2hsv(r: any, g: any, b: any) {
    let rabs, gabs, babs, rr, gg, bb, h: any, s, v: any, diff: any, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    (v = Math.max(rabs, gabs, babs)), (diff = v - Math.min(rabs, gabs, babs));
    diffc = (c: any) => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = (num: any) => Math.round((num * 100) / 100);
    if (diff == 0) {
      h = s = 0;
    } else {
      s = diff / v;
      rr = diffc(rabs);
      gg = diffc(gabs);
      bb = diffc(babs);

      if (rabs === v) {
        h = bb - gg;
      } else if (gabs === v) {
        h = 1 / 3 + rr - bb;
      } else if (babs === v) {
        h = 2 / 3 + gg - rr;
      }
      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
    }
    return {
      h: Math.round(h * 360),
      s: percentRoundFn(s * 100),
      v: percentRoundFn(v * 100),
    };
  }

  colorpick1() {
    var bCanPreview = true; // can preview
    // create canvas and context objects
    var canvas = <HTMLCanvasElement>document.getElementById("picker") as HTMLCanvasElement;
    var ctx = canvas.getContext("2d");
    // drawing active image
    var image = new Image();
    image.onload = function () {
      if (ctx) {
        ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
      }
    };
    // select desired colorwheel
    var imageSrc = "../../../assets/images/colorwheel5.png";
    switch ($(canvas).attr("var")) {
      case "2":
        imageSrc = "assets/images/colorwheel2.png";
        break;
      case "3":
        imageSrc = "assets/images/colorwheel3.png";
        break;
      case "4":
        imageSrc = "assets/images/colorwheel4.png";
        break;
      case "5":
        imageSrc = "../../../assets/images/colorwheel5.png";
        break;
    }
    image.src = imageSrc;
    var self = this;
    $("#picker").mousemove(function (e) {
      // mouse move handler
      if (bCanPreview) {
        // get coordinates of current position
        var canvasOffset = $(canvas).offset();
        var canvasX:any;
        var canvasY:any
        if(canvasOffset){
          canvasX = Math.floor(e.pageX - canvasOffset.left);
          canvasY = Math.floor(e.pageY - canvasOffset.top);
        }

        
        // get current pixel
        if (ctx) {
          var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
          var pixel = imageData.data;
          // update preview color
          var pixelColor =
            "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
          $(".preview").css("backgroundColor", pixelColor);
          var rgb = self.rgb2hsv(pixel[0], pixel[1], pixel[2]);
          self.d_hue = rgb.h;
          self.d_saturation = rgb.s;
          self.d_value = rgb.v;
          // update controls
          $("#rVal").val(pixel[0]);
          $("#gVal").val(pixel[1]);
          $("#bVal").val(pixel[2]);
          $("#rgbVal").val(pixel[0] + "," + pixel[1] + "," + pixel[2]);
          var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
          $("#hexVal").val("#" + ("0000" + dColor.toString(16)).substr(-6));
          var abc = $("#hexVal").val(
            "#" + ("0000" + dColor.toString(16)).substr(-6)
          );
          console.log(dColor);
        }
      }
      var colorcode = (<HTMLInputElement>document.querySelector("#hexVal"))
        .value;
      console.log(colorcode);

      // this.colorcode1=colorcode;
    });

    $("#picker").click(function (e: any) {
      // click event handler
      bCanPreview = !bCanPreview;
    });
    $(".preview").click(function (e: any) {
      // preview click
      $(".colorpicker").fadeToggle("slow", "linear");
      bCanPreview = true;
    });
  }
  backbutton() {
    this.user.showDevice = false;
    this.user.showRoom = true;
  }
}
