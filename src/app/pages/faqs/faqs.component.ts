import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent implements OnInit {
  items = [
    {
      name: 'Do I have to change my switchboard?',
      subItems: [
        { name: "No, we provide you with a complete retrofit solution. The Kinetics bit (switch module) goes right behind your existing switchboards without any additional rewiring." },
      ],
    },
    {
      name: 'Does your product require any extra wiring?',
      subItems: [
        { name: 'No, our product does not require any kind of extra wiring and is perfectly compatible with your existing switchboards.' },
      ],
    },
    {
      name: 'Will configuring too many Kinetics devices load up on my Wi-Fi router?',
      subItems: [
        { name: 'No, Kinetics Hub is the central processing unit for entire home automation that is connected to every switch module, hence the Wi-Fi router doesn’t get any additional load. Also, our switch modules work on mesh network technology and the signal hops from one Kinetics device to another without loading up at a single point' }
      ],
    },
    {
      name: "Can I integrate my existing cameras with your product? ",
      subItems: [
        { name: "We can integrate your wireless IP cameras with our product." }
      ]
    },
    {
      name: "Do I need to pay any maintenance charge for the system?",
      subItems: [
        { name: "For the first year, we provide you with free premium support and guarantee. For the second and the third year, you can extend the warranty period further using an AMC of 11% per year. For the fourth year and further, 17% per year will be applicable." }
      ]
    },
    {
      name: "How Foolproof is Kinetics Security? ",
      subItems: [
        {name:"Kinetics ensures that your home is safe all the time. Our Motion detectors come with proximity sensors to make sure it can detect any covering over it. The Door Sensors have inbuilt magnetometer to detect any change in the magnetic field and thus can’t be manipulated with a magnet. All our security products keep up an active communication that makes them jammer proof."}
      ]
    },
    {
      name: "Can someone hack my home?",
      subItems: [
        {name:"Kinetics has a 3 layer security protocol system. While anything is hackable Kinetics protects you and your home with the state of the art encryption system. For more details contact us."}
      ]
    },
    {
      name: "How to buy Kinetics products? ",
      subItems: [
        {name:"You can reach us 10 am to 6 pm at +91 120 452 3544. You can also contact directly from the Help & Support section of Kineticshomz and KineticsLite application. Our marketing team will provide all information regarding Kinetics’s products."}
      ]
    },
    {
      name: "How to add devices or modules using KineticsLite app?",
      subItems: [
        {name:"You can go through the User Manual provided by Kinetics Kit and help & support."}
      ]
    },
    {
      name: "What if my wifi is down and I still want to use the appliances?",
      subItems: [
        {name:"Kinetics devices need internet to work. In case you are inside your home change your hotspot wifi settings to be same as your router’s username and password. Otherwise, connect to KineticsAstroxyz, disable mobile data and go to https://192.168.1.1, enter your home’s wifi credentials and wait for 1-2 mins. Check in your wifi setting if KineticsAstroxyz is visible. Connect to your home wifi and click on the next page. Set module in a room. Select device, fill device name and type if you bought a dimmable module set its max and min (based on user testing) and start controlling your devices."}
      ]
    },
    {
      name: "After installation, can we put the module in another room?",
      subItems: [
        {name:"Yes, disconnect all the appliances from the module. Follow the installation steps given the user manual found in the box to install the module. In the app, If your wifi router configuration is the same you can add devices in the room and start controlling, if not follow the steps give in Ans 10."}
      ]
    },
    {
      name: "Can we edit devices or room setting?",
      subItems: [
        {name:"Yes, you can edit (room name,device type,device name) ,delete(room,device) and add(room,device) functionality in room and devices."}
      ]
    },
    {
      name: "Will there be any heating issues in devices?",
      subItems: [
        {name:"No, there will be no heating issues in Kinetics Devices installed at your house. Kinetics Devices pass specific tests before going to the user’s home."}
      ]
    },
    {
      name: "Where can I get detailed instructions for operating Kinetics home automation app?",
      subItems: [
        {name:"You can go through the User Manual provided by Kinetics Kit and help & support."}
      ]
    },
    {
      name: "What is the mode of payment for Kinetics?",
      subItems: [
        {name:"You can pay via debit/credit card or PayTM or UPI or IMPS or NEFT payment."}
      ]
    },
    {
      name: "Do I need wifi router/internet in my home to use Kinetics System?",
      subItems: [
        {name:"Yes. Kinetics system needs internet connectivity at your home. If you don’t have wifi router then Kinetics System will have its own internet system and that will cost you monthly data charges."}
      ]
    },
    {
      name:"How do I Setup your product?",
      subItems:[
        {name:"Kinetics can schedule installation with a minimum notice of 5 days. You can also do the installation by yourself by following the User Manual provided with the product(s). If you are facing any issue in the installation process, you can contact Kinetics support team."}
      ]
    },
    {
      name:"Is Kinetics application available for IOS?",
      subItems:[
        {name:"Yes. The KineticsHomz and KineticsLite application supports IOS and Android."}
      ]
    },
    {
      name:"Is there in support system where I can raise any query?",
      subItems:[
        {name:"We provide free service for a year with max 5 free visits. After that, there will be a certain charge for visits. You can contact Kinetics help&support team 24*7."}
      ]
    },
    {
      name:"Will there be any short circuit issues or any other circuit related issues?",
      subItems:[
        {name:"No. There will be no issue in your house circuit. Everything will work as it was working before."}
      ]
    },
    {
      name:"Where can I report a bug?",
      subItems:[
        {name:"You can reach us from 10 am - 6 pm on working days at +91 120 452 3544 or contact@Kinetics.com You can also report a bug directly from Help & Support section of Kinetics Lite Application."}
      ]
    },
    {
      name:"What if I am not able to control the appliance from mobile?",
      subItems:[
        {name:"Please wait for some time. The device might be offline for some period. It will automatically come online at some time. If not please call on the Helpline number."}
      ]
    },
    {
      name:"Is it possible if I want to install more devices after the main installation has been done?",
      subItems:[
        {name:"Yes, it is possible to install more Kinetics Devices once the installation is done.You have to contact Kinetics team."}
      ]
    },
    {
      name:"What is the procedure to uninstall Kinetics Device from my home if I am not satisfied with Kinetics Service?",
      subItems:[
        {name:"You can raise a request for the uninstallation. Our team will visit your house in the next available slot to execute the uninstallation."}
      ]
    },
    {
      name:"When and how I will get the intruder detection notifications?",
      subItems:[
        {name:"To get intruder detection notification on your phone you need to keep “Security Mode” turned on from your application. If you have turned ON the Intruder Detector Switch then you will be notified on your application for any motion happening in front of that sensor."}
      ]
    },
    {
      name:"What all devices can be dimmed?",
      subItems:[
        {name:"Dimming is possible in fans as well as lights. For lights, we suggest our customers to get dimming feature for halogen bulbs, incandescent bulbs and dimmable LED(s) which are available in the market."}
      ]
    },
    {
      name:"How do you classify appliances as heavy devices?",
      subItems:[
        {name:"All appliances which come with a rating greater than 650 W are considered as heavy devices.Devies such as AC, geysers and refrigerators fall under this category."}
      ]
    },
    {
      name:"What happens if I forget my password?",
      subItems:[
        {name:"On the app login page click on forgot password. Fill in the OTP received on you registered phone.If you are facing any problem contact 0120-452 3544."}
      ]
    },
    {
      name:"What are the top features of TAM Remote Device?",
      subItems:[
        {name:"The Kinetics TAM remote is a small and portable device, that can be used to control a wide range of everyday home electronic appliances as a remote. It has 360-degree coverage in your room that enables it to send signals from any direction. You can use the app to access comprehensive TV guides, AC remote controls, etc.."}
      ]
    },
    {
      name:"How to configure Google Home and Amazon Alexa Voice Skills in my Mobile App?",
      subItems:[
        {name:"For detailed instructions, please refer the below links: Google Assistant: to be added Alexa: to"}
      ]
    },
    // Add more items with sub-lists as needed
  ];
  isItemExpanded: boolean[] = [];
  constructor() {
    this.items.forEach(() => {
      this.isItemExpanded.push(false);
    });
  }

  ngOnInit() { }
  toggleItem(index: number): void {
    this.isItemExpanded[index] = !this.isItemExpanded[index];
  }
}
