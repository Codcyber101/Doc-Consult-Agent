import { Controller, Get, Param, Post, Body, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";
import { InternalTokenGuard } from "../../modules/auth/internal-token.guard";
import { DocumentService } from "../../modules/document/document.service";
import { StorageService } from "../../modules/storage/storage.service";
import { complianceEvaluationTotal } from "../../metrics/metrics";

@ApiTags("Internal")
@Controller("internal")
@UseGuards(InternalTokenGuard)
export class InternalDocumentController {
  constructor(
    private readonly documentService: DocumentService,
    private readonly storageService: StorageService,
  ) {}

  @Get("documents/:documentId")
  @ApiOperation({ summary: "Internal: get document metadata" })
  @ApiParam({ name: "documentId", type: "string", format: "uuid" })
  async getDocumentMetadata(@Param("documentId") documentId: string) {
    const doc = await this.documentService.getDocumentOrThrow(documentId);
    return {
      id: doc.id,
      user_id: doc.user_id,
      storage_path: doc.storage_path,
      mime_type: doc.mime_type,
      checksum: doc.checksum,
      created_at: doc.created_at,
    };
  }

  @Get("documents/:documentId/download")
  @ApiOperation({ summary: "Internal: download document bytes" })
  @ApiParam({ name: "documentId", type: "string", format: "uuid" })
  async downloadDocument(@Param("documentId") documentId: string) {
    const doc = await this.documentService.getDocumentOrThrow(documentId);
    const bytes = await this.storageService.downloadFile(doc.storage_path);
    // Nest will serialize Buffer as base64 in JSON if returned directly.
    // We return a JSON payload for simplicity in this MVP wiring step.
    return {
      document_id: doc.id,
      mime_type: doc.mime_type,
      bytes_base64: bytes.toString("base64"),
    };
  }

  @Post("analyses/:analysisId/complete")
  @ApiOperation({ summary: "Internal: mark analysis completed" })
  @ApiParam({ name: "analysisId", type: "string", format: "uuid" })
  async completeAnalysis(
    @Param("analysisId") analysisId: string,
    @Body() body: { results: any },
  ) {
    const analysis = await this.documentService.completeAnalysis({
      analysisId,
      results: body.results,
    });
    complianceEvaluationTotal.inc();
    return { id: analysis.id, status: analysis.status };
  }

  @Post("analyses/:analysisId/fail")
  @ApiOperation({ summary: "Internal: mark analysis failed" })
  @ApiParam({ name: "analysisId", type: "string", format: "uuid" })
  async failAnalysis(
    @Param("analysisId") analysisId: string,
    @Body() body: { error: any },
  ) {
    const analysis = await this.documentService.failAnalysis({
      analysisId,
      error: body.error,
    });
    return { id: analysis.id, status: analysis.status };
  }
}

