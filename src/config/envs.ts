import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),

  MATRIX_ANALYSIS_URL: get('MATRIX_ANALYSIS_URL').required().asString(),

  JWT_SEED: get('JWT_SEED').required().asString(),

  WEB_APP_URL: get('WEB_APP_URL').required().asString(),
  SERVICE_SECRET: get('SERVICE_SECRET').required().asString(),
};
