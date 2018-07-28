import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsAdminComponent } from './awards-admin.component';

describe('AwardsAdminComponent', () => {
  let component: AwardsAdminComponent;
  let fixture: ComponentFixture<AwardsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
