import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userList:any = [];
  constructor(
    private apiService :ApiService
  ) { }

  async ngOnInit(){
    await this.getUsersList();
  }

  getUsersList(){
    this.apiService.get('user').subscribe(res=>{
      console.log('[user list]',res);
      this.userList = res;
    }),err=>{ console.log(err);};
  }

  redirectToUpdateUserComponent(id){

  }

}