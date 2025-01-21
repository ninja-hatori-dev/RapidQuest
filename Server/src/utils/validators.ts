export class Validators {
    static isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    static isValidPassword(password: string): boolean {
      return password.length >= 6;
    }
  }
  