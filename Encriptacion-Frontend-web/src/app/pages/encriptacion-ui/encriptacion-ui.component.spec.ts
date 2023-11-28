import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncriptacionUIComponent } from './encriptacion-ui.component';

describe('EncriptacionUIComponent', () => {
  let component: EncriptacionUIComponent;
  let fixture: ComponentFixture<EncriptacionUIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncriptacionUIComponent]
    });
    fixture = TestBed.createComponent(EncriptacionUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
