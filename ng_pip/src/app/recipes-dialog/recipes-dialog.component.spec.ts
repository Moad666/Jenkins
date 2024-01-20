import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesDialogComponent } from './recipes-dialog.component';

describe('RecipesDialogComponent', () => {
  let component: RecipesDialogComponent;
  let fixture: ComponentFixture<RecipesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipesDialogComponent]
    });
    fixture = TestBed.createComponent(RecipesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
