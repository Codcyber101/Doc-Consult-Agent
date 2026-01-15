import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    // Mock Fayda/Keycloak verification
    const token = authHeader.split(' ')[1];
    if (token === 'mock-user-token') {
      request.user = { id: 'mock-user-id', auth_id: 'fayda-123' };
      return true;
    }

    throw new UnauthorizedException('Invalid mock token');
  }
}
