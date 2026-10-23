import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTuyaComponent } from './add-tuya.component';

describe('AddTuyaComponent', () => {
  let component: AddTuyaComponent;
  let fixture: ComponentFixture<AddTuyaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTuyaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTuyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
