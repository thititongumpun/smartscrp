import { Injectable } from '@angular/core';
declare const window : any;
declare const PNR : any;
declare const TST: any;
@Injectable({
  providedIn: 'root'
})
export class SmartScriptService {
  private pnrObj: any;
  private tstObj: any;
  constructor() {
    this.pnrObj = new PNR();
    this.tstObj = new TST();
   }
  private static get session(): any {
    const smartScriptSession = window.smartScriptSession;
    if(!smartScriptSession) {
      console.log('smartscpt error');
    }
    return smartScriptSession;
  }

  async sendCommand(strCommand: string): Promise<any> {
    console.log('sendCommand: strCommand ==' + strCommand); 
    const smartScriptResponse = await SmartScriptService.session.send(strCommand);
    return smartScriptResponse ? smartScriptResponse : null;   
  }

  async retrieveActivePNR(): Promise<any> {
    await this.pnrObj.retrievePNR().catch(
      (error: any) => {
        console.log(error);
      }
    );
    return this.pnrObj;
  }

  async addRemarkPNR(rm: string): Promise<any> {
    const result = await this.sendCommand('RM' + rm)
    return result;
  }

  subscribeEvent(event: string): Promise<any> {
    return SmartScriptService.session.subscribeEvent(event);
  }

    async setContext(taskId: string): Promise<any> {
      const contextObj = {['taskId']: taskId};
      const smartScriptResponse = await SmartScriptService.session.setContext(contextObj).catch(
        (error: any) =>{
          console.log(JSON.parse(JSON.stringify(error)));
          throw new Error(error)          
        }
      );
      console.log('setContext' + taskId);
      console.log(JSON.parse(JSON.stringify(smartScriptResponse)));
      return smartScriptResponse;

    }

    async retrieveLastCommand(): Promise<string> {
      return await (SmartScriptService.session.getLastCommand() as Promise<any>).catch(
        (error: any) => {
          throw new Error(error)
        })
      
      }


      async retrieveActiveTST(): Promise<any> {
        await this.tstObj.retrieveTSTs().catch(
          (error: any) => {
            console.log(error);
          }
        );
        return this.tstObj;
      }
      

      subscribeOfficeEvent(event: string): Promise<any> {
        return SmartScriptService.session.subscribeOfficeEvent(event);
      }
    
        async switchOffice(officeId: string): Promise<any> {
          const input = {destinationOID: officeId};
          const smartScriptResponse = await SmartScriptService.session.switchOffice(input).catch(
            (error: any) =>{
              console.log(JSON.parse(JSON.stringify(error)));
              throw new Error(error)          
            }
          );
          console.log('switchOffice: ');
          console.log(JSON.parse(JSON.stringify(smartScriptResponse)));
          return smartScriptResponse;    
        }






    }





