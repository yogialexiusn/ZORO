import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome.component';
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
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  imports: [
    HttpClientModule,
    HttpModule,
    CommonModule,
    FormsModule,
    // BrowserModule,
    WelcomeRoutingModule,
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
    NzCheckboxModule,
    MatChipsModule,
    NzMessageModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [DatePipe]
})
export class WelcomeModule { }
