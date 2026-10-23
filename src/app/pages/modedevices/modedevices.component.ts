import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController,LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
@Component({
  selector: 'app-modedevices',
  templateUrl: './modedevices.component.html',
  styleUrls: ['./modedevices.component.scss'],
})
export class ModedevicesComponent implements OnInit {

  constructor(public modalCtrl: ModalController,
    private auth: AuthService,
    private navCtrl: NavController,
    private loadingController:LoadingController) { }

  @Input() dev_data: any;
  @Input() modeTitle: any;
  @Input() modId: any;
  nodelete = true;
  delete = false;
  loading:any;
  ngOnInit() { 
    console.log("check dev_Dasta",this.dev_data);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async showLoading() {
     this.loading = await this.loadingController.create({
      message: 'Activating.',
      // duration: 3000,
    });
    this.loading.present();
    
  }
  activate(modId: any) {
    console.log("modeId: " + modId)
    this.showLoading();

    this.auth.activateMode(modId).subscribe(res => {
      console.log(res);
      this.loading.dismiss();
      // this.showLoading();
      // let timerInterval: any;
      // Swal.fire("Activating Mode...");
      // Swal.fire({
      //   title: 'Activating Mode...',
      //   timer: 20000,
      //   timerProgressBar: true,
      //   // color: '#716add',
      //   color: 'black',
      //   padding: '3em',
       
      //   didOpen: () => {
      //     Swal.showLoading();
      //     timerInterval = setInterval(() => {
      //     // const content = Swal.getContent();
      //     // const content = Swal.getHtmlContainer();
      //     }, 100)
      //   },
      //   willClose: () => {
      //     clearInterval(timerInterval)
      //   }
      // })
      // .then((result: any) => {
      //   if (result.dismiss === Swal.DismissReason.timer) {
      //     const content = Swal.getHtmlContainer();
      //     console.log('I was closed by the timer')
      //   }
      // })


    })
  }

  del_Mod_device(id: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.auth.del_Mod_device(id).subscribe(res => {
          console.log(res);
          for (let i = 0; i < this.dev_data.length; i++) {
            if (this.dev_data[i].id == id) {
              this.dev_data.splice(i, 1);
            }

          }

        })


      }
    })
  }
  notify(event: any, dimmer: any, status: any, mode_id: any, device: any) {
    console.log("toggled: " + event.target.checked);
    console.log(this.dev_data);
    console.log(this.modId)
    console.log(mode_id)
    let dev_Detail = {
      dimmer: dimmer,
      device: device,
      mode: this.modId,
      status: event.target.checked
    };
    //alert(JSON.stringify(dev_Detail));
    this.auth.addModeDevices(dev_Detail).subscribe(res => {
      //alert(JSON.stringify(res));
      //console.log(res);
    })
  }


  dimmerChange(dim: any, device: any) {
    console.log('dimmer call..');
    console.log(dim);
    console.log(device);
    console.log(this.modId);
    let dev_Detail1 = {
      mode: this.modId,
      device: device,
      dimmer: dim,
    };
    this.auth.mode_dimmer(dev_Detail1).subscribe(res => {
      console.log("dimmer res:" + res);
    }, err => {
      console.log("dimmer change..:" + err.error)
    })
  }
  addNewMode() {
    console.log("in");
    this.modalCtrl.dismiss({
      'dismissed': true
    });
    this.navCtrl.navigateForward(['/addmode']);
  }

}
