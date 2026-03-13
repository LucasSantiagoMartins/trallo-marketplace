export class ResetPasswordDto {
    newPassword: string;
    confirmPassword: string;
    code: string;
    email: string;
}