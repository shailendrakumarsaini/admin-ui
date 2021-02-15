import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  id: string;
  userForm : FormGroup;
  validationMessages  = {
    'name' : {
                'required': 'Category Name is Required',
                'minlength': '3 Characters are Required'
             },
    'phone' : {
                'required': 'Phone is Required',
                'minlength': '10 Digits are Required'
              },
    'email' : {
                'required': 'Email is Required',
                'email': 'Email should be valid'
              },
    'password' : {
                  'required': 'Password is Required',
                  'minlength': '4 Characters are Required'
                 },
    'category' : {
                  'required': 'Password is Required'
                 },
  };

  formErrors = {
    'name' : '',
    'phone':'',
    'email':'',
    'password':'',
    'category':'',
  };
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  categries : any;
  constructor(
    private fb:FormBuilder, 
    private router :Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private activatedRoute : ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe(params => { this.id = params['id']; });
  }

  async ngOnInit() {
    this.initFrom();
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      enableCheckAll: false,
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
    await this.getCategoryList();
    await this.getUserData();
    this.userForm.valueChanges.subscribe(value =>{
      this.logValidationMessages();
    });
  }

  userData:any;
  getUserData(){
    this.apiService.get(`user/${this.id}`).subscribe(
      (res:any) => {
        this.userData = res;
        const filterCategries = this.categries.filter((elem) => this.userData.category.find((id) => elem._id === id));
        const selectedCategries = filterCategries.map((element) => { return { name: element.name, _id: element._id } })
        // console.log('filterCategries',filterCategries);
        // console.log('selectedCategries',selectedCategries);
        this.userForm.patchValue({
          name : res.name,   
          phone : res.phone,   
          email : res.email,
          category : selectedCategries   
        })
      },
      err => console.error(err),
    );
  }

  getCategoryList(){
    this.apiService.get('category').subscribe(
      (res:any) => {
        this.categries = res;
        this.dropdownList = res.map((element) => { return { name: element.name, _id: element._id } })
      },
      err => console.error(err),
    );
  }

  onSubmit(formData){
    if(this.id){
      formData.category = formData.category.map((element) => { return [element._id ] })
      this.apiService.patch(`user/${this.id}`, formData).subscribe(
        (res)=>{
          if(res && res['success']){
            this.toastr.success(res['message']);
            this.router.navigate(['dashboard', 'user']);
          }else{
            console.error(res);
            this.toastr.error(res['message']);
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
    this.userForm = this.fb.group({
      name : [null, [Validators.required]],
      phone : [null, [Validators.required]],   
      email : [null, [Validators.required]],   
      // password : [null, [Validators.required]],   
      category : [null, [Validators.required]],   
    });
  }

  logValidationMessages(group: FormGroup = this.userForm): void {
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
