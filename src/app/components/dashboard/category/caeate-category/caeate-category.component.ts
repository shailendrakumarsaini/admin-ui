import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-caeate-category',
  templateUrl: './caeate-category.component.html',
  styleUrls: ['./caeate-category.component.scss']
})
export class CaeateCategoryComponent implements OnInit {

  categoryForm : FormGroup; 
  validationMessages  = {
    'name' : {
                      'required': 'Category Name is Required',
                      'minlength': '3 Characters are Required'
                    },
    'active' : {
                    'required': 'Status is Required'
                  },
  };

  formErrors = {
    'name' : '',
    'active':'',
  };

  constructor(
    private fb:FormBuilder, 
    private router :Router,
    private apiService: ApiService,
    private toastr: ToastrService
    ) {}

  ngOnInit() {
    this.initFrom();
    this.categoryForm.valueChanges.subscribe(value =>{
      this.logValidationMessages();
    });
  }

  onSubmit(formData){
    this.apiService.post('category', formData).subscribe(
      (res)=>{
        if(res && res['success']){
          this.toastr.success(res['message']);
          this.router.navigate(['dashboard', 'category']);
        }else{
          this.toastr.error(res['message']);
          console.error(res);
        }
      },
      (err)=>{
        this.toastr.error(err['message']);
        console.error(err);
      }
    );
  }

  initFrom(){
    this.categoryForm = this.fb.group({
      name : ['', [Validators.required]],
      active : ['true', [Validators.required]]   
    });
  }

  logValidationMessages(group: FormGroup = this.categoryForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
        this.formErrors[key] = '';
          if (abstractControl && !abstractControl.valid && (abstractControl.touched)) {
            const messages = this.validationMessages[key];
            for (const errorKey in abstractControl.errors) {
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + ' ';
              }
            }
          }
          if (abstractControl instanceof FormGroup) {
            this.logValidationMessages(abstractControl); 
          } 
      });
  }

}
