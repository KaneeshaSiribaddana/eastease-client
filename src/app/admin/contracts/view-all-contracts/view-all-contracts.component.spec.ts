import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllContractsComponent } from './view-all-contracts.component';

describe('ViewAllContractsComponent', () => {
  let component: ViewAllContractsComponent;
  let fixture: ComponentFixture<ViewAllContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllContractsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAllContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
