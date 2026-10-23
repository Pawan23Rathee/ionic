import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TuyaSmartSceneComponent } from './tuya-smart-scene.component';

describe('TuyaSmartSceneComponent', () => {
  let component: TuyaSmartSceneComponent;
  let fixture: ComponentFixture<TuyaSmartSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyaSmartSceneComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TuyaSmartSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
