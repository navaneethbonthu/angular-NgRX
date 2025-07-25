import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './store/app.state';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, LoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
