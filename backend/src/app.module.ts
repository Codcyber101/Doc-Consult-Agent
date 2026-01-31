import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./modules/auth/auth.module";
import { TemporalModule } from "./workflows/temporal.module";
import { StorageModule } from "./modules/storage/storage.module";
import { AuditModule } from "./modules/audit/audit.module";
import { PlaybookModule } from "./modules/playbook/playbook.module";
import { DocumentModule } from "./modules/document/document.module";
import { PolicyModule } from "./modules/policy/policy.module";
import { SubmissionModule } from "./modules/submission/submission.module";
import { AgentController } from "./api/controllers/agent.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || "user",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "govassist",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true, // Set to false in production
    }),
    AuthModule,
    TemporalModule,
    StorageModule,
    AuditModule,
    PlaybookModule,
    DocumentModule,
    PolicyModule,
    SubmissionModule,
  ],
  controllers: [AgentController],
})
export class AppModule {}
