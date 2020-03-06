
export interface DynamicallyLoadingChartsServiceState {
  charts: Chart[];
  scriptLoaded: boolean;
  scriptLoading: boolean;
}

export interface Chart {
  data: number[];
  id: string;
  label: string;
  type: string;
}
