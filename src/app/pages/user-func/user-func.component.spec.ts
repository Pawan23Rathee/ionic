import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserFuncComponent } from './user-func.component';

describe('UserFuncComponent', () => {
  let component: UserFuncComponent;
  let fixture: ComponentFixture<UserFuncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFuncComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
