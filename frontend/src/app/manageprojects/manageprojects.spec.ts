import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Manageprojects } from './manageprojects';

describe('Manageprojects', () => {
  let component: Manageprojects;
  let fixture: ComponentFixture<Manageprojects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Manageprojects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Manageprojects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
