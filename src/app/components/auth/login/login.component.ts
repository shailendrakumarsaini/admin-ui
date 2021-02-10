import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
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
    private router : Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(formData){
    this.apiService.post('user/login', formData).subscribe(res=>{
      if(res['success'] && res['token']){
        this.toastr.success('Login Successfully');
        sessionStorage.setItem('jwt', res['token']);
        this.router.navigate(['dashboard', 'user']);
      }else{
        this.toastr.error( res['message']);
        console.log(res);
      }
    }),err=>{
      this.toastr.error(err['message']);
      console.log(err);
    };
  }

}
