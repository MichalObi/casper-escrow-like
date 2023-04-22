import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectSignerComponent } from './connect-signer.component';

describe('ConnectSignerComponent', () => {
  let component: ConnectSignerComponent;
  let fixture: ComponentFixture<ConnectSignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectSignerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectSignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
