import { ThrowStmt } from '@angular/compiler';
import { DOCUMENT } from '@angular/common'; 
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { getISOWeek } from 'date-fns';
import { DatePipe } from '@angular/common'
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { WelcomeService } from 'src/app/welcome.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as XLSX from 'xlsx';

export interface Data {
  booking_id: number;
  awb: string;
  client_code: string;
  shipper_name: string;
  city: string;
  rpu_date: number;
  why_code_remarks: string;
  exceptionCode : string;
  disabled: boolean;
  radioValue : number;
  waybillNo : string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {
  selectedIndex = 0;   
  public listTabel:any=[];

  public shipper_name:any;
  public awb: any;
  public tempId= new Set<any>();
  public city:any;
  public client_name:any;
  public date:any;
  public startdate: any;
  public enddate: any;
  selectedRemark = '';
  public disabled:any;
  public scheduleTime:any;
  

  //tabel
  dataList: any;
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<any>();
  

  //modal
 
  isSuccess = false;
  isVisible = false;
  isAddRemark = false;
  isCongrats = false;

  public requestData:any=[];
  public radioValue:any
  public radioChoose: any;

  //excell
  public file:any;
  public dataExcell:any;

  //validasi
  public isBookingid:any=[];
  public isDisabled:any=[];
  public validasiaddRemark:any=[];

  // choose your impit
  public disabledExcell:any;

  constructor(
    private i18n: NzI18nService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    public pickupService: WelcomeService,
    public datepipe: DatePipe,
    private message: NzMessageService,
    
    ) {}

  createBasicNotification(template: TemplateRef<{}>): void {
      this.notification.template(template);
  }

  createMessage(type: string): void {
    this.message.create(type, `Add Remark 1 persatu terlebih dahulu`);
  }

  onChange(date: Date[]): void {
    this.startdate =this.datepipe.transform(date[0], 'yyyy-MM-dd');
    this.enddate =this.datepipe.transform(date[1], 'yyyy-MM-dd');
    this.scheduleTime = this.datepipe.transform
    // var today = Date.now();
    // console.log("today"+ today)
  }

  onSchedule(result: Date): void {
    this.scheduleTime = this.datepipe.transform(result, 'yyyy-MM-dd')
  }

  updateCheckedSet(booking_id: number, checked: boolean): void {
    this.tempId = new Set<any>();
    this.tempId.add(booking_id);
  
    if (checked) {
      this.setOfCheckedId.add(booking_id);
      this.validasiaddRemark.push(booking_id) // validasi add Remark
    } else {
      this.setOfCheckedId.delete(booking_id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void { // reset cek after submit
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ booking_id }) => this.setOfCheckedId.has(booking_id));
    this.indeterminate = listOfEnabledData.some(({ booking_id }) => this.setOfCheckedId.has(booking_id)) && !this.checked;
  }

  onItemChecked(booking_id: number, checked: boolean): void {
    this.updateCheckedSet(booking_id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
  
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ booking_id }) => this.updateCheckedSet(booking_id, checked));
    this.refreshCheckedStatus();
  }

  ngOnInit(): void {
    if(localStorage.getItem('listData') !== null){
      this.dataList = localStorage.getItem('listData');
      this.listOfData = JSON.parse(this.dataList);
      setTimeout(() => {
        this.searchbyForm()
        }, 3000);
    }    
  }

  searchbyForm(): void { // update cek
    this.pickupService.getDetailTask()
      .subscribe((data: any[]) => {
        this.listOfData = data
        data.forEach(element => {
          // element.disabled = false;
          element.exceptionCode = null
          element.scheduleTime = null
          element.waybillNo = element.awb
          console.log("this.list of data : " + JSON.stringify(this.listOfData))
        });
      }, error => {
        
      });
  }

  handleOk(): void { // add remark
    // console.log("req"+ JSON.stringify(this.setOfCheckedId))
    // console.log("asd"+this.radioValue)
    // if(this.setOfCheckedId && this.radioValue){
    //   console.log("Berikan Mark terlebih dahulu")
    // }
    // else{
      this.validasiaddRemark.length=0;
      this.loading = true;
      this.requestData = this.listOfData.filter(list => this.tempId.has(list.booking_id));
      for(var data of this.requestData){
        data.exceptionCode = this.radioValue
        if(data.exceptionCode == 701 || data.exceptionCode == 702 || data.exceptionCode == 703  ){
        data.scheduleTime = this.scheduleTime}
        console.log("exceptionCode"+ data.exceptionCode)


      }
    this.isVisible = false;
    console.log("wew"+JSON.stringify(this.requestData))
    // }
  }
  
  handleCancel(): void {
    this.validasiaddRemark.length=0;
    this.isVisible = false;
  }

  sendRequest(): void { // ini submit remark final
    this.loading = true;
    this.requestData = this.listOfData.filter(list => this.setOfCheckedId.has(list.booking_id));
    for(var data of this.requestData){
      data.disabled = true;
    }
    if(localStorage.getItem('listData') === null){
      localStorage.setItem('listData',JSON.stringify(this.requestData));
    }else{
      localStorage.removeItem('listData');
    }
    this.ngOnInit()
    this.showSuccess();
  // }

  console.log("kiirim ke backend  "+ JSON.stringify(this.requestData))
  var dataSearch = this.requestData
  this.pickupService.sendtoSGS(dataSearch)
      .subscribe(data => {
          }, error => {
            console.log(" tidak ada datanya");
          });
  }

