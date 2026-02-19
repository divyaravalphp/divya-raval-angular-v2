import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Personalinfo } from './personalinfo';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Personalinfo', () => {
  let component: Personalinfo;
  let fixture: ComponentFixture<Personalinfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Personalinfo],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Personalinfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});