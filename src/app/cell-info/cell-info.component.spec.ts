import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellInfoComponent } from './cell-info.component';

describe('CellInfoComponent', () => {
  let component: CellInfoComponent;
  let fixture: ComponentFixture<CellInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
