import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialComponent } from './social.component';
import { StorageService } from '../../shared/services/storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SocialComponent', () => {
  let component: SocialComponent;
  let fixture: ComponentFixture<SocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [SocialComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
