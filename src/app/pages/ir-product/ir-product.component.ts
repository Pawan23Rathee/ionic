import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AllRemoteComponent } from './../all-remote/all-remote.component'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ir-product',
  templateUrl: './ir-product.component.html',
  styleUrls: ['./ir-product.component.scss'],
})
export class IrProductComponent implements OnInit {
  showircopmany = false;
  showirproduct = true;
  productid:any;
  idproduct:any;
  imgPath:any;
  productImg:Array<any> = [];
  ircompanyid:any;
  idcopmany:any;
  idcopmany1:any;
  idcompany2:any;
  ircompanyImg:Array<any> = [];


  remoteid:any;
  remoteid1:Array<any> = [];
  remoteid2:any;
  remoteid3:any;

  items: any;
  searchTerm: any = "";
  filterTerms:Array<any> = [];
  filterTermss:Array<any> = [];


  constructor(public auth: AuthService, public remote: AllRemoteComponent,
    private router: Router,
    private navCtrl: NavController,
    public user: UserService

  ) {

  }
  ngOnInit() {
    this.allproduct();
    //this.getIrModule();
  }
  allproduct() {
    this.showircopmany = false;
    this.showirproduct = true;
    this.auth.getIRproductApi().subscribe(res => {
      this.productid = res;
      //  console.log(this.productid.id)
      //  console.log(this.productid.product_name)

      for (let i = 0; i < this.productid.length; i++) {
        this.productid[i];
        this.idproduct = this.productid[i].id;
        let proImg = this.showProductImages(this.idproduct);
        this.productImg[i] = [{
          "id": this.idproduct,
          "path": proImg,
          "product_name": this.productid[i].product_name
        }]

        console.log(this.productImg[i])
        console.log("product_id" + this.idproduct)
        console.log(this.productid[i].product_name)

      }


    })
  }
  allrmotes(id:any, prodName:any) {
    this.user.productName = prodName;
    console.log('product_id' + id);
    console.log('prod_name' + this.user.productName);
    this.idcompany2 = id;
    this.showircopmany = true;
    this.showirproduct = false;
    this.auth.getIRcompanyApi(id).subscribe(res => {
      // console.log("allremote"+ JSON.stringify(res))
      // this.ircompanyid=res;
      // console.log(this.ircompanyid.company_name)

      this.items = res;
      // this.filterTerms= this.items;
      //  console.log(this.items);
      for (let i = 0; i < this.items.length; i++) {

        this.idcopmany = this.items[i].company_name;

        let compImg = this.showCompanyImages(this.idcopmany);

        this.filterTerms[i] = [{
          "id": this.items[i].id,
          "path1": compImg,
          "company_name": this.items[i].company_name,
        }]
        this.user.search_prod = this.idcopmany;

      }
      //  console.log("company_name"+ JSON.stringify(this.filterTerms))
    })
  }

