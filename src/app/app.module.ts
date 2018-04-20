import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './components/MainPage.component';
import { MainPageResolver } from './resolvers/Resolvers';
import { MainPageRepository } from './repositories/MainPageRepository';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
const appRoutes: Routes = [
    {path: '', component: MainPage, resolve: {formData: MainPageResolver}}
];

@NgModule({
  declarations: [
    AppComponent,
    MainPage
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
      MainPageResolver,
      MainPageRepository,
      FormBuilder,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
