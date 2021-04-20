import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavmoviesComponent } from './favmovies.component';

describe('FavmoviesComponent', () => {
  let component: FavmoviesComponent;
  let fixture: ComponentFixture<FavmoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavmoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavmoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
