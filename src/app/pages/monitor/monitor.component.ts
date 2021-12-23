import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { tr_TR } from 'ng-zorro-antd/i18n';
export interface Data {
  id: number;
  name: string;
  age: number;
  address: string;
  disabled: boolean;
}
@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  ayam = "susu";
  kucing = true;
  public awb: any;
  public NIK: any;
  public dept_code: any;
  public staging:any;
  public waybillNo: any;
  public originId:any;
  public limit:any;
  validasiLimit= false;

  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();
  selectedGoal: any;

  public elements:any=[];
  public el:any=[];
  
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.awb = this.setOfCheckedId.add(id);
      console.log("yang dicentang"+ JSON.stringify(id))
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    console.log("apa ini" + JSON.stringify(requestData))
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);
  }

  Remark(){
    console.log("kucing :"+ this.kucing)
    console.log("ayam :" +this.ayam)
  }

  constructor() { }

  ngOnInit(): void {
    this.elements = document.getElementsByClassName("child");
    this.elements[0].onclick = function(){
    this.classList.add("bak");  
    console.log("classLst" + this.classList)
    };

    
    
    
    // this.listOfData = 
    // [{"id":0,"name":"Edward King 0","age":32,"address":"London, Park Lane no. 0","disabled":true}
    // ,{"id":1,"name":"Edward King 1","age":32,"address":"London, Park Lane no. 1","disabled":false}]

    // console.log("lisstdatanya" + JSON.stringify(this.listOfData))
  }

  editGoal() {
    // Some code for your logic
    this.selectedGoal = 0
}

}