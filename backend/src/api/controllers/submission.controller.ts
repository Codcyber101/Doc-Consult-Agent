import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../modules/auth/auth.guard";
import { SubmissionService } from "../../modules/submission/submission.service";

@ApiTags("Submissions")
@Controller("submissions")
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Submit an application package to MESOB" })
  async create(@Req() req: any, @Body() body: { package: any }) {
    const submission = await this.submissionService.createSubmission({
      userId: req.user.id,
      packageData: body.package,
    });

    return {
      submission_id: submission.id,
      portal_submission_id: submission.portal_submission_id,
      status: submission.status,
    };
  }

  @Get(":submissionId")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get a submission record" })
  @ApiParam({ name: "submissionId", type: "string", format: "uuid" })
  async getOne(@Param("submissionId") submissionId: string) {
    const sub = await this.submissionService.getSubmissionOrThrow(submissionId);
    return {
      submission_id: sub.id,
      portal_submission_id: sub.portal_submission_id,
      status: sub.status,
      metadata: sub.metadata,
      submitted_at: sub.submitted_at,
    };
  }

  @Get(":submissionId/status")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Refresh and get submission status" })
  @ApiParam({ name: "submissionId", type: "string", format: "uuid" })
  async getStatus(@Param("submissionId") submissionId: string) {
    const sub = await this.submissionService.refreshStatus(submissionId);
    return { submission_id: sub.id, status: sub.status, metadata: sub.metadata };
  }
}

