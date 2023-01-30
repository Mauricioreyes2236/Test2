import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      .lc{
        background: rgb(28,27,47);
        background: linear-gradient(90deg, rgba(28,27,47,1) 0%, rgba(169,213,170,1) 100%);
      }
      .card{
        width: 33rem;
      }
    `
  ]
})
export class LoginComponent {

  emailPattern : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  

  miFormulario: FormGroup = this._fb.group({
    email   : ['', [ Validators.required, Validators.pattern(this.emailPattern)  ]],
    password: ['', [ Validators.required ] ]
  })

  constructor(private _fb: FormBuilder,
              private _authService: AuthService,
              private _router:Router){}

  get emailErrorMsg(): string{
    
    const errors = this.miFormulario.get('email')?.errors;

    if(errors?.['required']){
      return 'Email obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato Invalido'
    }

    return ''

  }
  
  campoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid
    && this.miFormulario.get(campo)?.touched;
  }
  
  login(){

    // email para acceder: eve.holt@reqres.in
    // password: cualquiera


    if(this.miFormulario.errors){return;}

    const user:any = {email: this.miFormulario.controls['email'].value, 
                      password: this.miFormulario.controls['password'].value};

    this._authService.login(user).subscribe( data => {
      if(data.token){
        localStorage.setItem('accessToken', data.token);
        this._router.navigate(['./pokemon']);
      }
    });
    
    
  }
}
