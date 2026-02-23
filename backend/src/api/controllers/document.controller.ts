import {
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { StorageService } from "../../modules/storage/storage.service";
import { AuthGuard } from "../../modules/auth/auth.guard";
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";
import { DocumentService } from "../../modules/document/document.service";
import { DocumentWorkflowService } from "../../workflows/document-analysis.workflow";
import { Body } from "@nestjs/common";

@ApiTags("Documents")
@Controller("documents")
export class DocumentController {
  constructor(
    private readonly storageService: StorageService,
    private readonly documentService: DocumentService,
    private readonly documentWorkflowService: DocumentWorkflowService,
  ) {}

  @Post("upload")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Upload a document for analysis" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    const storagePath = await this.storageService.uploadFile(
      file.originalname,
      file.buffer,
      file.mimetype,
    );
    const document = await this.documentService.createDocument({
      userId: req.user.id,
      storagePath,
      mimeType: file.mimetype,
      buffer: file.buffer,
    });

    return {
      document_id: document.id,
      storage_path: document.storage_path,
      user_id: document.user_id,
    };
  }

  @Post(":documentId/analyze")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Start analysis workflow for a document" })
  @ApiParam({ name: "documentId", type: "string", format: "uuid" })
  async analyzeDocument(
    @Param("documentId") documentId: string,
    @Body()
    body?: {
      jurisdiction_key?: string;
      process_id?: string;
      documents?: string[];
    },
  ) {
    await this.documentService.getDocumentOrThrow(documentId);

    const analysis = await this.documentService.createAnalysisForDocument({
      documentId,
    });

    const workflowId = await this.documentWorkflowService.startAnalysis({
      documentId,
      analysisId: analysis.id,
      jurisdictionKey: body?.jurisdiction_key,
      processId: body?.process_id,
      documents: body?.documents,
    });

    await this.documentService.setAnalysisWorkflowId({
      analysisId: analysis.id,
      workflowId,
    });

    return {
      analysis_id: analysis.id,
      workflow_id: workflowId,
      status: analysis.status,
    };
  }

  @Get("analysis/:analysisId")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get analysis results" })
  @ApiParam({ name: "analysisId", type: "string", format: "uuid" })
  async getAnalysis(@Param("analysisId") analysisId: string) {
    const analysis = await this.documentService.getAnalysisOrThrow(analysisId);
    return {
      status: analysis.status,
      results: analysis.results,
    };
  }
}
