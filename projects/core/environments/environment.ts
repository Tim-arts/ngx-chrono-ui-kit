import { Environment } from '../shared/types';

class EnvironmentImplementation implements Environment {
  production = false;
}

export const environment = new EnvironmentImplementation();
