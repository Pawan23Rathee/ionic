import { Component, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { Router } from '@angular/router';
import { PrivacyComponent } from "../pages/privacy/privacy.component";
import { Swiper } from 'swiper';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  // @ViewChildren("slides") slides: any;
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  selectedSlide: any;
  buttonName = "Skip";
  imageUrl: string = '../../assets/thomes/home1.jpg';
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  // slideOpts = {
  //   on: {
  //     beforeInit() {
  //       const swiper = this;
  //       swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
  //       const overwriteParams = {
  //         slidesPerView: 1,
  //         slidesPerColumn: 1,
  //         slidesPerGroup: 1,
  //         watchSlidesProgress: true,
  //         spaceBetween: 0,
  //         virtualTranslate: true,
  //       };
  //       swiper.params = Object.assign(swiper.params, overwriteParams);
  //       swiper.params = Object.assign(swiper.originalParams, overwriteParams);
  //     },
  //     setTranslate() {
  //       const swiper = this;
  //       const { slides } = swiper;
  //       for (let i = 0; i < slides.length; i += 1) {
  //         const $slideEl = swiper.slides.eq(i);
  //         const offset$$1 = $slideEl[0].swiperSlideOffset;
  //         let tx = -offset$$1;
  //         if (!swiper.params.virtualTranslate) tx -= swiper.translate;
  //         let ty = 0;
  //         if (!swiper.isHorizontal()) {
  //           ty = tx;
  //           tx = 0;
  //         }
  //         const slideOpacity = swiper.params.fadeEffect.crossFade
  //           ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
  //           : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
  //         $slideEl
  //           .css({
  //             opacity: slideOpacity,
  //           })
  //           .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
  //       }
  //     },
  //     setTransition(duration) {
  //       const swiper = this;
  //       const { slides, $wrapperEl } = swiper;
  //       slides.transition(duration);
  //       if (swiper.params.virtualTranslate && duration !== 0) {
  //         let eventTriggered = false;
  //         slides.transitionEnd(() => {
  //           if (eventTriggered) return;
  //           if (!swiper || swiper.destroyed) return;
  //           eventTriggered = true;
  //           swiper.animating = false;
  //           const triggerEvents = ["webkitTransitionEnd", "transitionend"];
  //           for (let i = 0; i < triggerEvents.length; i += 1) {
  //             $wrapperEl.trigger(triggerEvents[i]);
  //           }
  //         });
  //       }
  //     },
  //   },
  // };
  constructor(private router: Router, public modalCtrl: ModalController) {

  }
  ngOnInit() {
    this.showModal();
  }
  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }
  ionSlideChange(slides: any) {
    this.selectedSlide = slides;
    console.log('changed: ', slides.detail[0].activeIndex);
    let res = slides.detail[0].activeIndex;
    if (res == 0) {
      this.buttonName = "Skip";
      this.imageUrl = '../../assets/thomes/home1.jpg';
    } else if (res == 1) {
      this.imageUrl = '../../assets/thomes/home2.jpg';
      this.buttonName = "Skip";
    } else {
      this.imageUrl = '../../assets/thomes/home3.jpg'
      this.buttonName = "Get Started";
    }
  }
  
  newUser(){
    this.router.navigateByUrl("/register");
  }
  skipClick() {
    this.router.navigateByUrl("/login");
  }
  async showModal() {
    const modal = await this.modalCtrl.create({
      component: PrivacyComponent,
      cssClass: "my-modal",
    });
    return await modal.present();
  }
}

