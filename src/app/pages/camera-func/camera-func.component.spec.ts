import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CameraFuncComponent } from './camera-func.component';

describe('CameraFuncComponent', () => {
  let component: CameraFuncComponent;
  let fixture: ComponentFixture<CameraFuncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraFuncComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CameraFuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
