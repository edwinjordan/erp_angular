import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  NbCardModule, 
  NbIconModule, 
  NbButtonModule, 
  NbSelectModule,
  NbCheckboxModule,
  NbAccordionModule,
  NbAlertModule,
  NbSpinnerModule
} from '@nebular/theme';
import { DataTablesModule } from 'angular-datatables';

import { MenuAccessComponent } from './menu-access.component';

@NgModule({
  declarations: [
    MenuAccessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbSelectModule,
    NbCheckboxModule,
    NbAccordionModule,
    NbAlertModule,
    NbSpinnerModule,
    DataTablesModule
  ]
})
export class MenuAccessModule { }
