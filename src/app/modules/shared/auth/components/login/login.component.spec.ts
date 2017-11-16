import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

class AuthStub{
  login(){}
  logout(){}
}

class StoreStub{
  sub = new BehaviorSubject(null);

  next(x: any){
    this.sub.next(x);
  }
  select(str: string) { 
    return this.sub;
  }
}

const authObj = {
  authenticated: false,
  pending: false,
  error: ''
};

const storeStub = new StoreStub();
storeStub.next(authObj);

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent],
      providers: [ { provide: AuthService, useClass: AuthStub },
        { provide: Store, useValue: storeStub }
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


