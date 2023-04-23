import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPublicKeyComponent } from './no-public-key.component';

describe('NoPublicKeyComponent', () => {
  let component: NoPublicKeyComponent;
  let fixture: ComponentFixture<NoPublicKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoPublicKeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoPublicKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
