import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  // esse metodo mostra para o usuario as mensagens de validacoes ao mesmo tempo em todos o campos invalidos
  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      // if (control instanceof UntypedFormControl) verifica se a instancia e um FormControl
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormFields(control);
      }
    });
  }

  // esse metodo retorna um mesagem de erro de validaco de acordo com o erro de validacao nos FormControls do fomulario
  /* foi dado o nome formGroup ao parametro do formulario no metodo, porque pode ser recebido um grupo de formulario, 
     pode ser um array de formulario, pode ser um controle de formulario, por isso o nome generico */
  /* como a gora esta sendo recebido algo abstrato agente nao sabe qual vai ser o tipo do formulario, o parametro 
     formGroup foi tipado como UntypedFormGroup */
  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string) {
    // .get() metodo usado para referenciar o campo do formulario quando o formulario e do tipo .group
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormControl) {

    // operador elvis ?. se o campo tiver nullo ou  nao foi preenchido  ele nao vai apresentar erro
    // required valida se o campo estiver preechido;
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    // o nome da validacao tem que ser tudo menusculo para poder funcionar
    if (field?.hasError('minlength')) {
      /* o doido a baixo pega o tamanho necessario de caracters para poder informar qual e a quantidade 
      de caracters */
      /*  field.errors se o erro existir ? field.errors['minlength'] ['requiredLength']obtem qual e o 
      erro nesse caso acessou as propriedades  ['minlength'] e a outra propriedade ['requiredLength'] 
      que e o tamanho requerido */
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `O tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `O tamanho máximo precisa ser de ${requiredLength} caracteres`;
    }

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    return 'erro';

  }

  // metodo criado para obter a mensagem de erro de um formArray, ex: o campo lessons
  getFormArrayFieldErrorMessage(formGroup: UntypedFormGroup, formArrayName: string, fieldName: string, index: number) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  // esse metodo retorna true se o campo do array for invalido e se nao for preenchido e se o capo for campo for tocado 
  isFormArrayRequered(formGroup: UntypedFormGroup, formArrayName: string) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    /* !lenssons.valid so vai retornar se o campo nao for valido
    /* lenssons.hasError('required') so retorna se o campo tiver erro 'required' 
       ou se ja se campo nao estiver preenchido */
    /* .touched utilizado para exibir uma mensagem somente quando campo e tocado, 
       se ele nao for utilizado a mensagem vai aparecer constantemente no campo */
    return !formArray.valid && formArray.hasError('required') && formArray.touched;
  }

}
