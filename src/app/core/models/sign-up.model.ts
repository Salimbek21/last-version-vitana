export class SignUpModel {
  login!: string;
  password!: string;
}

export class SignUpLastStepModel {
  name!: string;
  lastName!: string;
  middleName!: string;
  email!: string;
}


export class SignInModel {
  username!: string;
  password!: string;
}


export class TrustedModel {
  deviceTitle!: string;
  type!: string;
}



export class ForgotModel {
  login!: string;
}

export class ResetForm {
  password!: string;
}
