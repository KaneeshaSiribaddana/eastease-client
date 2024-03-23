import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSupplementsComponent } from './create-supplements.component';

describe('CreateSupplementsComponent', () => {
  let component: CreateSupplementsComponent;
  let fixture: ComponentFixture<CreateSupplementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSupplementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSupplementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