//start chips
  listOfOption: Array<{ value: string }> = [];
  listOfTagOptions = [];

  validasiAddRemark(booking_id: number): void {
    this.updateCheckedSet(booking_id, true);
    
    
    if(this.validasiaddRemark.length>2){
      this.validasiaddRemark.length=0;
      this.setOfCheckedId.clear();
      this.createMessage('warning')
    }
    else{
    this.isVisible = true;
  }
  }
  
  showModalAll(): void {
    // this.onAllChecked;
    this.isVisible = true;
    console.log('Buttons showModal() clicked!');
  }

  showConfirm(): void { // submit remark awal
    this.modal.confirm({
      nzTitle: '<i>Add Remarks</i>',
      nzContent: 'Are you sure you want to submit '+this.setOfCheckedId.size+' AWB with new remarks?',
      nzOnOk: () => this.sendRequest()
    });
  }

  showCongrats(): void {
    this.isCongrats = true;
  }

  showSuccess(): void {
    // this.file = "../assets/image/image.jpg"
    this.file = './src/assets/succescase.jpg'
    this.modal.success({
      
      nzTitle: '<i>Remarks Added Successfully</i>',
      
      nzContent: 'AWB have been successfully remarked' + this.file ,
      nzFooter : 'Congratulations, '+this.setOfCheckedId.size +' AWB have been successfully remarked' +this.isCongrats
    });
  }

  //excell
  fileUpload(event:any){
    // console.log(event.target.files);
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event:any) => {
      // console.log(event);
      let binaryData = event.target.result
      let workbook = XLSX.read(binaryData, {type:'binary'})
      this.dataExcell = ""
      workbook.SheetNames.forEach(sheet => {
        this.dataExcell = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
      })
      this.getApiexcell(this.dataExcell)
      // console.log("2"+JSON.stringify(this.dataExcell))
    }
  }

  searchbyExcel(dataExcell:any){
    console.log("2"+JSON.stringify(this.dataExcell))
    this.pickupService.getDetailTask()
      .subscribe((data: any[]) => {
        this.listOfData = data
        data.forEach(element => {
          // element.disabled = false
          element.exceptionCode = null
        });
      }, error => {
      });
  }

  getApiexcell(dataExcell:any){
  }

  // choose your input
  chooseInput(): void {
    this.disabledExcell = true;
  }
}