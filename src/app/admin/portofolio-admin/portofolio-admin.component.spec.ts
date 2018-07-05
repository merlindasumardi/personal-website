import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortofolioAdminComponent } from './portofolio-admin.component';

describe('PortofolioAdminComponent', () => {
  let component: PortofolioAdminComponent;
  let fixture: ComponentFixture<PortofolioAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortofolioAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortofolioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
