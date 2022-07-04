import { Environment } from '../shared/types';

class EnvironmentImplementation implements Environment {
  production = true;
}

export const environment = new EnvironmentImplementation();
