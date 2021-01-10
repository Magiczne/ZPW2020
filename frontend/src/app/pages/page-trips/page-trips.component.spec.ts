import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTripsComponent } from './page-trips.component';
import {FilterTripsPipeMock} from '../../pipes/__mocks__/filter-trips.pipe';

describe('PageTripsComponent', () => {
  let component: PageTripsComponent;
  let fixture: ComponentFixture<PageTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTripsComponent, FilterTripsPipeMock ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
