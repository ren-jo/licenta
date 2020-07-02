import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotateImageComponent } from './annotate-image.component';

describe('AnnotateImageComponent', () => {
  let component: AnnotateImageComponent;
  let fixture: ComponentFixture<AnnotateImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotateImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotateImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
