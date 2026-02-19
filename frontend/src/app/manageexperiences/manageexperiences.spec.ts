import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Manageexperiences } from './manageexperiences';

describe('Manageexperiences', () => {
  let component: Manageexperiences;
  let fixture: ComponentFixture<Manageexperiences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Manageexperiences]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Manageexperiences);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
