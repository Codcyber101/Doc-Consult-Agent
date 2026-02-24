import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { InternalTokenGuard } from "../../modules/auth/internal-token.guard";
import {
  AuditIngestPayload,
  AuditIngestService,
} from "../../modules/audit/audit-ingest.service";

@ApiTags("Internal")
@Controller("internal/audit")
@UseGuards(InternalTokenGuard)
export class InternalAuditController {
  constructor(private readonly auditIngestService: AuditIngestService) {}

  @Post("events")
  @ApiOperation({ summary: "Internal: ingest signed audit event" })
  async ingest(@Req() req: any, @Body() body: AuditIngestPayload) {
    const correlationId = req.headers["x-correlation-id"];
    const row = await this.auditIngestService.ingest({
      ...body,
      correlation_id:
        typeof correlationId === "string" ? correlationId : body.correlation_id,
    });
    return { id: row.id };
  }
}

