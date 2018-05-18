import { ShiroEffects } from './shiro.effects';
import { CalendarSettingsEffects } from './calendar-settings.effects';
import { SettingsAdminEffects } from './settings-admin.effects';
import { UserRoleEffects } from './user-role.effects';
import { ServiceEffects } from './service.effects';
import { BranchEffects } from './branch.effects';
import { UserEffects } from './user.effects';
import { SystemInfoEffects } from './system-info.effects';
import { LicenseInfoEffects } from './license.effects';
import { CustomerEffects } from './customer.effects';
import { AppointmentEffects } from './appointment.effects';
import { DateEffects } from './date.effects';
import { TimeslotEffects } from './timeslot.effects';
import { NumberOfCustomersEffects } from './number-of-customers.effects';
import { ReserveEffects } from './reserve.effects';
import { AccountEffects } from './account.effects';
import { BookingEffects } from './booking.effects';
import { AppointmentMetaEffects } from './appointment-meta.effects';

export const effects: any[] = [
  AppointmentEffects,
  CustomerEffects,
  ServiceEffects,
  BranchEffects,
  UserEffects,
  SystemInfoEffects,
  LicenseInfoEffects,
  UserRoleEffects,
  SettingsAdminEffects,
  DateEffects,
  TimeslotEffects,
  NumberOfCustomersEffects,
  ReserveEffects,
  AccountEffects,
  BookingEffects,
  CalendarSettingsEffects,
  AppointmentMetaEffects,
  ShiroEffects
];

export * from './service.effects';
export * from './branch.effects';
export * from './user.effects';
export * from './system-info.effects';
export * from './license.effects';
export * from './user-role.effects';
export * from './customer.effects';
export * from './appointment.effects';
export * from './settings-admin.effects';
export * from './date.effects';
export * from './timeslot.effects';
export * from './number-of-customers.effects';
export * from './reserve.effects';
export * from './account.effects';
export * from './booking.effects';
export * from './calendar-settings.effects';
export * from './reservation-expiry-timer.effects';
export * from './appointment-meta.effects';
export * from './shiro.effects';
