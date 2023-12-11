import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActeurComponent } from './update-acteur.component';

describe('UpdateActeurComponent', () => {
  let component: UpdateActeurComponent;
  let fixture: ComponentFixture<UpdateActeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateActeurComponent]
    });
    fixture = TestBed.createComponent(UpdateActeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
