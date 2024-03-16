import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinsDateInfoComponent } from './bitcoins-date-info.component';

describe('BitcoinsDateInfoComponent', () => {
  let component: BitcoinsDateInfoComponent;
  let fixture: ComponentFixture<BitcoinsDateInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BitcoinsDateInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BitcoinsDateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
