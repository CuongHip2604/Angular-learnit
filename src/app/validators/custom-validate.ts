import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static MatchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password')?.value;
    let passwordConfirm = abstractControl.get('passwordConfirm')?.value;
    if (passwordConfirm != password) {
      abstractControl.get('passwordConfirm')?.setErrors({
        MatchPassword: true,
      });
    } else {
      abstractControl.get('passwordConfirm')?.setErrors(null);
    }
  }

  static email(abstractControl: AbstractControl) {
    const rule = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let email = abstractControl.value;
    if (email && !rule.test(email.trim())) {
      return { email: true };
    }
    return null;
  }

  static whitespace(control: AbstractControl) {
    if (control.value.length) {
      const isWhitespace = control.value.trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { whitespace: true };
    }

    return null;
  }
}
