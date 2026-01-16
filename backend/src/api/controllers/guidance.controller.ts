import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../../modules/auth/auth.guard';

@ApiTags('Guidance')
@Controller('guidance')
export class GuidanceController {
  @Post('query')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Ask a natural language question about regulations' })
  async queryGuidance(@Body() body: { question: string; analysis_context?: any }) {
    // In real app, call RAG agent service
    return {
      summary: `Guidance for: ${body.question}`,
      citations: [
        {
          id: Math.random().toString(36).substring(7),
          claim_text: 'The license fee is 500 ETB',
          document_id: 'PROC-1234',
          page_number: 5,
          snippet: 'Article 5: The fee for trade license renewal shall be 500 ETB.'
        }
      ],
      confidence_score: 0.95,
      escalated_to_human: false
    };
  }
}
