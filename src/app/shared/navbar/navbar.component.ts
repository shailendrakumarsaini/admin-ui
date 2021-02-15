import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService : ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.apiService.post('user/logout', {}).subscribe(
      (res) => {
        if(res['success']){
          this.toastr.success('Logout Successfully');
          localStorage.removeItem('token');
          this.router.navigate(['auth','login']);
        }else{
          console.error(res);
          this.toastr.error(res['message']);
        }
      },
      (err) => {
        console.error(err);
        this.toastr.error(err['message']);
      }
    );

  }

}
