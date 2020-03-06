import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicallyLoadingChartsComponent } from './dynamically-loading-charts.component';

describe('DynamicallyLoadingChartsComponent', () => {
  let component: DynamicallyLoadingChartsComponent;
  let fixture: ComponentFixture<DynamicallyLoadingChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicallyLoadingChartsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicallyLoadingChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
