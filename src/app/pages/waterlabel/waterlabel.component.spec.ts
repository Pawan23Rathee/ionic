import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaterlabelComponent } from './waterlabel.component';

describe('WaterlabelComponent', () => {
  let component: WaterlabelComponent;
  let fixture: ComponentFixture<WaterlabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterlabelComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaterlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
