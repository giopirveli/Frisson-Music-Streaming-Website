import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });
export const JwtConstants = {
  secret: process.env.GUARD_SECRET,
};
