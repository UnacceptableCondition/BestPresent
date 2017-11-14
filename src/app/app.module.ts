import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { GenderComponent } from './gender_component/gender.component';
import { OffersComponent } from './offers_component/offers.component';


//Http
import { HttpModule }   from '@angular/http';

//Routs
import {Routes, RouterModule} from '@angular/router';




const appRoutes: Routes =[
  { path: '', component: GenderComponent},
  { path: 'offers/:id', component: OffersComponent},
  { path: 'offers', component: OffersComponent},
  { path: '**', redirectTo: '/'}
];


@NgModule({
  declarations: [
    AppComponent,
    GenderComponent,
    OffersComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
