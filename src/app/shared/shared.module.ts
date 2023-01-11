import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './componets/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CategoryPipe } from './pipes/category.pipe';



@NgModule({
  // declaracao de components
  declarations: [
    ErrorDialogComponent,
    CategoryPipe
  ],
  // importacao de modulos
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  // exportacao de components
  exports: [
    ErrorDialogComponent,
    CategoryPipe
  ]

})
export class SharedModule { }
