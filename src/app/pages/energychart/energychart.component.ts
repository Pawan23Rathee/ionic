import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
// import { Chart ,LineController} from "chart.js";
import Chart from 'chart.js/auto';
import { NavController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-energychart",
  templateUrl: "./energychart.component.html",
  styleUrls: ["./energychart.component.scss"],
})
export class EnergychartComponent implements OnInit {
  qrdata: any;
  createCode: any;

  @ViewChild("barChart") barChart: any;
  @ViewChild("barChart1") barChart1: any;
  @ViewChild("barChart2") barChart2: any;

  @ViewChild("barCharttoday") barCharttoday: any;
  @ViewChild("barChartweekly") barChartweekly: any;
  @ViewChild("barChartmonthly") barChartmonthly: any;

  @ViewChild("barChartTotalweekly") barChartTotalweekly: any;
  @ViewChild("barChartTotalmonthly") barChartTotalmonthly: any;

  bars: any;
  colorArray: any;
  allDevices: any;
  device_ID: any;

  date: string[] = [];
  hours: any[] = [];

  weely1: string[] = [];
  weely2: string[] = [];
  weeklywatt: any[] = [];

  monthly1: string[] = [];
  monthly2: string[] = [];
  monthlywatt: any[] = [];

  totaluserwDays: string[] = [];
  totaluserwHours: string[] = [];
  totaluserwWatts: any[] = [];

  totalusermMonth: string[] = [];
  totalusermhours: string[] = [];
  totalusermwatts: any[] = [];

  constructor(
    public navCtrl: NavController,
    private auth: AuthService,
    private user: UserService
  ) {
    // Chart.register(LineController);

    this.getTotalAllEnergy();
  }
  ngOnInit() { }
  ionViewDidEnter() {
    this.getDevice();
    // this.createBarChart();
    // this.createBarChart1();
    // this.createBarChart2();
    // this.createBarChartnew();
  }
  backbutton() {
    this.navCtrl.navigateRoot("/mainpage");
  }

