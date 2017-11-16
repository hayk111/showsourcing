import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthMockService {

  authenticated;
  
  constructor(private router: Router) { }
  
  login(username: string, password: string){
    if(username  && password ){
      this.authenticated = true;
      this.router.navigate([''])
    }
  }

  logout(){
    this.authenticated = false;
  }

  private goHome(){
    this.router.navigate(['']);    
  }

}
