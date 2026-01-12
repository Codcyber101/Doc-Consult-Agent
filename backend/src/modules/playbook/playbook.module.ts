import { Module } from '@nestjs/common';
import { PlaybookService } from './playbook.service';
import { PlaybookController } from '../../api/controllers/playbook.controller';

@Module({
  providers: [PlaybookService],
  controllers: [PlaybookController],
  exports: [PlaybookService],
})
export class PlaybookModule {}
