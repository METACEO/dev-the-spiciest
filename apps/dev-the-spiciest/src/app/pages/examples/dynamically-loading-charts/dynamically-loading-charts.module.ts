import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DynamicallyLoadingChartsComponent } from './dynamically-loading-charts.component';

@NgModule({
  declarations: [
    DynamicallyLoadingChartsComponent
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
