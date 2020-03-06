import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChartComponent } from './chart/chart.component';
import { DynamicallyLoadingChartsComponent } from './dynamically-loading-charts.component';
import { CHART_JS_SRC, DynamicallyLoadingChartsService } from './dynamically-loading-charts.service';

@NgModule({
  declarations: [
    ChartComponent,
    DynamicallyLoadingChartsComponent
  ],
  providers: [
    DynamicallyLoadingChartsService,
    {
      provide: CHART_JS_SRC,
      useValue: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js'
    }
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DynamicallyLoadingChartsComponent
      }
    ])
  ]
})
export class DynamicallyLoadingChartsModule {
}
