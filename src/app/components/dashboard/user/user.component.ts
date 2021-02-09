import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  usersList:any = [];
  fieldName : string;
  order : boolean = false;
  constructor(
    private apiService :ApiService
  ) { }

  async ngOnInit(){
    await this.getUsersList();
  }

  getUsersList(){
    this.apiService.get('user').subscribe(res=>{
      console.log(res);
      this.usersList = res;
    }),err=>{ console.log(err);};
  }

  orderByFunction(value){
    if (this.fieldName === value) {
      this.order = !this.order;
    }
    this.fieldName = value;
  }

}