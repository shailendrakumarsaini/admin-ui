import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CaeateCategoryComponent implements OnInit {

  categoryForm : FormGroup;
  id: string;
  category : any;
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
    private toastr: ToastrService,
    private activatedRoute : ActivatedRoute
    ) {
      this.activatedRoute.params.subscribe(params => {
        console.log(params);
        this.id = params['id'];
      });
    }

  async ngOnInit() {
    await this.initFrom();
    this.categoryForm.valueChanges.subscribe(value =>{
      this.logValidationMessages();
    });
    if(this.id){
      this.getDataAndPopulateInForm(this.id);
    }
  }

  getDataAndPopulateInForm(id){
    this.apiService.get(`category/${id}`).subscribe(
      res => {
        console.log('[category response]',res);
        this.category = res;
        this.categoryForm.patchValue({
          name : res['name'],
          active : res['active'],
        });
      },
      err => {
        console.error(err);
        this.toastr.error(err['error']['message']);
      },
    );
  }

  onSubmit(formData){
    if(this.id){
      this.apiService.patch(`category/${this.id}`, formData).subscribe(
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
          console.error(err);
          this.toastr.error(err['error']['message']);
        }
      );
    }else{
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
          console.error(err);
          this.toastr.error(err['error']['message']);
        }
      );
    }
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
