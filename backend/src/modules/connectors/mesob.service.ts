import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class MesobConnectorService {
  private readonly logger = new Logger(MesobConnectorService.name);

  async submitApplication(packageData: any): Promise<string> {
    const submissionId = `mesob-${Math.random().toString(36).substring(7)}`;
    this.logger.log(
      `[MOCK MESOB] Submitting application package. Assigned ID: ${submissionId}`,
    );
    return submissionId;
  }

  async getStatus(submissionId: string): Promise<string> {
    return "UNDER_REVIEW";
  }
}
