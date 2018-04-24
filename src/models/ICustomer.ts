export interface ICustomer {
  id?: number;
  publicId?: string;
  firstName: string;
  lastName: string;
  name: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string | number;
}
