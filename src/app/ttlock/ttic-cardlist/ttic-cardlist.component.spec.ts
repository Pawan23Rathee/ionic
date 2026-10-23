import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TticCardlistComponent } from './ttic-cardlist.component';

describe('TticCardlistComponent', () => {
  let component: TticCardlistComponent;
  let fixture: ComponentFixture<TticCardlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TticCardlistComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TticCardlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
