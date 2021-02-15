import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaeateCategoryComponent } from './create-category.component';

describe('CaeateCategoryComponent', () => {
  let component: CaeateCategoryComponent;
  let fixture: ComponentFixture<CaeateCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaeateCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaeateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
