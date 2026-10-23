import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TuyalockComponent } from './tuyalock.component';

describe('TuyalockComponent', () => {
  let component: TuyalockComponent;
  let fixture: ComponentFixture<TuyalockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuyalockComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TuyalockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
