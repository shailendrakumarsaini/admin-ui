import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryList: any = [];

  constructor(
    private apiService :ApiService,
    private router : Router,
    private toastr : ToastrService
  ) { }

  async ngOnInit(){
    await this.getUsersList();
  }

  getUsersList(){
    this.apiService.get('category').subscribe(
      res => {
        console.log('[category list]',res);
        this.categoryList = res;
      }
    );
  }

  redirectToUpdateCategoryComponent(id){
    this.router.navigate([`/dashboard/category/update/${id}`]);
  }

  delete(id){
    this.apiService.delete('category', id).subscribe(
      (res) => {
        if(res && res['success']){
          this.toastr.success(res['message']);
          this.getUsersList();
        }else{
          console.error(res);
          this.toastr.error(res['message']);
        }
      }
    );
  }

}
