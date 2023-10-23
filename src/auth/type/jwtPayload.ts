import { UserRole } from 'src/user/user.entity';

export interface AccessTokenPayload {
  userId: number;
  role: UserRole;
}

export interface RefreshTokenPayload {
  userId: number;
  tokenVersion: number;
}