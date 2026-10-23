import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { UserService } from 'src/app/services/user.service';
import { Swiper } from 'swiper';
@Component({
  selector: 'app-addmode',
  templateUrl: './addmode.component.html',
  styleUrls: ['./addmode.component.scss'],
})
export class AddmodeComponent implements OnInit {
  sliderOne = {
    isBeginningSlide: true,
    isEndSlide: false,
    slidesItems: [
      {
        id: 'a',
        name: 'Night',
        image: '../../assets/images/night.jpeg'
      },
      {
        id: 'b',
        name: 'Party',
        image: '../../assets/images/party.jpg'
      },
      {
        id: 'c',
        name: 'Relax',
        image: '../../assets/images/relax.png'
      },
      {
        id: 'd',
        name: 'Romance',
        image: '../../assets/images/romance.jpg'
      },
      {
        id: 'e',
        name: 'Summer',
        image: '../../assets/images/summer.jpg'
      },
      {
        id: 'f',
        name: 'Festival',
        image: '../../assets/images/festival.jpg'
      },
      {
        id: 'g',
        name: 'Energy',
        image: '../../assets/images/energy2.png'
      }
    ]
  };
  index = 0;
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  constructor(
    public navController: NavController,
    private auth: AuthService,
    private user: UserService) { }

  ngOnInit() { }
  navBack() {
    this.navController.navigateRoot('/mode');
  }
  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
    this.index = 0;
    // console.log("acitveIndex",this.swiper.getActiveIndex);
  }
  setmode(form: any) {
    // console.log(this.selectedDevs)
    this.user.present('Creating Mode...');
    const item = this.sliderOne.slidesItems[this.index];
    let mod_name;
    console.log("Item", item);
    console.log("form value", form.value);
    if (form.value.modename == '') {
      // this.source.push({
      //   img: item.image,
      //   mname: item.name} );
      mod_name = item.id + item.name
    } else {
      // this.source.push({
      //   img: item.image,
      //   mname: form.value.modename} );
      mod_name = item.id + form.value.modename;
    }

    this.auth.createMode(mod_name).subscribe(res => {
      console.log(res)
      this.user.dismiss();
      // let timerInterval
      // Swal.fire({
      //   title: 'Creating Mode...',
      //   timer: 2000,
      //   timerProgressBar: true,
      //   // onBeforeOpen: () => {
      //   //   Swal.showLoading()
      //   //   timerInterval = setInterval(() => {
      //   //     const content = Swal.getContent()
      //   //   }, 100)
      //   // },
      //   // onClose: () => {
      //   //   clearInterval(timerInterval)
      //   // }
      // }).then((result) => {
      //   /* Read more about handling dismissals below */
      //   if (result.dismiss === Swal.DismissReason.timer) {
      //     console.log('I was closed by the timer')
      //   }
      // })
      this.navController.navigateRoot("/mode");
      // this.auth.refreshPage();
    })
  }

  // getcurrentimg(object: any, slideView: any) {
  //   slideView.getActiveIndex().then((i: any) => {
  //     this.index = i;
  //     // console.log(i);
  //   });
  // }
  swiperSlideChanged(e: any) {
    this.index = e.detail[0].activeIndex;
    console.log("thisindex",this.index);
  }
  // Move to Next slide
  slideNext(object: any, slideView: any) {
    // slideView.slideNext(500).then(() => {
    //   this.checkIfNavDisabled(object, slideView);
    // });
    // this.swiper?.slideNext();
  }

  // Move to previous slide
  slidePrev(object: any, slideView: any) {
    // slideView.slidePrev(500).then(() => {
    //   this.checkIfNavDisabled(object, slideView);
    // });
    // this.swiper?.slidePrev();
  }
  // Method called when slide is changed by drag or navigation
  // SlideDidChange(object: any, slideView: any) {
  //   this.checkIfNavDisabled(object, slideView);
  // }
  // checkIfNavDisabled(object: any, slideView: any) {
  //   this.checkisBeginning(object, slideView);
  //   this.checkisEnd(object, slideView);
  // }
  // checkisBeginning(object: any, slideView: any) {
  //   slideView.isBeginning().then((istrue: any) => {
  //     object.isBeginningSlide = istrue;
  //   });
  // }
  // checkisEnd(object: any, slideView: any) {
  //   slideView.isEnd().then((istrue: any) => {
  //     object.isEndSlide = istrue;
  //   });
  // }
}
