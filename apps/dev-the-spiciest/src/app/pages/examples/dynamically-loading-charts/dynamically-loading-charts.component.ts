import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { DynamicallyLoadingChartsService } from './dynamically-loading-charts.service';
import { Chart } from './interfaces';

@Component({
  selector: 'dev-the-spiciest-dynamically-loading-charts',
  templateUrl: './dynamically-loading-charts.component.html',
  styleUrls: ['./dynamically-loading-charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicallyLoadingChartsComponent implements OnInit {

  static GenerateRandomData(): number[] {
    // Without including any other external
    // dependency, we simply generate some
    // fake data to use when randomizing.
    return [
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100)
    ];
  }

  constructor(public readonly dynamicallyLoadingChartsService: DynamicallyLoadingChartsService) {
  }

  ngOnInit() {
    // Whenever we have our example page loading, try
    // and load the underlying Chart.js script. Instead
    // of bundling the library, we are asynchronously
    // adding the script to our page.
    // This service will handle the logic and awareness
    // of not adding multiple scripts, because we can be
    // loaded multiple times (via the router, back and
    // forth) and we don't want to add multiple scripts.
    this.dynamicallyLoadingChartsService.loadScript();
  }

  public add(): void {
    const chartTypes = ['line', 'bar', 'pie', 'doughnut', 'polarArea'];
    // Whenever the user clicks the button to create a new chart we
    // will create a random type of chart with some random data. The
    // service here could be seen as something that actually talks to
    // a backend service, etc.
    const type = chartTypes[Math.floor(Math.random() * chartTypes.length)];
    const label = 'My Chart Label';
    const data = DynamicallyLoadingChartsComponent.GenerateRandomData();
    this.dynamicallyLoadingChartsService.chartCreate(type, label, data);
  }

  public chartDelete(chart: Chart): void {
    // Provided a target chart, the below interaction could
    // be seen as a call to a backend service, etc.
    this.dynamicallyLoadingChartsService.chartDelete(chart);
  }

  public chartRandomize(chart: Chart): void {
    // While we are allowing the user to update a chart, it's
    // just randomizing the data. This could be seen as the
    // user actually specifying data and interacting with a
    // backend service, etc.
    this.dynamicallyLoadingChartsService.chartUpdate({
      ...chart,
      data: DynamicallyLoadingChartsComponent.GenerateRandomData()
    });
  }

  public removeAll(): void {
    // For demo's sake, allow the user to quickly remove
    // all/any charts that they have created.
    this.dynamicallyLoadingChartsService.removeAllCharts();
  }

}
