import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActeursComponent } from './acteurs.component';

describe('ActeursComponent', () => {
  let component: ActeursComponent;
  let fixture: ComponentFixture<ActeursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActeursComponent]
    });
    fixture = TestBed.createComponent(ActeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