  filterItem() {
    this.filterTerms = [];
    this.filterTermss = this.items.filter((item:any) => item.company_name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
    console.log(this.filterTermss.length);

    for (let i = 0; i < this.filterTermss.length; i++) {
      let compImg = this.showCompanyImages(this.filterTermss[i].company_name);
      this.filterTerms[i] = [{
        "id": this.filterTermss[i].id,
        "path1": compImg,
        "company_name": this.filterTermss[i].company_name,
      }]
    }

  }


  showProductImages(id:any) {
    if (id == 1) {
      return this.imgPath = '/assets/devicesname/TELEVISION.jpg'
    }
    if (id == 2) {
      return this.imgPath = '/assets/devicesname/AC.jpg'
    }
    if (id == 4) {
      return this.imgPath = '/assets/devicesname/SETTOPBOX.jpg'
    }
    if (id == 5) {
      return this.imgPath = '/assets/devicesname/MUSICSYSTEM.jpg'
    }
    if (id == 7) {
      return this.imgPath = '/assets/devicesname/HOMETHEATRE.jpg'
    }
    if (id == 8) {
      return this.imgPath = '/assets/devicesname/DVDPLAYER.jpg'
    }
    if (id == 9) {
      return this.imgPath = '/assets/devicesname/TATASKY.jpeg'
    }

    if (id == 10) {
      return this.imgPath = '/assets/devicesname/DTH.jpg'
    }
    return
  }


  showCompanyImages(name:any) {
    console.log(name)
    if (name == "AIRTEL") {
      return this.imgPath = '/assets/companylogo/AIRTEL.PNG'
    }
    if (name == "ACTIVA") {
      return this.imgPath = '/assets/companylogo/activa.jpeg'
    }
    if (name == "apple") {
      return this.imgPath = '/assets/companylogo/APPLE.png'
    }
    if (name == "ACT") {
      return this.imgPath = '/assets/companylogo/act.png'
    }
    if (name == "AKAI M1") {
      return this.imgPath = '/assets/companylogo/MI.png'
    }
    if (name == "Akai") {
      return this.imgPath = '/assets/companylogo/AKAI.png'
    }
    if (name == "AOC") {
      return this.imgPath = '/assets/companylogo/AOC.png'
    }
    if (name == "APPLE") {
      return this.imgPath = '/assets/companylogo/APPLE.png'
    }
    if (name == "ARCAM") {
      return this.imgPath = '/assets/companylogo/ARCAM.png'
    }
    if (name == "AUXCOMPANY") {
      return this.imgPath = '/assets/companylogo/AUXCOMPANY.PNG'
    }
    if (name == "BLUESTAR") {
      return this.imgPath = '/assets/companylogo/BLUESTAR.png'
    }
    if (name == "BOSE") {
      return this.imgPath = '/assets/companylogo/BOSE.png'
    }
    if (name == "BOSE1") {
      return this.imgPath = '/assets/companylogo/BOSE.png'
    }
    if (name == "BPL") {
      return this.imgPath = '/assets/companylogo/Btone.png'
    }
    if (name == "BTONE") {
      return this.imgPath = '/assets/companylogo/BPL.png'
    }
    if (name == "CAMIPRO") {
      return this.imgPath = '/assets/companylogo/CAMIPRO.png'
    }
    if (name == "CARRIER") {
      return this.imgPath = '/assets/companylogo/CARRIER.PNG'
    }
    if (name == "CLOUDWALKER") {
      return this.imgPath = '/assets/companylogo/CLOUDWALKER.png'
    }
    if (name == "CROMA") {
      return this.imgPath = '/assets/companylogo/CROMA.png'
    }
    if (name == "CROWN") {
      return this.imgPath = '/assets/companylogo/CROWN.PNG'
    }
    if (name == "CRUISE") {
      return this.imgPath = '/assets/companylogo/CRUISE.png'
    }
    if (name == "DAIKIN") {
      return this.imgPath = '/assets/companylogo/DAIKIN.png'
    }
    if (name == "DAPICLED") {
      return this.imgPath = '/assets/companylogo/DAPICLED.PNG'
    }
    if (name == "DDFREEDISH") {
      return this.imgPath = '/assets/companylogo/DDFREEDISH.PNG'
    }
    if (name == "DISHTV") {
      return this.imgPath = '/assets/companylogo/DISHTV.png'
    }
    if (name == "DUNE") {
      return this.imgPath = '/assets/companylogo/DUNE.PNG'
    }
    if (name == "DYFOLABS") {
      return this.imgPath = '/assets/companylogo/DYFOLABS.PNG'
    }
    if (name == "ELECTROLUX") {
      return this.imgPath = '/assets/companylogo/ELECTROLUX.png'
    }
    if (name == "GEMFAN") {
      return this.imgPath = '/assets/companylogo/GEMFAN.PNG'
    }
    if (name == "GODREJ") {
      return this.imgPath = '/assets/companylogo/GODREJ.png'
    }
    if (name == "Haier") {
      return this.imgPath = '/assets/companylogo/HAIER.png'
    }
    if (name == "HATHWAY") {
      return this.imgPath = '/assets/companylogo/HATHWAY.png'
    }
    if (name == "HISENSE") {
      return this.imgPath = '/assets/companylogo/HISENSE.png'
    }
    if (name == "HIGHTRON") {
      return this.imgPath = '/assets/companylogo/HIGHTRON.jpeg'
    }
    if (name == "HITACHI") {
      return this.imgPath = '/assets/companylogo/HITACHI.PNG'
    }
    if (name == "ICC") {
      return this.imgPath = '/assets/companylogo/ICC.png'
    }
    if (name == "IPTVBOX") {
      return this.imgPath = '/assets/companylogo/IPTVBOX.png'
    }
    if (name == "IPLUS") {
      return this.imgPath = '/assets/companylogo/IPLUS.PNG'
    }
    if (name == "INDIGITAL") {
      return this.imgPath = '/assets/companylogo/INDIGITAL.png'
    }
    if (name == "KORYO") {
      return this.imgPath = '/assets/companylogo/KORYO.png'
    }
    if (name == "SAMSUNG") {
      return this.imgPath = '/assets/companylogo/SAMSUNG.png'
    }
    if (name == "SAMSUNG1") {
      return this.imgPath = '/assets/companylogo/SAMSUNG.png'
    }
    if (name == "SONY") {
      return this.imgPath = '/assets/companylogo/SONY.png'
    }
    if (name == "MAGIP") {
      return this.imgPath = '/assets/companylogo/MAGIP.png'
    }
    if (name == "MI") {
      return this.imgPath = '/assets/companylogo/MI.png'
    }
    if (name == "MITASHI") {
      return this.imgPath = '/assets/companylogo/MITASHI.png'
    }
    if (name == "MICROMAX_TV") {
      return this.imgPath = '/assets/companylogo/MICROMAX.png'
    }
    if (name == "MICROMAX") {
      return this.imgPath = '/assets/companylogo/MICROMAX.png'
    }
    if (name == "NEC") {
      return this.imgPath = '/assets/companylogo/NEC.png'
    }
    if (name == "INTEX") {
      return this.imgPath = '/assets/companylogo/INTEX.png'
    }
    if (name == "TATASKY") {
      return this.imgPath = '/assets/companylogo/TATASKY.PNG'
    }
    if (name == "TATA_SKY") {
      return this.imgPath = '/assets/companylogo/TATASKY.PNG'
    }
    if (name == "ROLSEN") {
      return this.imgPath = '/assets/companylogo/rolsen.jpeg'
    }
    if (name == "SKYWORTH") {
      return this.imgPath = '/assets/companylogo/SKYWORTH.png'
    }
    if (name == "PHILIPS") {
      return this.imgPath = '/assets/companylogo/PHILIPS.png'
    }
    if (name == "PANASONIC") {
      return this.imgPath = '/assets/companylogo/PANASONIC.PNG'
    }
    if (name == "LG") {
      return this.imgPath = '/assets/companylogo/LG.png'
    }
    if (name == "LETV") {
      return this.imgPath = '/assets/companylogo/letv.png'
    }
    if (name == "TOSHIBA") {
      return this.imgPath = '/assets/companylogo/TOSHIBA.png'
    }
    if (name == "NEXTVIEW") {
      return this.imgPath = '/assets/companylogo/NEXTVIEW.PNG'
    }
    if (name == "DDGREEDISH") {
      return this.imgPath = '/assets/companylogo/DDFREEDISH.PNG'
    }
    if (name == "RECONNECT") {
      return this.imgPath = '/assets/companylogo/RECONNECT.PNG'
    }
    if (name == "SAMUI") {
      return this.imgPath = '/assets/companylogo/SAMUI.png'
    }
    if (name == "SANYO") {
      return this.imgPath = '/assets/companylogo/SANYO.png'
    }
    if (name == "SHINCO") {
      return this.imgPath = '/assets/companylogo/SHINCO.PNG'
    }
    if (name == "SANSUI") {
      return this.imgPath = '/assets/companylogo/SANSUI.png'
    }
    if (name == "SHARP") {
      return this.imgPath = '/assets/companylogo/SHARP.png'
    }
    if (name == "TCL") {
      return this.imgPath = '/assets/companylogo/TCL.png'
    }
    if (name == "TECHNOTOWN") {
      return this.imgPath = '/assets/companylogo/TECHNOTOWN.png'
    }
    if (name == "UPTRON") {
      return this.imgPath = '/assets/companylogo/UPTRON.png'
    }
    if (name == "UV") {
      return this.imgPath = '/assets/companylogo/UV.png'
    }
    if (name == "VIDEOCON") {
      return this.imgPath = '/assets/companylogo/VIDEOCON.png'
    }
    if (name == "VU") {
      return this.imgPath = '/assets/companylogo/VU.PNG'
    }
    if (name == "VISE") {
      return this.imgPath = '/assets/companylogo/VISE.png'
    }
    if (name == "WITCHER") {
      return this.imgPath = '/assets/companylogo/WITCHER.PNG'
    }
    if (name == "WORLDTECH") {
      return this.imgPath = '/assets/companylogo/WORLDTECH.png'
    }

    if (name == "ONIDA") {
      return this.imgPath = '/assets/companylogo/ONIDA.PNG'
    }
    if (name == "ZEMFAN") {
      return this.imgPath = '/assets/companylogo/zemfan.jpg'
    }

    if (name == "AUX") {
      return this.imgPath = '/assets/companylogo/AUXCOMPANY.PNG'
    }
    if (name == "AMAZONE BESIS") {
      return this.imgPath = '/assets/companylogo/amazoneBesis.jpg'
    }
    if (name == "voltas") {
      return this.imgPath = '/assets/companylogo/VOLTAS.png'
    }
    if (name == "WHIRLPOOL") {
      return this.imgPath = '/assets/companylogo/WHIRLPOOL.png'
    }
    if (name == "TRANE") {
      return this.imgPath = '/assets/companylogo/TRANE.png'
    }
    if (name == "NAPOLEON") {
      return this.imgPath = '/assets/companylogo/napoleon.jpg'
    }
    if (name == "TRANE") {
      return this.imgPath = '/assets/companylogo/TRANE.png'
    }
    if (name == "MITSUBISHI ELECTRIC") {
      return this.imgPath = '/assets/companylogo/Mitsubishi-Electric-AC.jpg'
    }
    if (name == "KENSTAR") {
      return this.imgPath = '/assets/companylogo/KENSTAR.png'
    }
    if (name == "DREAM CARE") {
      return this.imgPath = '/assets/companylogo/DREAMCARE.png'
    }
    if (name == "YOKO") {
      return this.imgPath = '/assets/companylogo/yoko.png'
    }
    if (name == "MARANTZ") {
      return this.imgPath = '/assets/companylogo/MARANTZ.PNG'
    }
    //----------  DVD PLAYER----------------- 
    if (name == "MECOOL") {
      return this.imgPath = '/assets/companylogo/MECOOL.png'
    }
    if (name == "PIONEER") {
      return this.imgPath = '/assets/companylogo/PIONEER.PNG'
    }
    if (name == "OPPO") {
      return this.imgPath = '/assets/companylogo/OPPO.PNG'
    }
    if (name == "POPCORN HOUR") {
      return this.imgPath = '/assets/companylogo/POPCORNHOUR.PNG'
    }
    if (name == "ZIDOO") {
      return this.imgPath = '/assets/companylogo/ZIDOO.PNG'
    }
    //--------- D2H----------- 
    if (name == "TATA sky") {
      return this.imgPath = '/assets/companylogo/TATASKY.PNG'
    }
    if (name == "DDFreeDish") {
      return this.imgPath = '/assets/companylogo/DDFREEDISH.PNG'
    }
    if (name == "Airtel") {
      return this.imgPath = '/assets/companylogo/AIRTEL.PNG'
    }
    if (name == "DishTV") {
      return this.imgPath = '/assets/companylogo/DISHTV.png'
    }
    if (name == "Hathway") {
      return this.imgPath = '/assets/companylogo/HATHWAY.png'
    }
    if (name == "Reliance") {
      return this.imgPath = '/assets/companylogo/RELIANCE.PNG'
    }
    if (name == "InDigital") {
      return this.imgPath = '/assets/companylogo/INDIGITAL.PNG'
    }
    if (name == "SunDirect") {
      return this.imgPath = '/assets/companylogo/SUNDIRECT.png'
    }
    if (name == "Arcam") {
      return this.imgPath = '/assets/companylogo/ARCAM.png'
    }
    if (name == "GENERAL") {
      return this.imgPath = '/assets/companylogo/AC73.jpeg'
    }
    if (name == "IFB") {
      return this.imgPath = '/assets/companylogo/IFB.png'
    }
    if (name == "LLOYD") {
      return this.imgPath = '/assets/companylogo/LLOYD.jpeg'
    }

return
  }

  showRemote(id:any, comp_name:any) {
    this.user.companyName = comp_name;
    console.log('company_name' + this.user.companyName)
    if (this.idcompany2 == 2) {
      // console.log("product"+this.idcompany2)
      //console.log("company "+id)
      this.user.checkForAcRemote = this.idcompany2;
      this.auth.remoteForAc(this.idcompany2, id).subscribe(res => {
        this.remoteid = res;
        console.log(res);
        for (let i = 0; i < this.remoteid.length; i++) {
          this.remoteid2 = this.remoteid[i].id;
          this.user.idremote21[i] = {
            "id": this.remoteid2,
            "on": this.remoteid[i].power_on_button,
            "off": this.remoteid[i].power_off_button,
            'name': this.remoteid[i].name
          }
          //console.log(this.remoteid)
          this.remote.call();
        }
        //console.log("out"+ this.remoteid2)
        this.router.navigateByUrl('/all-remote');
      })
    }
    else {
      // console.log("product"+this.idcompany2)
      //console.log("company "+id)
      this.user.checkForAcRemote = this.idcompany2;
      this.auth.getIRCompanyRemoteApi(this.idcompany2, id).subscribe(res => {
        // console.log(JSON.stringify(res))
        this.remoteid = res;
        console.log(res)
        for (let i = 0; i < this.remoteid.length; i++) {
          this.remoteid2 = this.remoteid[i].id;
          this.user.idremote21[i] = {
            "id": this.remoteid2,
            "on": this.remoteid[i].power_on_button,
            "off": this.remoteid[i].power_off_button
          }
          this.remote.call();
          
        }


        console.log("out" + this.remoteid2)

        this.router.navigateByUrl('/all-remote');
      })
    }
  }


}