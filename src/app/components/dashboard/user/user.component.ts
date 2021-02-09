import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private apiService :ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.get('user').subscribe(res=>{
      console.log(res);
    }),err=>{ console.log(err);};
  }

}