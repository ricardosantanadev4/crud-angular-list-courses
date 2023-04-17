import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';



@NgModule({
  // declaracao de components
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmationDialogComponent,
  ],
  // importacao de modulos
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  // exportacao de components
  exports: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmationDialogComponent
  ]

})
export class SharedModule { }
