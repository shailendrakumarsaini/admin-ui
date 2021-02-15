import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

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
  loading : boolean;
  @ViewChild('formCtrl') formCtrl;
  showErrMsg
  constructor(
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  register(formData){
    this.submmited = true;
    if(this.formCtrl.valid){
      this.loading = true;
      // this.registerService.checkEmailExistance(formData.Email).subscribe(res =>{
      //   if(res['exist'] == 'true'){
      //     this.registerService.registraction(formData).subscribe(res =>{
      //       this.loading = false;
      //       this.router.navigate(['login']);
      //     },err =>this.loading = false)
      //   }else{
      //     this.loading = false;
      //   }
      // });
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
