import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { FormsModule } from '@angular/forms';
import { MonitorComponent } from './monitor.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';



@NgModule({
  imports: [
    HttpClientModule,
    HttpModule,
    CommonModule,
    FormsModule,
    MonitorRoutingModule,
    NzButtonModule,
    NzCardModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    NzTableModule,
    NzDropDownModule,
    NzModalModule,
    NzRadioModule,
    NzNotificationModule,
    NzCheckboxModule 
  ],
  declarations: [MonitorComponent],
  exports: [MonitorComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class MonitorModule { }