  getDevice() {
    this.auth.getDeviceFromApiEnergy().subscribe(
      (res) => {
        this.allDevices = res;
        console.log(this.allDevices[0].device);
        this.device_ID=this.allDevices[0].device;
        console.log(this.device_ID);
        if(this.device_ID==undefined){
          console.log('device not selected..');
        }
        else{
          console.log('device Selected::'+ this.device_ID)
        }
        // this.checkValue1();
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
  energydata: any;
  energyData: any;
  energydate: any;

  weeklydata: any;
  weeklyData: any;
  weeklydate: any;

  monthlydata: any;
  monthlyData: any;
  monthlydate: any;

  tt_weeklydata: any;
  tt_weeklyData: any;
  tt_weeklydate: any;

  tt_monthlydata: any;
  tt_monthlyData: any;
  tt_monthlydate: any;

  alldata: any;
  allData: any;
  allData1: any;
  d_id: any;
  d_type: any;

  totalSelectData = true;
  deviceSelectData = false;
  checkValue(event: any) {
    this.monthly1 = [];
    this.weely2 = [];
    this.date = [];
    console.log(event.detail.value);
    if (event.detail.value == "total") {
      console.log("total energy called..");
      this.totalSelectData = true;
      this.deviceSelectData = false;
      this.getTotalAllEnergy();
    } else {
      this.totalSelectData = false;
      this.deviceSelectData = true;
      console.log(event.detail.value.device);
      console.log(event.detail.value.device_type);
      this.d_id = event.detail.value.device;
      this.d_type = event.detail.value.device_type;
      this.device_ID = event.detail.value.device;
      this.getAllEnergy();
    }
  }

  // checkValue1(){
  //  if(this.device_ID!=""){
  //    console.log('undefinded..'+ this.device_ID);
  //    this.getAllEnergy();
  //  }
  //  else if(this.d_id!=""){
  //    console.log("select..");
  // this.checkValue(event);
  //  }
  // }

  tt_avg_hours: any;
  tt_avg_watts: any;
  tt_total_hours: any;
  tt_total_watts: any;
  tt_w_avg_hours: any;
  tt_w_avg_watts: any;
  tt_w_total_hours: any;
  tt_w_total_watts: any;
  tt_m_avg_hours: any;
  tt_m_avg_watts: any;
  tt_m_total_hours: any;
  tt_m_total_watts: any;
  getTotalAllEnergy() {
    console.log("total call");
    this.user.present("");
    this.auth.getTodayTEnergyFromApi().subscribe(
      (res) => {
        this.user.dismiss();
        this.totaluserwHours = [];
        this.totaluserwDays = [];
        this.totaluserwWatts = [];
        console.log(res);
        this.tt_weeklydata = res;
        this.tt_weeklyData = this.tt_weeklydata.data;
        if (!this.energyData) {
          console.log("no Weekly data available");
        }
        console.log(this.tt_weeklyData[0].detail);
    
        this.tt_w_avg_hours = this.tt_weeklyData[0].detail.avg_hours.toFixed(2);
        this.tt_w_avg_watts = this.tt_weeklyData[0].detail.avg_watts.toFixed(2);
        this.tt_w_total_hours =
          this.tt_weeklyData[0].detail.total_hours.toFixed(2);
        this.tt_w_total_watts =
          this.tt_weeklyData[0].detail.total_watts.toFixed(2);

        this.tt_weeklydate = this.tt_weeklyData[0].detail.data;

        
        this.tt_weeklydate.forEach((x: any) => {
          // this.user.dismiss();
          this.totaluserwHours.push(x.hours);
          this.totaluserwDays.push(x.weekday);
          this.totaluserwWatts.push(x.total_watts);
          console.log("this.totaluserwDays",this.totaluserwDays);
          console.log("this.totaluserwWatts",this.totaluserwWatts);
          this.createBarChartTotalWeekly();
        });
        // this.user.dismiss();
      },
      (err) => {
        this.user.dismiss();
        console.log(err.error);
      }
    );

    this.auth.getMonthlyTotalEnergyFromApi().subscribe(
      (res) => {
        console.log(res);
        this.totalusermMonth = [];
        this.totalusermhours = [];
        this.totalusermwatts = [];
        this.tt_monthlydata = res;
        this.tt_monthlyData = this.tt_monthlydata.data;
        this.tt_m_avg_hours =
          this.tt_monthlyData[0].detail.avg_hours.toFixed(2);
        this.tt_m_avg_watts =
          this.tt_monthlyData[0].detail.avg_watts.toFixed(2);
        this.tt_m_total_hours =
          this.tt_monthlyData[0].detail.total_hours.toFixed(2);
        this.tt_m_total_watts =
          this.tt_monthlyData[0].detail.total_watts.toFixed(2);

        this.tt_monthlydate = this.tt_monthlyData[0].detail.data;
        console.log(this.tt_monthlydate);
        this.tt_monthlydate.forEach((x: any) => {
          this.totalusermMonth.push(x.month);
          this.totalusermhours.push(x.hours);
          this.totalusermwatts.push(x.total_watts.toFixed(1));
          console.log(this.totalusermMonth);
          console.log(this.totalusermwatts);
          this.createBarChartTotalMonthly();
          this.user.dismiss();
        });
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  t_avg_hours: any;
  t_avg_watts: any;
  t_total_hours: any;
  t_total_watts: any;
  w_avg_hours: any;
  w_avg_watts: any;
  w_total_hours: any;
  w_total_watts: any;
  m_avg_hours: any;
  m_avg_watts: any;
  m_total_hours: any;
  m_total_watts: any;

  getAllEnergy() {
    this.auth.getTodayEnergyFromApi(this.device_ID).subscribe(
      (res) => {
        this.hours = [];
        this.date = [];
        console.log(res);
        this.energydata = res;
        this.energyData = this.energydata.data;
        if (!this.energyData) {
          console.log("no Weekly data available");
        }
        console.log(this.energyData[0].days);

        this.w_avg_hours = this.energyData[0].days.avg_hours.toFixed(2);
        this.w_avg_watts = this.energyData[0].days.avg_watts.toFixed(2);
        this.w_total_hours = this.energyData[0].days.total_hours.toFixed(2);
        this.w_total_watts = this.energyData[0].days.total_watts.toFixed(2);
        this.energydate = this.energyData[0].days.data;
        this.user.present("");
        this.energydate.forEach((x: any) => {
          // this.user.dismiss();
          this.hours.push(x.total_watts);
          this.date.push(x.weekday);
          console.log(this.date);
          console.log(this.hours);
          // this.createBarChart();
          this.createBarChartWeekly();
        });
      },
      (err) => {
        this.user.dismiss();
        console.log(err.error);
      }
    );

    this.auth.getMonthlyEnergyFromApi(this.device_ID).subscribe(
      (res) => {
        console.log(res);
        this.monthlywatt = [];
        this.monthly1 = [];
        this.monthly2 = [];
        this.monthlydata = res;
        this.monthlyData = this.monthlydata.data;
        this.m_avg_hours = this.monthlyData[0].days.avg_hours.toFixed(2);
        this.m_avg_watts = this.monthlyData[0].days.avg_watts.toFixed(2);
        this.m_total_hours = this.monthlyData[0].days.total_hours.toFixed(2);
        this.m_total_watts = this.monthlyData[0].days.total_watts.toFixed(2);

        this.monthlydate = this.monthlyData[0].days.data;
        console.log(this.monthlydate);
        this.monthlydate.forEach((x: any) => {
          this.monthly1.push(x.month);
          this.monthlywatt.push(x.total_watts);
          this.monthly2.push(x.hours);
          console.log(this.weely1);
          console.log(this.weely2);
          this.createBarChartMonthly();
          this.user.dismiss();
        });
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  createBarChart() {
    const chartOptions = {
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
      },
    };
    this.bars = new Chart(this.barChartweekly.nativeElement, {
      type: "bar",
      data: {
        labels: this.date,
        datasets: [
          {
            barThickness: 6,
            minBarLength: 9,
            label: "Viewers in KWH",
            data: this.hours,
            backgroundColor: "rgb(38, 194, 129)", // array should have same number of elements as number of dataset
            borderColor: "rgb(38, 194, 129)", // array should have same number of elements as number of dataset
            borderWidth: 1,
          },
        ],
      },
      // options:chartOptions,
    });
  }

  createBarChart1() {
    let chartoOption = {
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],

        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
      },
    }
    this.bars = new Chart(this.barChart1.nativeElement, {
      type: "bar",
      data: {
        labels: this.monthly1,
        datasets: [
          {
            barThickness: 6,
            minBarLength: 9,
            label: "Viewers in KWH",
            data: this.monthlywatt,
            backgroundColor: "rgb(255, 99, 132)", // array should have same number of elements as number of dataset
            borderColor: "rgb(38, 194, 129)", // array should have same number of elements as number of dataset
            borderWidth: 1,
          },
        ],
      },
      // options:chartoOption,
    });
  }

  createBarChart2() {
    let chartoOption = {
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],

        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
      },
    }
    this.bars = new Chart(this.barChart2.nativeElement, {
      type: "bar",
      data: {
        labels: this.weely2,
        datasets: [
          {
            barThickness: 6,
            minBarLength: 9,
            label: "Viewers in KWH",
            data: this.weeklywatt,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(38, 194, 129)",
            borderWidth: 1,
          },
        ],
      },
      // options: chartoOption
    });
  }
  public create() {
    this.createCode = this.qrdata;
  }

  public clear() {
    this.createCode = "";
  }

  createBarChartToday() {
    let chartoOption = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    }
    this.bars = new Chart(this.barCharttoday.nativeElement, {
      type: "line",
      data: {
        labels: this.monthly1,
        datasets: [
          {
            label: "",
            data: this.monthly1, // watts will be display
            backgroundColor: "rgb(229,228,226)", // array should have same number of elements as number of dataset
            borderColor: "rgb(38, 194, 129)", // array should have same number of elements as number of dataset
            borderWidth: 1,
          },
        ],
      },
      // options: chartoOption
    });
  }

  createBarChartWeekly() {
    let charOption = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    }
    this.bars = new Chart(this.barChartweekly.nativeElement, {
      type: "line",
      data: {
        labels: this.date,
        datasets: [
          {
            label: "",
            data: this.hours,
            backgroundColor: "rgb(229,228,226)", // array should have same number of elements as number of dataset
            borderColor: "rgb(38, 194, 129)", // array should have same number of elements as number of dataset
            borderWidth: 1,
          },
        ],
      },
      // options: charOption,
    });
  }

  createBarChartMonthly() {
    let chartOption = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    }
    this.bars = new Chart(this.barChartmonthly.nativeElement, {
      type: "line",
      data: {
        labels: this.monthly1,
        datasets: [
          {
            label: "",
            data: this.monthly2,
            backgroundColor: "rgb(229,228,226)", // array should have same number of elements as number of dataset
            borderColor: "rgb(38, 194, 129)", // array should have same number of elements as number of dataset
            borderWidth: 1,
          },
        ],
      },
      // options:chartOption
    });
  }

  // Total user enrgy data

  createBarChartTotalWeekly() {
    console.log("total week call..");
    let chartOption = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    }
    this.bars = new Chart(this.barChartTotalweekly.nativeElement, {
      type: "line",
      data: {
        labels: this.totaluserwDays,
        datasets: [
          {
            label: "Switch graph",
            data: this.totaluserwWatts,
            backgroundColor: "rgb(229,228,226)", // array should have same number of elements as number of dataset
            borderColor: "rgb(38, 194, 129)", // array should have same number of elements as number of dataset
            borderWidth: 1,
          },
          // {
          //   label: "",
          //   data: this.totaluserwWatts,
          //   backgroundColor: "rgb(255,255,255)", // array should have same number of elements as number of dataset
          //   borderColor: "rgb(255, 255, 255)", // array should have same number of elements as number of dataset
          //   borderWidth: 1,
          // },
        ],
      },
      // options: chartOption,
    });
  }

  createBarChartTotalMonthly() {
    let chartOption = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    }
    this.bars = new Chart(this.barChartTotalmonthly.nativeElement, {
      type: 'line',
      data: {
        labels: this.totalusermMonth,
        datasets: [
          {
            label: "Switch graph",
            data: this.totalusermwatts,
            backgroundColor: "rgb(229,228,226)", // array should have same number of elements as number of dataset
            borderColor: "rgb(38, 194, 129)", // array should have same number of elements as number of dataset
            borderWidth: 1,
          },
        ],
      },
      // options:chartOption,
    });
  }
}
