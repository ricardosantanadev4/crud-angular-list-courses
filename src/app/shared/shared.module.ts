import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './componets/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';



@NgModule({
  // declaracao de components
  declarations: [
    ErrorDialogComponent
  ],
  // importacao de modulos
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  // exportacao de components
  exports: [
    ErrorDialogComponent
  ]

})
export class SharedModule { }
