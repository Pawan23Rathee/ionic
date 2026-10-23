import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TuyalockfuncComponent } from './tuyalockfunc.component';

describe('TuyalockfuncComponent', () => {
  let component: TuyalockfuncComponent;
  let fixture: ComponentFixture<TuyalockfuncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyalockfuncComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TuyalockfuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
