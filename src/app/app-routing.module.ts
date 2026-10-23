import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SupportComponent } from './pages/support/support.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { AllmoduleComponent } from './pages/allmodule/allmodule.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UpdatepassComponent } from './pages/updatepass/updatepass.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { AddlockinroomComponent } from './pages/addlockinroom/addlockinroom.component';
import { SideMenuComponent } from './pages/side-menu/side-menu.component';
import { EditdeviceComponent } from './pages/editdevice/editdevice.component';
import { WifiSettingsComponent } from './pages/wifi-settings/wifi-settings.component';
import { SublightdeviceComponent } from './pages/sublightdevice/sublightdevice.component';
import { ModulecategoryComponent } from './pages/modulecategory/modulecategory.component';
import { TamdevicesComponent } from './pages/tamdevices/tamdevices.component';
import { SecuritydevicesComponent } from './pages/securitydevices/securitydevices.component';
import { QrcodeTuyaComponent } from './pages/qrcode-tuya/qrcode-tuya.component';
import { AllRemoteComponent } from './pages/all-remote/all-remote.component';
import { IrProductComponent } from './pages/ir-product/ir-product.component';
import { IrRemoteComponent } from './pages/ir-remote/ir-remote.component';
import { IrremotenumberComponent } from './pages/irremotenumber/irremotenumber.component';
import { IrremotemoreComponent } from './pages/irremotemore/irremotemore.component';
import { FaqComponent } from './pages/faq/faq.component';
import { FavlistComponent } from './pages/favlist/favlist.component';
import { FavstatusComponent } from './pages/favstatus/favstatus.component';
import { AutomationdevicesComponent } from './pages/automationdevices/automationdevices.component';
import { AuthguardGuard } from './services/authguard.guard';
import { ForgetpassComponent } from './pages/forgetpass/forgetpass.component';
import { ModesComponent } from './pages/modes/modes.component';
import { DevicestatusComponent } from './pages/devicestatus/devicestatus.component';
import { ModedevicesComponent } from './pages/modedevices/modedevices.component';
import { AddschedulesComponent } from './pages/addschedules/addschedules.component';
import { GuestComponent } from './pages/guest/guest.component';
import { EnergychartComponent } from './pages/energychart/energychart.component';
import { DevicemanagemnetComponent } from './pages/devicemanagemnet/devicemanagemnet.component';
import { NewTabComponent } from './pages/new-tab/new-tab.component';
import { RoomsetupComponent } from './pages/roomsetup/roomsetup.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { AddTuyaComponent } from './pages/add-tuya/add-tuya.component';
import { CameraFuncComponent } from './pages/camera-func/camera-func.component';
import { TuyaSmartSceneComponent } from './pages/tuya-smart-scene/tuya-smart-scene.component';
import { TuyaMessageComponent } from './pages/tuya-message/tuya-message.component';
import { TuyaShareComponent } from './pages/tuya-share/tuya-share.component';
import { TuyaMembersComponent } from './pages/tuya-members/tuya-members.component';
import { TuyalockComponent } from './pages/tuyalock/tuyalock.component';
import { TuyalockfuncComponent } from './pages/tuyalockfunc/tuyalockfunc.component';
import { AlarmMsgComponent } from './pages/alarm-msg/alarm-msg.component';
import { UserFuncComponent } from './pages/user-func/user-func.component';
import { LockRecorsComponent } from './pages/lock-recors/lock-recors.component';
import { TempPassComponent } from './pages/temp-pass/temp-pass.component';
import { ConsentpageComponent } from './pages/consentpage/consentpage.component';
import { AlexaLinkComponent } from './pages/alexa-link/alexa-link.component';
import { LinkSuccessComponent } from './pages/link-success/link-success.component';
import { LinkSuccessUiComponent } from './pages/link-success-ui/link-success-ui.component';
import { TtlockaddComponent } from './ttlock/ttlockadd/ttlockadd.component';
import { TtlockautolocktimeComponent } from './ttlock/ttlockautolocktime/ttlockautolocktime.component';
import { TtlockbatteryComponent } from './ttlock/ttlockbattery/ttlockbattery.component';
import { TtlockdetailsComponent } from './ttlock/ttlockdetails/ttlockdetails.component';
import { TtlockekeylistComponent } from './ttlock/ttlockekeylist/ttlockekeylist.component';
import { TtlockekeysendComponent } from './ttlock/ttlockekeysend/ttlockekeysend.component';
import { TtlockfingeraddComponent } from './ttlock/ttlockfingeradd/ttlockfingeradd.component';
import { TtlockfingerlistComponent } from './ttlock/ttlockfingerlist/ttlockfingerlist.component';
import { TtlockfingerdetailsComponent } from './ttlock/ttlockfingerdetails/ttlockfingerdetails.component';
import { TtlockgatewayinitComponent } from './ttlock/ttlockgatewayinit/ttlockgatewayinit.component';
import { TtlockgatewaylistComponent } from './ttlock/ttlockgatewaylist/ttlockgatewaylist.component';
import { TtlockgatewayoperationComponent } from './ttlock/ttlockgatewayoperation/ttlockgatewayoperation.component';
import { TtlockgatewayuiComponent } from './ttlock/ttlockgatewayui/ttlockgatewayui.component';
import { TtlocktransferComponent } from './ttlock/ttlocktransfer/ttlocktransfer.component';
import { TtlocknameComponent } from './ttlock/ttlockname/ttlockname.component';
import { TtlockoperationComponent } from './ttlock/ttlockoperation/ttlockoperation.component';
import { TtlockpasscodeaddComponent } from './ttlock/ttlockpasscodeadd/ttlockpasscodeadd.component';
import { TtlockpasscodedetailsComponent } from './ttlock/ttlockpasscodedetails/ttlockpasscodedetails.component';
import { TtlockpasscodelistComponent } from './ttlock/ttlockpasscodelist/ttlockpasscodelist.component';
import { TtlockrecordComponent } from './ttlock/ttlockrecord/ttlockrecord.component';
import { TtlocksettingspageComponent } from './ttlock/ttlocksettingspage/ttlocksettingspage.component';
import { WaterlabelComponent } from './pages/waterlabel/waterlabel.component';
import { WaterListComponent } from './pages/water-list/water-list.component';
import { SecuritylockComponent } from './pages/securitylock/securitylock.component';
import { ThemeComponent } from './pages/theme/theme.component';
import { TuyaregpageComponent } from './pages/tuyaregpage/tuyaregpage.component';
import { TticCardlistComponent } from './ttlock/ttic-cardlist/ttic-cardlist.component';
import { TticCardaddComponent } from './ttlock/ttic-cardadd/ttic-cardadd.component';
import { RgbListComponent } from './pages/rgb-list/rgb-list.component';
import { TuyaRgbControlComponent } from './pages/tuya-rgb-control/tuya-rgb-control.component';
import { TuyaRgbAddComponent } from './pages/tuya-rgb-add/tuya-rgb-add.component';
import { SmartConfigComponent } from "./pages/smart-config/smart-config.component";
import { AddmodeComponent } from './pages/addmode/addmode.component';
import { EditmodeComponent } from './pages/editmode/editmode.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { DevicelistComponent } from './pages/devicelist/devicelist.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  { path: "", redirectTo: "/mainpage", pathMatch: "full" },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "mainpage",
    component: MainpageComponent,
    canActivate: [AuthguardGuard],
    // children:[
    //   {
    //     path: 'securitylock',
    //     component: SecuritylockComponent,
    //   },
    //   {
    //     path: 'mode',
    //     component: ModesComponent,
    //   },
    //   {
    //     path: 'favlist',
    //     component: FavlistComponent
    //   },
    // ]
  },

  {
    path: "favlist",
    component: FavlistComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: "mode",
    component: ModesComponent,
  },
  {
    path: "addmode",
    component: AddmodeComponent
  },
  {
    path: "editmode",
    component: EditmodeComponent
  },
  {
    path: "mainpage",
    component: MainpageComponent,
  },
  {
    path: "allmodule",
    component: AllmoduleComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "mainpage/securitylock",
    component: SecuritylockComponent,
  },
  {
    path: "mainpage/mode",
    component: ModesComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "mainpage/favlist",
    component: FavlistComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "devicestatus/newschedule",
    component: AddschedulesComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "devicestatus/guest",
    component: GuestComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "support",
    component: SupportComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "updatepass",
    component: UpdatepassComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "devices",
    component: DevicesComponent,
  },
  {
    path: "devicestatus",
    component: DevicestatusComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "editdevice",
    component: EditdeviceComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "wifi",
    component: WifiSettingsComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "submoduleshow",
    component: SublightdeviceComponent,
  },
  {
    path: "mcategory",
    component: ModulecategoryComponent,
  },
  {
    path: "tammodule",
    component: TamdevicesComponent,
  },
  {
    path: "securitymodule",
    component: SecuritydevicesComponent,
  },
  {
    path: "automationmodule",
    component: AutomationdevicesComponent,
  },
  {
    path: "all-remote",
    component: AllRemoteComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "ir-product",
    component: IrProductComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "ir-remote",
    component: IrRemoteComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "irremotenumber",
    component: IrremotenumberComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "irremotemore",
    component: IrremotemoreComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "addnewmodule",
    component: FaqComponent,
  },
  {
    path: "favlist",
    component: FavlistComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "favstatus",
    component: FavstatusComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "mode",
    component: ModesComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "forgetpass",
    component: ForgetpassComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "newschedule",
    component: AddschedulesComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "guest",
    component: GuestComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "energychart",
    component: EnergychartComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "devicemanage",
    component: DevicemanagemnetComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "urlpage",
    component: NewTabComponent,
  },
  {
    path: "roomsetup",
    component: RoomsetupComponent,
  },
  {
    path: "notification",
    component: NotificationComponent,
  },
  {
    path: "addDoorbell",
    component: AddTuyaComponent,
  },
  {
    path: "camFunc",
    component: CameraFuncComponent,
  },
  {
    path: "camFunc",
    component: CameraFuncComponent,
  },

  {
    path: "camFunc/shareTuya",
    component: TuyaShareComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "lockFunc",
    component: TuyalockfuncComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "lockFunc/alarmMsg",
    component: AlarmMsgComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "userFunc",
    component: UserFuncComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "lockRecords",
    component: LockRecorsComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "tempPass",
    component: TempPassComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "tMem",
    component: TuyaMembersComponent,
  },
  {
    path: "tuyaQr",
    component: QrcodeTuyaComponent,
  },
  {
    path: "camFunc/tMsg",
    component: TuyaMessageComponent,
  },
  {
    path: "smartSce",
    component: TuyaSmartSceneComponent,
  },
  {
    path: "tuyalock",
    component: TuyalockComponent,
  },
  {
    path: "accountLink",
    component: ConsentpageComponent,
  },
  {
    path: "alexaLink",
    component: AlexaLinkComponent,
  },
  {
    path: "linkSuccess",
    component: LinkSuccessComponent,
  },
  {
    path: "linkSuccessUi",
    component: LinkSuccessUiComponent,
  },

  {
    path: "ttlockadd",
    component: TtlockaddComponent,
  },
  {
    path: "ttlockautotime",
    component: TtlockautolocktimeComponent,
  },
  {
    path: "ttlockbattery",
    component: TtlockbatteryComponent,
  },
  {
    path: "ttlockdetails",
    component: TtlockdetailsComponent,
  },
  {
    path: "ttlockekeylist",
    component: TtlockekeylistComponent,
  },
  {
    path: "ttlockekeysend",
    component: TtlockekeysendComponent,
  },
  {
    path: "ttlockaddfinger",
    component: TtlockfingeraddComponent,
  },
  {
    path: "ttlockfingerlist",
    component: TtlockfingerlistComponent,
  },

  {
    path: "ttlockfingeruserdetails",
    component: TtlockfingerdetailsComponent,
  },
  {
    path: "ttlockgatewayinit",
    component: TtlockgatewayinitComponent,
  },
  {
    path: "ttgatewaylist",
    component: TtlockgatewaylistComponent,
  },
  {
    path: "ttlockgatewayoperation",
    component: TtlockgatewayoperationComponent,
  },
  {
    path: "ttgatewayui",
    component: TtlockgatewayuiComponent,
  },
  {
    path: "ttlockname",
    component: TtlocknameComponent,
  },
  {
    path: "ttoperation",
    component: TtlockoperationComponent,
  },
  {
    path: "ttlockpasscodeadd",
    component: TtlockpasscodeaddComponent,
  },
  {
    path: "ttlockpasscodedetails",
    component: TtlockpasscodedetailsComponent,
  },
  {
    path: "ttlockpasscodelist",
    component: TtlockpasscodelistComponent,
  },
  {
    path: "ttlockrecord",
    component: TtlockrecordComponent,
  },
  {
    path: "ttlock/ttlockrecord",
    component: TtlockrecordComponent,
  },
  {
    path: "ttlocksettings",
    component: TtlocksettingspageComponent,
  },
  {
    path: "ttlockiclist",
    component: TticCardlistComponent,
  },
  {
    path: "ttlockicadd",
    component: TticCardaddComponent,
  },

  {
    path: "ttoperation/ttlocksettings",
    component: TtlocksettingspageComponent,
  },
  {
    path: "ttlocktransfer",
    component: TtlocktransferComponent,
  },

  {
    path: "waterlabel",
    component: WaterlabelComponent,
  },
  {
    path: "waterlist",
    component: WaterListComponent,
  },
  {
    path: "securitylock",
    component: SecuritylockComponent,
  },
  {
    path: "theme",
    component: ThemeComponent,
  },
  {
    path: "tuyareg",
    component: TuyaregpageComponent,
  },
  {
    path: "rgb-list",
    component: RgbListComponent,
  },
  {
    path: "rgb-control",
    component: TuyaRgbControlComponent,
  },
  {
    path: "rgb-add",
    component: TuyaRgbAddComponent,
  },
  {
    path: "smart-config",
    component: SmartConfigComponent,
  },
  {
    path: "settings",
    component: SettingsComponent,
  },
  {
    path: "rooms",
    component: RoomsComponent
  },
  {
    path: "devicelist/:id",
    component: DevicelistComponent
  },
  {
    path:'faqs',
    component:FaqsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
