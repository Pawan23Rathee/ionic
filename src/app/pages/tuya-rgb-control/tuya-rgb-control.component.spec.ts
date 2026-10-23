import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TuyaRgbControlComponent } from './tuya-rgb-control.component';

describe('TuyaRgbControlComponent', () => {
  let component: TuyaRgbControlComponent;
  let fixture: ComponentFixture<TuyaRgbControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyaRgbControlComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TuyaRgbControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
