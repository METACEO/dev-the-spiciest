import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dev-the-spiciest-dynamically-loading-charts-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}