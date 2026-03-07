import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Personalinfo } from './personalinfo';

describe('Personalinfo', () => {
  let component: Personalinfo;
  let fixture: ComponentFixture<Personalinfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Personalinfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Personalinfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
