import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { SideMenuComponent } from './pages/side-menu/side-menu.component';
import { SupportComponent } from './pages/support/support.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AllmoduleComponent } from './pages/allmodule/allmodule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdatepassComponent } from './pages/updatepass/updatepass.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { AddlockinroomComponent } from './pages/addlockinroom/addlockinroom.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { EditdeviceComponent } from './pages/editdevice/editdevice.component';
import { SecuritydevicesComponent } from './pages/securitydevices/securitydevices.component';
import { LightdevicesComponent } from './pages/lightdevices/lightdevices.component';
import { TamdevicesComponent } from './pages/tamdevices/tamdevices.component';
import { WifiSettingsComponent } from './pages/wifi-settings/wifi-settings.component';
import { ModulecategoryComponent } from './pages/modulecategory/modulecategory.component';
import { SublightdeviceComponent } from './pages/sublightdevice/sublightdevice.component';
import { AllRemoteComponent } from './pages/all-remote/all-remote.component';
import { IrCompanyComponent } from './pages/ir-company/ir-company.component';
import { IrProductComponent } from './pages/ir-product/ir-product.component';
import { IrremotenumberComponent } from './pages/irremotenumber/irremotenumber.component';
import { IrRemoteComponent } from './pages/ir-remote/ir-remote.component';
import { IrremotemoreComponent } from './pages/irremotemore/irremotemore.component';
import { FaqComponent } from './pages/faq/faq.component';

import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
// import { Hotspot } from '@ionic-native/hotspot/ngx';
import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2/ngx';
import { FavlistComponent } from './pages/favlist/favlist.component';
import { FavstatusComponent } from './pages/favstatus/favstatus.component';
import { AutomationdevicesComponent } from './pages/automationdevices/automationdevices.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ForgetpassComponent } from './pages/forgetpass/forgetpass.component';
import { ModesComponent } from './pages/modes/modes.component';
import { ModedevicesComponent } from './pages/modedevices/modedevices.component';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { DevicestatusComponent } from './pages/devicestatus/devicestatus.component';
import { AddschedulesComponent } from './pages/addschedules/addschedules.component';
import { GuestComponent } from './pages/guest/guest.component';
import { EnergychartComponent } from './pages/energychart/energychart.component';
import { DevicemanagemnetComponent } from './pages/devicemanagemnet/devicemanagemnet.component';
import { NewTabComponent } from './pages/new-tab/new-tab.component';
import { RoomsetupComponent } from './pages/roomsetup/roomsetup.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { AddTuyaComponent } from './pages/add-tuya/add-tuya.component';
import { CameraFuncComponent } from './pages/camera-func/camera-func.component';
//import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { TuyaSmartSceneComponent } from './pages/tuya-smart-scene/tuya-smart-scene.component';
import { TuyaMessageComponent } from './pages/tuya-message/tuya-message.component';
import { TuyaShareComponent } from './pages/tuya-share/tuya-share.component';
import { TuyaMembersComponent } from './pages/tuya-members/tuya-members.component';
import { Deeplinks } from '@awesome-cordova-plugins/deeplinks/ngx';
// import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { QrcodeTuyaComponent } from './pages/qrcode-tuya/qrcode-tuya.component';
import { LinkSuccessComponent } from './pages/link-success/link-success.component';
import { AlexaLinkComponent } from './pages/alexa-link/alexa-link.component';
import { TuyalockComponent } from './pages/tuyalock/tuyalock.component';
import { TuyalockfuncComponent } from './pages/tuyalockfunc/tuyalockfunc.component';
import { TempPassComponent } from './pages/temp-pass/temp-pass.component';
import { LockRecorsComponent } from './pages/lock-recors/lock-recors.component';
import { UserFuncComponent } from './pages/user-func/user-func.component';
import { AlarmMsgComponent } from './pages/alarm-msg/alarm-msg.component';
import { ConsentpageComponent } from './pages/consentpage/consentpage.component';
import { LinkSuccessUiComponent } from './pages/link-success-ui/link-success-ui.component';
import { Network } from '@awesome-cordova-plugins/network/ngx';
//import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/v4";
//import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
//import { QRCodeModule } from 'angularx-qrcode';
//import { NgxQRCodeModule } from 'ngx-qrcode2';
// import { FCM } from '@ionic-native/fcm/ngx';
//import { NgxGaugeModule } from 'ngx-gauge';

