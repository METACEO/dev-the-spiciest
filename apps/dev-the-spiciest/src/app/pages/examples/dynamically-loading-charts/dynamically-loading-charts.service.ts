import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

import { Chart, DynamicallyLoadingChartsServiceState } from './interfaces';

export const CHART_JS_SRC = new InjectionToken('CHART_JS_SRC');

@Injectable()
export class DynamicallyLoadingChartsService {
  private $script: HTMLScriptElement;
  private state: DynamicallyLoadingChartsServiceState = {
    charts: [],
    scriptLoaded: false,
    scriptLoading: false
  };
  private state$$ = new BehaviorSubject<DynamicallyLoadingChartsServiceState>(this.state);

  constructor(@Inject(DOCUMENT) private readonly document: HTMLDocument,
              @Inject(CHART_JS_SRC) private readonly chartJsSrc: string) {
  }

  public state$ = this.state$$.asObservable();

  public createChartInstance(canvas: HTMLCanvasElement, type: string): any {
    // Preferably we would get this from a window
    // reference or some other service, instead of
    // using the "window" API object directly here.
    // We create and return an empty chart to the
    // consumer for them to update.
    return new (window as any).Chart(canvas, {
      type,
      data: {}
    });
  }

  public loadScript(): void {
    // If the script has been loaded by someone
    // else, or by us from a previously viewed
    // route, short-circuit out of this method.
    if (this.hasTheScriptBeenLoaded()) {
      return;
    }
    // If the script is currently loading by
    // a previous caller, short-circuit out of
    // this method.
    if (this.state.scriptLoading) {
      return;
    }
    // If this method is being called for the
    // first time, set the loading flag on to
    // prevent any possible duplicated calls.
    this.updateState({
      ...this.state,
      scriptLoading: true
    });
    // Add the script to our provided document
    // and when done loading, set on the loaded
    // flag for consumers.
    this.$script = this.document.createElement('script');
    this.$script.async = true;
    this.$script.src = this.chartJsSrc;
    this.$script.onload = () => this.updateState({
      ...this.state,
      scriptLoading: false,
      scriptLoaded: true
    });
    this.document.head.appendChild(this.$script);
  }

  public chartCreate(type: string, label: string, data: number[]): void {
    // While this would be more of a backend
    // operation, we construct a new chart and
    // add it to our service's state.
    const id = (new Date()).getTime().toString();
    const newChart: Chart = { id, type, label, data };
    this.updateState({
      ...this.state,
      charts: [
        newChart,
        ...this.state.charts
      ]
    });
  }

  public chartDelete(chart: Chart): void {
    // While this would be more of a backend
    // operation, allow the user of this demo
    // to remove a specified chart from our
    // service's state.
    this.updateState({
      ...this.state,
      charts: this.state.charts.filter(c => c.id !== chart.id)
    });
  }

  public chartUpdate(chart: Chart): void {
    // While this would be more of a backend
    // operation, allow the user of this demo
    // to replace a specified chart. This will
    // drive the randomization of chart data.
    this.updateState({
      ...this.state,
      charts: this.state.charts.map(c => c.id === chart.id ? chart : c)
    });
  }

  public removeAllCharts(): void {
    // Provide the user of this demo
    // a quick utility to remove all
    // of the charts they may have
    // created (without clicking the
    // delete button on all charts.)
    this.updateState({
      ...this.state,
      charts: []
    });
  }

  private updateState(state: DynamicallyLoadingChartsServiceState): void {
    // This internal method helps others quickly
    // provide a new state and have that assigned
    // to the static reference and the broadcasted
    // to all consumers or selectors.
    this.state$$.next(this.state = state);
  }

  private hasTheScriptBeenLoaded(): boolean {
    // If our service instance has loaded the
    // script, then we can return so.
    if (this.state.scriptLoaded) {
      return true;
    }
    // Otherwise, check all of our document for
    // matching scripts and return so if found.
    for (let i = 0, length = this.document.scripts.length; i < length; i++) {
      if (this.document.scripts[i].src === this.chartJsSrc) {
        return true;
      }
    }
    // If nothing has been found, return so.
    return false;
  }

}
