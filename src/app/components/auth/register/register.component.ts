import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstname;
  lastname;
  email;
  password;
  confirmpassword;
  submmited: boolean;
  @ViewChild('form') form;
  showErrMsg
  constructor(
    private router:Router,
    private apiService:ApiService,
    private toastr:ToastrService,
    ) { }

  ngOnInit(): void {
  }

  register(){
    this.submmited = true;
    if(this.form.valid){
      console.log(this.form.value);
      this.apiService.post('user',this.form.value).subscribe(
        res => {
          if(res && res['success']){
            this.toastr.success('Please check your mail to activate your account');
            this.router.navigate(['/auth/login']);
          }else{
            console.error(res);
            this.toastr.error(res['message']);
          }
        },
        err => {
          console.error(err);
          this.toastr.error(err.message);
        }
      );
    }
  }

  checkEqualPassword(password,confirmpassword){
    if(password != confirmpassword){
      this.showErrMsg = true;
    }else{
      this.showErrMsg = false;
    }
  }

}
