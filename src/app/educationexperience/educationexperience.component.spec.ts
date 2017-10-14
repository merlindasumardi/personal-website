import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationexperienceComponent } from './educationexperience.component';

describe('EducationexperienceComponent', () => {
  let component: EducationexperienceComponent;
  let fixture: ComponentFixture<EducationexperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationexperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationexperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
