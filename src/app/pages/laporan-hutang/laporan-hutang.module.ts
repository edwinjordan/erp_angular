import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbInputModule,
  NbListModule,
  NbAlertModule,
  NbBadgeModule,
  NbSpinnerModule,
  NbDatepickerModule,
  NbCheckboxModule,
} from '@nebular/theme';


import { ThemeModule } from '../../@theme/theme.module';
import { LaporanHutangComponent } from './laporan-hutang.component';
import { CommonModule } from '@angular/common';

 @NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbInputModule,
    NbSelectModule,
    NbListModule,
    NbProgressBarModule,
    NbAlertModule,
    DataTablesModule,
    ReactiveFormsModule,
    NbBadgeModule,
    NbSpinnerModule,
    CommonModule,
    FormsModule,
    NbDatepickerModule,
    NbCheckboxModule
  ],
  declarations: [
    LaporanHutangComponent,
   // TentangListComponent,
  ],
  providers: [
  //  CountryOrdersMapService,
  ],
})
export class LaporanHutangModule { }
