import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllSupplementsComponent } from './view-all-supplements.component';

describe('ViewAllSupplementsComponent', () => {
  let component: ViewAllSupplementsComponent;
  let fixture: ComponentFixture<ViewAllSupplementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllSupplementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAllSupplementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
