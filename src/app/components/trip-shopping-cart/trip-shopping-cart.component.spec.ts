import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripShoppingCartComponent } from './trip-shopping-cart.component';

describe('TripShoppingCartComponent', () => {
  let component: TripShoppingCartComponent;
  let fixture: ComponentFixture<TripShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripShoppingCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
