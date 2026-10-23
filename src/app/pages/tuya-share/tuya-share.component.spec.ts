import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TuyaShareComponent } from './tuya-share.component';

describe('TuyaShareComponent', () => {
  let component: TuyaShareComponent;
  let fixture: ComponentFixture<TuyaShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyaShareComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TuyaShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
