import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTripCreateComponent } from './page-trip-create.component';

describe('PageTripCreateComponent', () => {
  let component: PageTripCreateComponent;
  let fixture: ComponentFixture<PageTripCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTripCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTripCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
