import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { httpRequestDuration, metricsRegistry } from "./metrics/metrics";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function validateEnvironment() {
  const nodeEnv = process.env.NODE_ENV || "development";
  process.env.NODE_ENV = nodeEnv;

  if (nodeEnv === "production") {
    requireEnv("DB_HOST");
    requireEnv("DB_PORT");
    requireEnv("DB_USER");
    requireEnv("DB_PASSWORD");
    requireEnv("DB_NAME");
    requireEnv("MINIO_ENDPOINT");
    requireEnv("MINIO_PORT");
    requireEnv("MINIO_ACCESS_KEY");
    requireEnv("MINIO_SECRET_KEY");
    requireEnv("TEMPORAL_HOST");

    if (process.env.DB_PASSWORD === "password") {
      throw new Error("DB_PASSWORD must not use the default value in production.");
    }
    if (process.env.MINIO_ACCESS_KEY === "minioadmin") {
      throw new Error(
        "MINIO_ACCESS_KEY must not use the default value in production.",
      );
    }
    if (process.env.MINIO_SECRET_KEY === "minioadmin") {
      throw new Error(
        "MINIO_SECRET_KEY must not use the default value in production.",
      );
    }
  }
}

async function bootstrap() {
  validateEnvironment();
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: parseInt(process.env.RATE_LIMIT_MAX || "300", 10),
    }),
  );
  const corsOrigins =
    process.env.CORS_ORIGIN
      ?.split(",")
      .map((o) => o.trim())
      .filter((origin) => origin.length > 0);
  app.enableCors(
    corsOrigins && corsOrigins.length > 0
      ? { origin: corsOrigins }
      : undefined,
  );
  app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
      const route = req.route?.path || req.path;
      httpRequestDuration.observe(
        { method: req.method, route, status: res.statusCode.toString() },
        Date.now() - start,
      );
    });
    next();
  });
  app.use((req, res, next) => {
    const headerValue = req.headers["x-correlation-id"];
    const correlationId =
      typeof headerValue === "string" && headerValue.length > 0
        ? headerValue
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    req.headers["x-correlation-id"] = correlationId;
    res.setHeader("x-correlation-id", correlationId);
    next();
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("GovAssist Ethiopia API")
    .setDescription(
      "Sovereign-first, multi-agent platform for government document processes",
    )
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const server = app.getHttpAdapter().getInstance();
  server.get("/metrics", async (_req, res) => {
    res.setHeader("Content-Type", metricsRegistry.contentType);
    res.end(await metricsRegistry.metrics());
  });

  const port = parseInt(process.env.PORT || "3000", 10);
  await app.listen(port);
}
bootstrap();
