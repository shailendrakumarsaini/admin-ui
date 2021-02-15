import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email;
  route : boolean;
  submmited : boolean = false;
  @ViewChild('formCtrl') formCtrl;
  loading: boolean;
  constructor(
    private router:Router
    ) { }

  ngOnInit() {
  } 

  onSubmit(formData){
    this.submmited = true;
    if(this.formCtrl.valid){
      this.loading = true;
      // this.forgotService.getAllUsers().subscribe(res =>{
      //   for(var i = 0; i < res['length']; i++){
      //     if(formData.Email == res[i]['Email']){
      //       this.loading = false;
      //       this.router.navigate(['changepassword',res[i]['id']]);
      //       break;
      //     }
      //   }
      //   if(i == res['length']){
      //     this.loading = false;
      //     alert('Please give correct credentials')
      //   }
      // },err => this.loading = false);
    }
  }

}
