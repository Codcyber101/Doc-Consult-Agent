import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class InternalTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers["x-internal-token"];

    const expected = process.env.INTERNAL_API_TOKEN;
    if (!expected || expected.length === 0) {
      throw new UnauthorizedException("Internal API is not configured.");
    }

    if (typeof token !== "string" || token !== expected) {
      throw new UnauthorizedException("Missing or invalid internal token.");
    }

    return true;
  }
}

