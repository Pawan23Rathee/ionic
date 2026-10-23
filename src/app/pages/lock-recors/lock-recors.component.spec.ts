import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LockRecorsComponent } from './lock-recors.component';

describe('LockRecorsComponent', () => {
  let component: LockRecorsComponent;
  let fixture: ComponentFixture<LockRecorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockRecorsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LockRecorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
