import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCatalogosComponent } from './menu-catalogos.component';

describe('MenuCatalogosComponent', () => {
  let component: MenuCatalogosComponent;
  let fixture: ComponentFixture<MenuCatalogosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuCatalogosComponent]
    });
    fixture = TestBed.createComponent(MenuCatalogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
