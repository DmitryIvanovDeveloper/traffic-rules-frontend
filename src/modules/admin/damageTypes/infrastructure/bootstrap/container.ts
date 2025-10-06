import { container } from '@/infrastructure/bootstrap/inversify.config';
import { TYPES } from '../../types';
import DamageTypesHttpRepository from '../repositories/damage-types.http.repository';
import DamageTypesLocalRepository from '../repositories/damage-types.local.repository';

// Repositories
container.bind(TYPES.DamageTypesHttpRepository).to(DamageTypesHttpRepository).inTransientScope();
container.bind(TYPES.DamageTypesLocalRepository).to(DamageTypesLocalRepository).inSingletonScope();








