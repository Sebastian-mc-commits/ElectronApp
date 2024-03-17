import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketTradeViewerComponent } from './market-trade-viewer.component';

describe('MarketTradeViewerComponent', () => {
  let component: MarketTradeViewerComponent;
  let fixture: ComponentFixture<MarketTradeViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketTradeViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketTradeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
