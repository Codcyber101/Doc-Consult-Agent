import { Test, TestingModule } from "@nestjs/testing";
import { DocumentController } from "./document.controller";
import { StorageService } from "../../modules/storage/storage.service";
import { AuthGuard } from "../../modules/auth/auth.guard";
import { ExecutionContext } from "@nestjs/common";
import { DocumentService } from "../../modules/document/document.service";
import { DocumentWorkflowService } from "../../workflows/document-analysis.workflow";

describe("DocumentController", () => {
  let controller: DocumentController;
  let storageService: StorageService;
  let documentService: DocumentService;
  let documentWorkflowService: DocumentWorkflowService;

  const mockStorageService = {
    uploadFile: jest.fn().mockResolvedValue("govassist-docs/test-file.pdf"),
  } as Partial<StorageService>;

  const mockDocumentService = {
    createDocument: jest.fn().mockResolvedValue({
      id: "doc-uuid-123",
      storage_path: "govassist-docs/test-file.pdf",
      user_id: "user-123",
    }),
    getDocumentOrThrow: jest.fn(),
    createAnalysisForDocument: jest.fn().mockResolvedValue({
      id: "analysis-uuid-123",
      status: "PROCESSING",
    }),
    setAnalysisWorkflowId: jest.fn().mockResolvedValue({
      id: "analysis-uuid-123",
      workflow_id: "workflow-123",
    }),
    getAnalysisOrThrow: jest.fn().mockResolvedValue({
      id: "analysis-uuid-123",
      status: "COMPLETED",
      results: { status: "PASS" },
    }),
  } as Partial<DocumentService>;

  const mockWorkflowService = {
    startAnalysis: jest.fn().mockResolvedValue("workflow-123"),
  } as Partial<DocumentWorkflowService>;

  const mockAuthGuard = {
    canActivate: (context: ExecutionContext) => {
      const req = context.switchToHttp().getRequest();
      req.user = { id: "user-123" };
      return true;
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [
        {
          provide: StorageService,
          useValue: mockStorageService,
        },
        {
          provide: DocumentService,
          useValue: mockDocumentService,
        },
        {
          provide: DocumentWorkflowService,
          useValue: mockWorkflowService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<DocumentController>(DocumentController);
    storageService = module.get<StorageService>(StorageService);
    documentService = module.get<DocumentService>(DocumentService);
    documentWorkflowService = module.get<DocumentWorkflowService>(
      DocumentWorkflowService,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should upload a file and return document details", async () => {
    const mockFile = {
      originalname: "test.pdf",
      buffer: Buffer.from("test"),
      mimetype: "application/pdf",
    } as any;

    const mockReq = { user: { id: "user-123" } };

    const result = await controller.uploadFile(mockFile, mockReq);

    expect(result).toEqual({
      document_id: "doc-uuid-123",
      storage_path: "govassist-docs/test-file.pdf",
      user_id: "user-123",
    });
    expect(storageService.uploadFile).toHaveBeenCalledWith(
      "test.pdf",
      mockFile.buffer,
      "application/pdf",
    );
    expect(documentService.createDocument).toHaveBeenCalledWith({
      userId: "user-123",
      storagePath: "govassist-docs/test-file.pdf",
      mimeType: "application/pdf",
      buffer: mockFile.buffer,
    });
  });

  it("should start analysis for a document and create analysis record", async () => {
    (mockDocumentService.getDocumentOrThrow as jest.Mock).mockResolvedValueOnce(
      { id: "doc-uuid-123" },
    );

    const result = await controller.analyzeDocument("doc-uuid-123", {
      jurisdiction_key: "addis-ababa",
      process_id: "trade-license",
      documents: ["Original Trade License"],
    });

    expect(mockDocumentService.getDocumentOrThrow).toHaveBeenCalledWith(
      "doc-uuid-123",
    );
    expect(mockDocumentService.createAnalysisForDocument).toHaveBeenCalledWith({
      documentId: "doc-uuid-123",
    });
    expect(mockWorkflowService.startAnalysis).toHaveBeenCalledWith({
      documentId: "doc-uuid-123",
      analysisId: "analysis-uuid-123",
      jurisdictionKey: "addis-ababa",
      processId: "trade-license",
      documents: ["Original Trade License"],
    });
    expect(mockDocumentService.setAnalysisWorkflowId).toHaveBeenCalledWith({
      analysisId: "analysis-uuid-123",
      workflowId: "workflow-123",
    });
    expect(result).toEqual({
      analysis_id: "analysis-uuid-123",
      workflow_id: "workflow-123",
      status: "PROCESSING",
    });
  });

  it("should return analysis results", async () => {
    const result = await controller.getAnalysis("analysis-uuid-123");
    expect(mockDocumentService.getAnalysisOrThrow).toHaveBeenCalledWith(
      "analysis-uuid-123",
    );
    expect(result).toEqual({
      status: "COMPLETED",
      results: { status: "PASS" },
    });
  });
});
