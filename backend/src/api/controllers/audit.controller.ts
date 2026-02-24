import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../modules/auth/auth.guard";
import { AuditIngestService } from "../../modules/audit/audit-ingest.service";

@ApiTags("Audit")
@Controller("audit")
@UseGuards(AuthGuard)
export class AuditController {
  constructor(private readonly auditIngestService: AuditIngestService) {}

  @Get("events")
  @ApiOperation({ summary: "List audit events" })
  async list(
    @Query("limit") limit = "50",
    @Query("offset") offset = "0",
  ) {
    const parsedLimit = Math.min(200, Math.max(1, parseInt(limit, 10) || 50));
    const parsedOffset = Math.max(0, parseInt(offset, 10) || 0);

    const { items, total } = await this.auditIngestService.list({
      limit: parsedLimit,
      offset: parsedOffset,
    });

    return {
      total,
      items: items.map((i) => ({
        id: i.id,
        timestamp: i.timestamp,
        event_type: i.event_type,
        actor: i.actor,
        details: i.details,
        signature: i.signature,
        key_id: i.key_id,
        correlation_id: i.correlation_id,
        created_at: i.created_at,
      })),
    };
  }
}

