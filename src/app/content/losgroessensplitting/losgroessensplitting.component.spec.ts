import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LosgroessensplittingComponent } from './losgroessensplitting.component';

describe('LosgroessensplittingComponent', () => {
  let component: LosgroessensplittingComponent;
  let fixture: ComponentFixture<LosgroessensplittingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LosgroessensplittingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LosgroessensplittingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
