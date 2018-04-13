import { UserRoleEffects } from './user-role.effects';
import { ServiceEffects } from './service.effects';
import { BranchEffects } from './branch.effects';
import { UserEffects } from './user.effects';
import { SystemInfoEffects } from './system-info.effects';
import { LicenseInfoEffects } from './license.effects';
import { CustomerEffects } from './customer.effects';
import { AppointmentEffects } from './appointment.effects';

export const effects: any[] = [
  AppointmentEffects,
  CustomerEffects,
  ServiceEffects,
  BranchEffects,
  UserEffects,
  SystemInfoEffects,
  LicenseInfoEffects,
  UserRoleEffects
];

export * from './service.effects';
export * from './branch.effects';
export * from './user.effects';
export * from './system-info.effects';
export * from './license.effects';
export * from './user-role.effects';
export * from './customer.effects';
export * from './appointment.effects';
