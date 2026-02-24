import { Module, Global } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuditService } from "./audit.service";
import { AuditEvent } from "../../models/audit-event.entity";
import { AuditIngestService } from "./audit-ingest.service";
import { InternalAuditController } from "../../api/controllers/internal-audit.controller";
import { AuditController } from "../../api/controllers/audit.controller";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AuditEvent])],
  controllers: [InternalAuditController, AuditController],
  providers: [AuditService, AuditIngestService],
  exports: [AuditService, AuditIngestService],
})
export class AuditModule {}
