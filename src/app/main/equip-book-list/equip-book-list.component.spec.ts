import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipBookListComponent } from './equip-book-list.component';

describe('EquipBookListComponent', () => {
  let component: EquipBookListComponent;
  let fixture: ComponentFixture<EquipBookListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipBookListComponent]
    });
    fixture = TestBed.createComponent(EquipBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
