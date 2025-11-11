import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbAlertModule
} from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';

 import { ThemeModule } from '../../@theme/theme.module';
 import { ECommerceComponent } from './e-commerce.component';
@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
   // ChartModule,
    NbProgressBarModule,
    NbAlertModule
  ,
    NgxChartsModule,
  ],
  declarations: [
     ECommerceComponent,
  ],
  providers: [
 
  ],
})
export class ECommerceModule { }
