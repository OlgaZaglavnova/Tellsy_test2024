import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { TabMenuModule } from 'primeng/tabmenu';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { usersReducer } from './store/users/user.reducer';
import { FilterComponent } from './components/filter/filter.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { PhonePipe } from './pipes/phone.pipe';
import { DatePipe } from '@angular/common';
import { filterReducer } from './store/filter/filter.reducer';
import { EditUserComponent } from './components/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    UsersListComponent,
    FilterComponent,
    AddUserComponent,
    PhonePipe,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TabMenuModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    DialogModule,
    CalendarModule,
    InputTextModule,
    ProgressSpinnerModule,
    TooltipModule,
    StoreModule.forRoot({
      users: usersReducer,
      filter: filterReducer
    }),
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