import { TtlockaddComponent } from './ttlock/ttlockadd/ttlockadd.component';
import { TtlockautolocktimeComponent } from './ttlock/ttlockautolocktime/ttlockautolocktime.component';
import { TtlockbatteryComponent } from './ttlock/ttlockbattery/ttlockbattery.component';
import { TtlockdetailsComponent } from './ttlock/ttlockdetails/ttlockdetails.component';
import { TtlockekeylistComponent } from './ttlock/ttlockekeylist/ttlockekeylist.component';
import { TtlockekeysendComponent } from './ttlock/ttlockekeysend/ttlockekeysend.component';
import { TtlockfingeraddComponent } from './ttlock/ttlockfingeradd/ttlockfingeradd.component';
import { TtlockfingerlistComponent } from './ttlock/ttlockfingerlist/ttlockfingerlist.component';
import { TtlockgatewayinitComponent } from './ttlock/ttlockgatewayinit/ttlockgatewayinit.component';
import { TtlockgatewaylistComponent } from './ttlock/ttlockgatewaylist/ttlockgatewaylist.component';
import { TtlockgatewaylockunlockComponent } from './ttlock/ttlockgatewaylockunlock/ttlockgatewaylockunlock.component';
import { TtlockgatewayoperationComponent } from './ttlock/ttlockgatewayoperation/ttlockgatewayoperation.component';
import { TtlockgatewayuiComponent } from './ttlock/ttlockgatewayui/ttlockgatewayui.component';
import { TtlocknameComponent } from './ttlock/ttlockname/ttlockname.component';
import { TtlockoperationComponent } from './ttlock/ttlockoperation/ttlockoperation.component';
import { TtlockpasscodeaddComponent } from './ttlock/ttlockpasscodeadd/ttlockpasscodeadd.component';
import { TtlockpasscodedetailsComponent } from './ttlock/ttlockpasscodedetails/ttlockpasscodedetails.component';
import { TtlockpasscodelistComponent } from './ttlock/ttlockpasscodelist/ttlockpasscodelist.component';
import { TtlockrecordComponent } from './ttlock/ttlockrecord/ttlockrecord.component';
import { TtlocksettingspageComponent } from './ttlock/ttlocksettingspage/ttlocksettingspage.component';
import { TtlocktransferComponent } from './ttlock/ttlocktransfer/ttlocktransfer.component';
import { TtlockfingerdetailsComponent } from './ttlock/ttlockfingerdetails/ttlockfingerdetails.component';
import { WaterlabelComponent } from './pages/waterlabel/waterlabel.component';
import { WaterListComponent } from './pages/water-list/water-list.component';
import { HumidityPipe } from './pages/waterlabel/humidity.pipe';
import { SecuritylockComponent } from './pages/securitylock/securitylock.component';
import { ThemeComponent } from './pages/theme/theme.component';
import { TuyaregpageComponent } from './pages/tuyaregpage/tuyaregpage.component';
import { AddTuyaLockComponent } from './pages/add-tuya-lock/add-tuya-lock.component';
import { RgbListComponent } from './pages/rgb-list/rgb-list.component';
import { TuyaRgbControlComponent } from "./pages/tuya-rgb-control/tuya-rgb-control.component";
import { TuyaRgbAddComponent } from "./pages/tuya-rgb-add/tuya-rgb-add.component";
import { SmartConfigComponent } from "./pages/smart-config/smart-config.component";
import { PrivacyComponent } from "./pages/privacy/privacy.component";
import { TticCardlistComponent } from "./ttlock/ttic-cardlist/ttic-cardlist.component";
import { TticCardaddComponent } from "./ttlock/ttic-cardadd/ttic-cardadd.component";

import { IonicGestureConfig } from "./gestures/ionic-gesture-config";
// import { LongPressModule } from 'ionic-long-press';

