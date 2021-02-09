import { Component, OnInit,NgZone   } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Subject, Observable } from 'rxjs';
import { IsLoadingService } from '@service-work/is-loading';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './app-loading.component.html',
  styleUrls: ['./app-loading.component.scss']
})
export class AppLoadingComponent implements OnInit {

  color = 'red';
  mode = 'indeterminate';
  value = 50;
  isLoading: boolean;
  isLoadingWorker: Observable<boolean>;

  constructor(private apiService: ApiService,private zone:NgZone, private isLoadingService: IsLoadingService, private router: Router,) {
    
    this.apiService.isLoading.subscribe((v) => {
        this.zone.run(()=>{
          this.isLoading = v;
         });    
      },err => console.error(err));

  }

  ngOnInit() {
    this.isLoadingWorker = this.isLoadingService.isLoading$();
    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError,
        ),
      )
      .subscribe(event => {
        // If it's the start of navigation, `add()` a loading indicator
        if (event instanceof NavigationStart) {
          this.isLoadingService.add();
          return;
        }

        // Else navigation has ended, so `remove()` a loading indicator
        this.isLoadingService.remove();
      });

  }

}
