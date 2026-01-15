import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PolicyAdminService } from '../../modules/policy/admin.service';
import { AuthGuard } from '../../modules/auth/auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Admin Policy')
@Controller('admin/policies')
export class AdminPolicyController {
  constructor(private readonly policyAdminService: PolicyAdminService) {}

  @Post('draft')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Save a policy draft' })
  async saveDraft(@Body() body: { jurisdiction: string; filename: string; content: string }) {
    return this.policyAdminService.saveDraft(body.jurisdiction, body.filename, body.content);
  }

  @Post('approve')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Approve a policy draft' })
  async approve(@Body() body: { jurisdiction: string; filename: string }) {
    await this.policyAdminService.approvePolicy(body.jurisdiction, body.filename);
    return { status: 'approved' };
  }
}