import { TankModule } from '@smart-webcomponents-angular/tank';

import { AddmodeComponent } from './pages/addmode/addmode.component';
import { EditmodeComponent } from './pages/editmode/editmode.component';
import { FooterComponent } from './shared/footer/footer.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {RoomsComponent} from './pages/rooms/rooms.component'; 
import {DevicelistComponent} from './pages/devicelist/devicelist.component';
import {FaqsComponent} from './pages/faqs/faqs.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainpageComponent,
    SideMenuComponent,
    SupportComponent,
    ProfileComponent,
    AllmoduleComponent,
    UpdatepassComponent,
    DevicesComponent,
    AddlockinroomComponent,
    EditdeviceComponent,
    SecuritydevicesComponent,
    LightdevicesComponent,
    TamdevicesComponent,
    WifiSettingsComponent,
    ModulecategoryComponent,
    SublightdeviceComponent,
    SublightdeviceComponent,
    AllRemoteComponent,
    IrCompanyComponent,
    IrProductComponent,
    IrRemoteComponent,
    IrremotenumberComponent,
    IrremotemoreComponent,
    FaqComponent,
    FavlistComponent,
    FavstatusComponent,
    AutomationdevicesComponent,
    ForgetpassComponent,
    ModesComponent,
    ModedevicesComponent,
    DevicestatusComponent,
    AddschedulesComponent,
    GuestComponent,
    EnergychartComponent,
    DevicemanagemnetComponent,
    NewTabComponent,
    RoomsetupComponent,
    NotificationComponent,
    AddTuyaComponent,
    QrcodeTuyaComponent,
    CameraFuncComponent,
    TuyaSmartSceneComponent,
    TuyaMessageComponent,
    TuyaShareComponent,
    TuyaMembersComponent,
    AlexaLinkComponent,
    LinkSuccessComponent,
    TuyalockComponent,
    TuyalockfuncComponent,
    TempPassComponent,
    LockRecorsComponent,
    UserFuncComponent,
    AlarmMsgComponent,
    ConsentpageComponent,
    LinkSuccessUiComponent,
    WaterlabelComponent,
    WaterListComponent,
    HumidityPipe,
    SecuritylockComponent,
    ThemeComponent,

    TtlockaddComponent,
    TtlockautolocktimeComponent,
    TtlockbatteryComponent,
    TtlockdetailsComponent,
    TtlockekeylistComponent,
    TtlockekeysendComponent,
    TtlockfingeraddComponent,
    TtlockfingerlistComponent,
    TtlockfingerdetailsComponent,
    TtlockgatewayinitComponent,
    TtlockgatewaylistComponent,
    TtlockgatewaylockunlockComponent,
    TtlockgatewayoperationComponent,
    TtlockgatewayuiComponent,
    TtlocknameComponent,
    TtlockoperationComponent,
    TtlockpasscodeaddComponent,
    TtlockpasscodedetailsComponent,
    TtlockpasscodelistComponent,
    TtlockrecordComponent,
    TtlocksettingspageComponent,
    TtlocktransferComponent,

    TuyaregpageComponent,
    AddTuyaLockComponent,
    RgbListComponent,
    TuyaRgbControlComponent,
    TuyaRgbAddComponent,
    SmartConfigComponent,
    PrivacyComponent,
    TticCardlistComponent,
    TticCardaddComponent,
    //  TankComponent,
    AddmodeComponent,
    EditmodeComponent,
    FooterComponent,
    SettingsComponent,
    RoomsComponent,
    DevicelistComponent,
    FaqsComponent
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoundProgressModule,
    NgOtpInputModule,
    NgxGaugeModule,
    // QRCodeModule,
    // NgxQRCodeModule,
    // LongPressModule,
    TankModule,
    HammerModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AllRemoteComponent,
    OpenNativeSettings,
    WifiWizard2,
    Network,
    InAppBrowser,
    Geolocation,
    Deeplinks,
    AndroidPermissions,
    Camera,
    //SocialSharing,
    // FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: IonicGestureConfig,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
