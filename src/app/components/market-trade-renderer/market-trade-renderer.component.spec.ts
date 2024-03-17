import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketTradeRendererComponent } from './market-trade-renderer.component';

describe('MarketTradeRendererComponent', () => {
  let component: MarketTradeRendererComponent;
  let fixture: ComponentFixture<MarketTradeRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketTradeRendererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketTradeRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
