import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { environment } from '../environments/environment';

import * as components from './components';
@NgModule({
  declarations: [
    components.MovieListComponent,
    components.MovieComponent,
    components.HeaderComponent,
    components.FooterComponent,
    components.FavmoviesComponent,
    components.NotFoundComponent,
    components.SigninComponent,
    components.SignupComponent,
    components.ModalComponent,

    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
