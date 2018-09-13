import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatMenuModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BoardComponent } from './board/board.component';
import { MyInfoComponent } from './my-info/my-info.component';
import { CellInfoComponent } from './cell-info/cell-info.component';
import { ChatComponent } from './chat/chat.component';
import { RemoteControllerService } from './remote-controller.service';
import { CellComponent } from './cell/cell.component';

const appRoutes: Routes = [
  { path: 'home',         component: HomeComponent },
  { path: 'main/:roomId', component: MainComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**',           component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    PageNotFoundComponent,
    BoardComponent,
    MyInfoComponent,
    CellInfoComponent,
    ChatComponent,
    CellComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true }
    ),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule
  ],
  providers: [RemoteControllerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
