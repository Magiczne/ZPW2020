import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTripPreviewComponent } from './page-trip-preview.component';

describe('PageTripPreviewComponent', () => {
  let component: PageTripPreviewComponent;
  let fixture: ComponentFixture<PageTripPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTripPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTripPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
