import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
  Input
} from '@angular/core';
import {Chart} from 'chart.js';

import * as interfaces from '../interfaces';
import { DynamicallyLoadingChartsService } from '../dynamically-loading-charts.service';

@Component({
  selector: 'dev-the-spiciest-dynamically-loading-charts-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements AfterViewInit, OnChanges {
  // We will keep a reference to the native
  // chart object created by the Chart.js
  // library. Primarily we'll use this to
  // update and re-render the chart with
  // any new data this component receives.
  private $chart: Chart;

  // We use this reference later to pass in
  // the canvas HTML element to the Chart.js
  // library, when creating the native chart.
  @ViewChild('chartCanvas', { static: true })
  public chartRef;

  // The key input that will
  // drive what we render
  // within our view's canvas.
  @Input()
  public chart: interfaces.Chart;

  static GenerateRandomColors(opacity: string): string[] {
    // Without including an external dependency to generate
    // color codes, we use this method below in multiple
    // places to easily generate colors from the official
    // Chart.JS documentation.
    return [
      `rgba(255, 99, 132, ${opacity})`,
      `rgba(54, 162, 235, ${opacity})`,
      `rgba(255, 206, 86, ${opacity})`,
      `rgba(75, 192, 192, ${opacity})`,
      `rgba(153, 102, 255, ${opacity})`,
      `rgba(255, 159, 64, ${opacity})`
    ];
  }

  constructor(private readonly dynamicallyLoadingChartsService: DynamicallyLoadingChartsService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // We tap into changes to our component's input so
    // that whenever data changes (i.e. randomized) we
    // can be sure the native chart reflects and re-
    // renders the new input.
    // Only call the "updateChart" method if the chart
    // input has changed.
    const { currentValue, previousValue } = changes.chart;
    if (currentValue !== previousValue) {
      this.updateChart();
    }
  }

  ngAfterViewInit() {
    // After the view has initialized, we
    // can begin to create a chart against
    // the canvas element in our view.
    const { nativeElement } = this.chartRef;
    const { type } = this.chart;
    this.$chart = this.dynamicallyLoadingChartsService.createChartInstance(nativeElement, type);
    // Because our component now has a
    // chart object to work with, we will
    // want it to be updated with the
    // input values (because the "after-
    // view-init" event occurs after the
    // "on-init" or when the inputs are
    // available to use.
    this.updateChart();
  }

  private updateChart(): void {
    // If a chart object does not yet exist,
    // then short-circuit this method. This
    // could occur if this method is called
    // before the view has been initialized.
    if (!this.$chart) {
      return;
    }
    // The chart input has been provided and
    // we need to use some of the values.
    const { data, label, type } = this.chart;
    // If the chart is a line-type, there is
    // only one background to show, otherwise
    // generate an array of colors.
    const backgroundColor = type === 'line'
      ? 'rgba(0, 0, 0, 0)'
      : ChartComponent.GenerateRandomColors('0.2');
    // Regardless of the chart type, we will
    // need colors for the data values.
    const borderColor = ChartComponent.GenerateRandomColors('1');
    // If the chart is a line-type, we use
    // a thicker border to better show the
    // dots and lines on the graph.
    const borderWidth = type === 'line' ? 3 : 1;
    // Combine all of the above values to
    // our chart and then call the update
    // method for a re-rendering of any
    // changes to our chart.
    this.$chart.data = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        { label, data, backgroundColor, borderColor, borderWidth }
      ]
    };
    this.$chart.update();
  }

}
