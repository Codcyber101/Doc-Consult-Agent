import { Controller, Get, Query } from '@nestjs/common';
import { PlaybookService } from '../../modules/playbook/playbook.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Playbooks')
@Controller('playbooks')
export class PlaybookController {
  constructor(private readonly playbookService: PlaybookService) {}

  @Get()
  @ApiOperation({ summary: 'List all available procedural playbooks' })
  async findAll() {
    return this.playbookService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Find a specific playbook by service and jurisdiction' })
  async findOne(@Query('service') service: string, @Query('jurisdiction') jurisdiction: string) {
    return this.playbookService.findOne(service, jurisdiction);
  }
}
