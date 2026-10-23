import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
declare var TTlockdata: any;



@Component({
  selector: 'app-ttlockrecord',
  templateUrl: './ttlockrecord.component.html',
  styleUrls: ['./ttlockrecord.component.scss'],
})
export class TtlockrecordComponent implements OnInit {

  precords: any;
  record_list: any;
  record_list1: any;
  constructor(private user: UserService,
    private auth: AuthService,) { }

  ngOnInit() {
    this.sdkresponse();
    this.tTLockRecord();
  }
  ionViewWillEnter() {
    // this.sdkresponse();
    // this.tTLockRecord()
  }

  sdkresponse() {
    let body = {
      'lockdata': this.user.lockData,
      'macAddress': this.user.ttlockMac

    }
    TTlockdata.getOperationLog(body,
      (res: any) => {
        //  alert("Plugin:"+JSON.stringify(res));
        this.precords = (res),
          //  this.tTLockRecord();
          this.tTLockupload();
      },
      (err: any) => {
        alert(err);
      })
  }

  data: Array<any> = [];
  milliseconds: any;
  tTLockRecord() {

    console.log('ttlock record..');
    var d = new Date();
    var n = d.getTime();
    var x = n;
    console.log(n);
    let TTtoken = localStorage.getItem('TTtoken') ?? "";
    // this.user.showToast(TTtoken);
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: TTtoken,
        // lockId:"2173852",     
        lockId: this.user.ttLockId,
        pageNo: "1",
        pageSize: "20",
        date: JSON.stringify(x)
      }
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };


    console.log(params);

    this.auth.tTlock_record(params).subscribe(res => {
      this.record_list = res;
      this.record_list1 = this.record_list.list;
      console.log("record" + JSON.stringify(res));
      for (let i = 0; i < this.record_list1.length; i++) {
        this.milliseconds = this.record_list1[i].lockDate;
        var date = new Date(this.milliseconds);

        console.log('date:' + (date));

        let type1 = this.showIcon(this.record_list1[i].recordType)
        this.data[i] = {
          'lockId': this.record_list1[i].lockId,
          'recordType': type1,
          'lockDate': date

        }

      }


    }, err => {
      this.user.showToast(JSON.stringify(err.error));
    })



  }




  tTLockupload() {

    console.log('ttlock record..');
    var d = new Date();
    var n = d.getTime();
    var x = n;
    console.log(n);
    let TTtoken = localStorage.getItem('TTtoken') ?? "";
    // this.user.showToast(TTtoken);
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: TTtoken,
        lockId: this.user.ttLockId,
        records: this.precords,
        date: JSON.stringify(x)
      }
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };


    console.log(params);

    // this.auth.tTlock_upload(params).subscribe(res=>{
    //   console.log("Upload record"+JSON.stringify(res));
    //     this.tTLockRecord();
    // },err=>{
    //   this.user.showToast(JSON.stringify(err.error));
    //     this.tTLockRecord();
    // })
  }


  showMessagage: any;
  showIcon(type: any) {
    if (type == 1) {
      return this.showMessagage = "App unlock"
    }
    if (type == 2) {
      return this.showMessagage = "touch the parking lock"
    }
    if (type == 3) {
      return this.showMessagage = "gateway unlock"
    }
    if (type == 4) {
      return this.showMessagage = "passcode unlock"
    }
    if (type == 5) {
      return this.showMessagage = "parking lock raise"
    }
    if (type == 6) {
      return this.showMessagage = "parking lock lower"
    } if (type == 7) {
      return this.showMessagage = "IC card unlock"
    }
    if (type == 8) {
      return this.showMessagage = "fingerprint unlock"
    } if (type == 9) {
      return this.showMessagage = "wristband unlock"
    }
    if (type == 10) {
      return this.showMessagage = "mechanical key unlock"
    } if (type == 11) {
      return this.showMessagage = "Bluetooth lock"
    }
    if (type == 12) {
      return this.showMessagage = "gateway unlock"
    }
    if (type == 29) {
      return this.showMessagage = "unexpected unlock"
    }
    if (type == 30) {
      return this.showMessagage = "door magnet close"
    }
    if (type == 32) {
      return this.showMessagage = "open from inside"
    }

    if (type == 33) {
      return this.showMessagage = "lock by fingerprint"
    }
    if (type == 34) {
      return this.showMessagage = "lock by passcode,"
    }
    if (type == 35) {
      return this.showMessagage = "lock by IC card"
    }
    if (type == 36) {
      return this.showMessagage = "lock by Mechanical key"
    }

    if (type == 37) {
      return this.showMessagage = "Remote Control"
    }
    if (type == 44) {
      return this.showMessagage = "Tamper alert"
    }
    if (type == 45) {
      return this.showMessagage = "unlock by unlock key"
    }
    if (type == 47) {
      return this.showMessagage = "lock by lock key"
    }
    //  
    if (type == 48) {
      return this.showMessagage = "Use INVALID Passcode several times"
    }
    return
  }

}
