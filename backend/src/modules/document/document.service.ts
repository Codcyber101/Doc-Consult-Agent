import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Document } from "../../models/document.entity";
import { Analysis } from "../../models/analysis.entity";
import * as crypto from "crypto";

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(Analysis)
    private readonly analysisRepository: Repository<Analysis>,
  ) {}

  async createDocument(options: {
    userId: string;
    storagePath: string;
    mimeType: string;
    buffer: Buffer;
    jobId?: string;
  }): Promise<Document> {
    const checksum = crypto
      .createHash("sha256")
      .update(options.buffer)
      .digest("hex");

    const doc = this.documentRepository.create({
      user_id: options.userId,
      job_id: options.jobId ?? null,
      storage_path: options.storagePath,
      mime_type: options.mimeType,
      checksum,
    });

    return this.documentRepository.save(doc);
  }

  async getDocumentOrThrow(documentId: string): Promise<Document> {
    const doc = await this.documentRepository.findOne({ where: { id: documentId } });
    if (!doc) {
      throw new NotFoundException(`Document ${documentId} not found`);
    }
    return doc;
  }

  async createAnalysisForDocument(options: {
    documentId: string;
    workflowId?: string;
  }): Promise<Analysis> {
    // Ensure the document exists
    await this.getDocumentOrThrow(options.documentId);

    const analysis = this.analysisRepository.create({
      document_id: options.documentId,
      workflow_id: options.workflowId ?? null,
      status: "PROCESSING",
      results: null,
    });

    return this.analysisRepository.save(analysis);
  }

  async setAnalysisWorkflowId(options: {
    analysisId: string;
    workflowId: string;
  }): Promise<Analysis> {
    const analysis = await this.getAnalysisOrThrow(options.analysisId);
    analysis.workflow_id = options.workflowId;
    return this.analysisRepository.save(analysis);
  }

  async completeAnalysis(options: {
    analysisId: string;
    results: any;
  }): Promise<Analysis> {
    const analysis = await this.getAnalysisOrThrow(options.analysisId);
    analysis.status = "COMPLETED";
    analysis.results = options.results;
    return this.analysisRepository.save(analysis);
  }

  async failAnalysis(options: {
    analysisId: string;
    error: any;
  }): Promise<Analysis> {
    const analysis = await this.getAnalysisOrThrow(options.analysisId);
    analysis.status = "FAILED";
    analysis.results = { error: options.error };
    return this.analysisRepository.save(analysis);
  }

  async getAnalysisOrThrow(analysisId: string): Promise<Analysis> {
    const analysis = await this.analysisRepository.findOne({
      where: { id: analysisId },
    });
    if (!analysis) {
      throw new NotFoundException(`Analysis ${analysisId} not found`);
    }
    return analysis;
  }
}

