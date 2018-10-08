import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
          MatSortModule, MatTableModule, MatIconModule, MatButtonModule,
          MatCardModule, MatFormFieldModule } from "@angular/material";
import { AppComponent } from './app.component';
import { DocumentComponent } from './document/document.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { DocumentCreateComponent } from './document-create/document-create.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemesComponent } from './themes/themes.component';

const appRoutes: Routes = [
  {
    path: 'documents',
    component: DocumentComponent,
    data: { title: 'Document List' }
  },
  {
    path: 'document-details/:id',
    component: DocumentDetailComponent,
    data: { title: 'Document Details' }
  },
  {
    path: 'document-create',
    component: DocumentCreateComponent,
    data: { title: 'Create Document' }
  },
  {
    path: 'document-edit/:id',
    component: DocumentEditComponent,
    data: { title: 'Edit Document' }
  },
  {
    path: 'themes',
    component: ThemesComponent,
    data: { title: 'Theme List' }
  },
  { path: '',
    redirectTo: '/documents',
    pathMatch: 'full'
  },
  
];

@NgModule({
  declarations: [
    AppComponent,
    DocumentComponent,
    DocumentDetailComponent,
    DocumentCreateComponent,
    DocumentEditComponent,
    ThemesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
