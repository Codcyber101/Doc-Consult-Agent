import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Submission } from "../../models/submission.entity";
import { MesobConnectorService } from "../connectors/mesob.service";

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
    private readonly mesobConnectorService: MesobConnectorService,
  ) {}

  async createSubmission(options: {
    userId: string;
    packageData: any;
  }): Promise<Submission> {
    const portalId = await this.mesobConnectorService.submitApplication(
      options.packageData,
    );

    const submission = this.submissionRepository.create({
      user_id: options.userId,
      portal_submission_id: portalId,
      status: "SUBMITTED",
      metadata: { package: options.packageData },
    });

    return this.submissionRepository.save(submission);
  }

  async getSubmissionOrThrow(id: string): Promise<Submission> {
    const sub = await this.submissionRepository.findOne({ where: { id } });
    if (!sub) throw new NotFoundException(`Submission ${id} not found`);
    return sub;
  }

  async refreshStatus(id: string): Promise<Submission> {
    const sub = await this.getSubmissionOrThrow(id);
    const status = await this.mesobConnectorService.getStatus(
      sub.portal_submission_id,
    );

    // Normalize into our internal enum when possible
    const normalized =
      status === "APPROVED" || status === "ACCEPTED" || status === "REJECTED"
        ? status
        : "SUBMITTED";
    sub.status = normalized;
    sub.metadata = { ...(sub.metadata || {}), mesob_status: status };
    return this.submissionRepository.save(sub);
  }
}

