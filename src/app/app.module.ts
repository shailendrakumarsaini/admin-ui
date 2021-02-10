// pre defined modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

// Custom Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLoadingComponent } from './shared/app-loading/app-loading.component';

// Services
import { Interceptor } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AppLoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      autoDismiss: true,
      closeButton: true
    }),
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
