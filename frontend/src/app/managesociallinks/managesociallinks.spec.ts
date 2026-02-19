import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Managesociallinks } from './managesociallinks';

describe('Managesociallinks', () => {
  let component: Managesociallinks;
  let fixture: ComponentFixture<Managesociallinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Managesociallinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Managesociallinks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
