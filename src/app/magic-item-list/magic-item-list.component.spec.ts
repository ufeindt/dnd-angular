import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicItemListComponent } from './magic-item-list.component';

describe('MagicItemListComponent', () => {
  let component: MagicItemListComponent;
  let fixture: ComponentFixture<MagicItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagicItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagicItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
