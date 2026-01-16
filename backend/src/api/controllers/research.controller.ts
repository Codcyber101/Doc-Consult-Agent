import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../../modules/auth/auth.guard';

@ApiTags('Research')
@Controller('research')
export class ResearchController {
  @Post('policy-draft')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Start a new policy research job' })
  @ApiResponse({ status: 202, description: 'Research job accepted' })
  async startResearch(@Body() body: { query: string; jurisdiction?: string }) {
    // This would start a Temporal workflow (T015)
    return {
      job_id: Math.random().toString(36).substring(7),
      status: 'ACCEPTED'
    };
  }

  @Get('drafts/:draftId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Retrieve a policy draft and its source bundle' })
  async getDraft(@Param('draftId') draftId: string) {
    // Return draft from DB
    return {
      id: draftId,
      title: 'Sample Draft Policy',
      status: 'DRAFT',
      content: {}
    };
  }
}
