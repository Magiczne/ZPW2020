import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageShoppingConfirmComponent } from './page-shopping-confirm.component';

describe('PageShoppingConfirmComponent', () => {
  let component: PageShoppingConfirmComponent;
  let fixture: ComponentFixture<PageShoppingConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageShoppingConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageShoppingConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
