import { ServiceEffects } from './service.effects';
import { BranchEffects } from './branch.effects';
import { UserEffects } from './user.effects';
import { SystemInfoEffects } from './system-info.effects';

export const effects: any[] = [ServiceEffects, BranchEffects, UserEffects, SystemInfoEffects];

export * from './service.effects';
export * from './branch.effects';
export * from './user.effects';
export * from './system-info.effects';
