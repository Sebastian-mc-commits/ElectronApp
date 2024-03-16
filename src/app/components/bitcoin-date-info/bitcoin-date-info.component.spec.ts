import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinDateInfoComponent } from './bitcoin-date-info.component';

describe('BitcoinDateInfoComponent', () => {
  let component: BitcoinDateInfoComponent;
  let fixture: ComponentFixture<BitcoinDateInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BitcoinDateInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BitcoinDateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
