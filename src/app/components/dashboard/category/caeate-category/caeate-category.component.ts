import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router :Router
    ) {}

  ngOnInit() {
    this.initFrom();
    this.categoryForm.valueChanges.subscribe(value =>{
      this.logValidationMessages();
    });
  }

  onSubmit(formData){
    console.log(formData);
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
