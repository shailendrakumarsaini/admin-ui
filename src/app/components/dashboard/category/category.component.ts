import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryList: any = [];
  constructor(
    private apiService :ApiService,
    private router : Router
  ) { }

  async ngOnInit(){
    await this.getUsersList();
  }

  redirectToUpdateCategoryComponent(id){
    this.router.navigate([`/dashboard/category/${id}`]);
  }

  getUsersList(){
    this.apiService.get('category').subscribe(res=>{
      console.log('[category list]',res);
      this.categoryList = res;
    }),err=>{ console.log(err);};
  }

}
