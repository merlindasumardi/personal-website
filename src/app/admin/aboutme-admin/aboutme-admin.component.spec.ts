import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutmeAdminComponent } from './aboutme-admin.component';

describe('AboutmeAdminComponent', () => {
  let component: AboutmeAdminComponent;
  let fixture: ComponentFixture<AboutmeAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutmeAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutmeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
