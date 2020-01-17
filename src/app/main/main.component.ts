import { Component, OnInit } from '@angular/core';
import { SmartScriptService } from '../smart-script.service';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  private cmd: string;
  private pax: any;
  private airs: any;
  private remark: any;
  private lastCMD: any;
  private officeId: string;
  private TSTList: any;
  private hasTST: false;
  

  constructor( private smartScriptService: SmartScriptService) {
    this.cmd = 'RT';
    this.pax = [];
    this.airs = [];
    this.TSTList = [];
  }

  async ngOnInit() {
    // this.subScribeTasksNotify();
    this.lastCMD = await this.smartScriptService.retrieveLastCommand();
    this.subScribeOfficeSwitch();
  }

  private async sendCommand() {
    console.log('sendCommand: strCommand ==' + this.cmd);
    const smartScriptResponse = await this.smartScriptService.sendCommand(this.cmd);
    console.dir(smartScriptResponse);
   }
  

  private async getPNR() {
    const pnr = await this.smartScriptService.retrieveActivePNR();
    console.log("pnr yo");
    console.log(pnr);
    this.pax= pnr.nameElements;
    this.airs = pnr.airSegments;
    
  }

  private async addRemark() {
    const result = this.smartScriptService.addRemarkPNR(this.remark)
    console.log('result');
    console.log(result);
  }

  async subScribeTasks() {
    try {
      const subScribeRes = this.smartScriptService.subscribeEvent('tasks.activated');
      subScribeRes.then(async(data) => {
        console.log("In subscribeTasks..");
        console.log(JSON.parse(JSON.stringify(data)));
        if (data && data.id) {
          await this.smartScriptService.setContext(data.id)
        }
      }, (errorData) => {
        console.log("In subScribeTasks..error" + errorData);
      });
    
    } catch (err) {
        console.log(JSON.parse(JSON.stringify(err)));
        throw(err)
    }  
          
  }

async subScribeTasksNotify() {
    try {
      const subScribeRes = this.smartScriptService.subscribeEvent('commandpage.notifyResponse');
      subScribeRes.then(async(data) => {
        console.log("In subScribeTasksNotify..");
        console.log(JSON.parse(JSON.stringify(data)));
        if (data && data.Command == 'RM') {
          alert('got rm command');
        }

        if (data && data.Response.indexOf('NEED ITINERARY') > -1) {
          alert('Please book a flight');
        }

      }, (errorData) => {
        console.log("In subScribeTasksNotify..error" + errorData);
      });
    
    } catch (err) {
        console.log(JSON.parse(JSON.stringify(err)));
        throw(err)
    }  
}

    private async getTST() {
      const tst = await this.smartScriptService.retrieveActiveTST();
      console.log("tst yo");
      console.log(tst);
      console.log(tst.TSTList);
      console.log(tst.TSTList[0].tatooNumber);
      // console.log(tst.TSTList[0].baseFareElements);
      this.TSTList = tst.TSTList;
    }

    async subScribeOfficeSwitch() {
      try {
        const subScribeRes = this.smartScriptService.subscribeEvent('office.switch');
        subScribeRes.then(async(data) => {
          console.log("In subscribeOfficeSwitch..");
          console.log(JSON.parse(JSON.stringify(data)));
          alert ('Switching')
        }, (errorData) => {
          console.log('error'+ errorData);
        });          
      
      } catch (err) {
          console.log(JSON.parse(JSON.stringify(err)));
          throw(err)
      }              
    }

    async switchoOfficeId() {
      let result = false;
      try {
        console.log('switchOfficeId ;');
        const response = await this.smartScriptService.switchOffice(this.officeId);
        console.log(JSON.parse(JSON.stringify(response)));
        if (response && response === true) {
          result = true;
        }
      } catch (err) {
        console.log(JSON.parse(JSON.stringify(err)));
        throw(err)
      }
        
      }
    }
  






