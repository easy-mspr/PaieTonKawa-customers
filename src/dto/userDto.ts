export class CreateUserDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly phoneNumber: string;
    readonly address: string;
    readonly postalCode: string;
    readonly city: string;
    readonly company_id: number;
  }
  
  export class UpdateUserDto {
    readonly firstName?: string;
    readonly lastName?: string;
    readonly username?: string;
    readonly password?: string;
    readonly email?: string;
    readonly phoneNumber?: string;
    readonly address?: string;
    readonly postalCode?: string;
    readonly city?: string;
    readonly company_id?: number;
  }
  