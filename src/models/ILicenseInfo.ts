import { IOrchestraComponent } from './IOrchestraComponent';

export interface ILicenseInfo {
  licensedVersion: string;
  orchestraVersion: string;
  licensedCompanyName: string;
  expireDate: string;
  licenseStatus: string;
  components: IOrchestraComponent[];
}
