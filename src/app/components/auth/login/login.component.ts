import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email : FormControl = null;
  password : FormControl = null;
  constructor(
    private apiService : ApiService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(formData){
    console.log(formData);
    this.apiService.post('user/login', formData).subscribe(res=>{
      if(res['success'] && res['token']){
        sessionStorage.setItem('jwt', res['token']);
        this.router.navigate(['dashboard', 'user']);
      }else{
        console.log(res);
      }
    }),err=>{ console.log(err);};
  }

}
