import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminmessages } from './adminmessages';

describe('Adminmessages', () => {
  let component: Adminmessages;
  let fixture: ComponentFixture<Adminmessages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminmessages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminmessages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
