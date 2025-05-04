import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFoodOrdersComponent } from './admin-food-orders.component';

describe('AdminFoodOrdersComponent', () => {
  let component: AdminFoodOrdersComponent;
  let fixture: ComponentFixture<AdminFoodOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFoodOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFoodOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
