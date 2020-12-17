import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTripEditComponent } from './page-trip-edit.component';

describe('PageTripEditComponent', () => {
  let component: PageTripEditComponent;
  let fixture: ComponentFixture<PageTripEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTripEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTripEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
