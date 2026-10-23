import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TticCardaddComponent } from './ttic-cardadd.component';

describe('TticCardaddComponent', () => {
  let component: TticCardaddComponent;
  let fixture: ComponentFixture<TticCardaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TticCardaddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TticCardaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
