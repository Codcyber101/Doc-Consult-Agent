import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  private readonly logger = new Logger("PerformanceMetrics");

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      if (
        req.url.includes("/guidance/query") ||
        req.url.includes("/research/")
      ) {
        this.logger.log(
          `[LATENCY] ${req.method} ${req.url} took ${duration}ms`,
        );
        // In production, ship to Prometheus
      }
    });
    next();
  }
}
