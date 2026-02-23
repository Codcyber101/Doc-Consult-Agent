import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing or invalid token");
    }

    // Mock Fayda/Keycloak verification
    const token = authHeader.split(" ")[1];
    if (token === "mock-user-token") {
      request.user = { id: "mock-user-id", auth_id: "fayda-123" };
      return true;
    }

    const secret = process.env.AUTH_JWT_SECRET;
    if (secret && secret.length > 0) {
      try {
        const payload = jwt.verify(token, secret) as any;
        const userId = payload.sub || payload.user_id || payload.uid;
        if (!userId) {
          throw new UnauthorizedException("JWT missing subject");
        }
        request.user = { id: userId, auth_id: payload.auth_id };
        return true;
      } catch {
        throw new UnauthorizedException("Invalid JWT token");
      }
    }

    throw new UnauthorizedException("Invalid token");
  }
}
