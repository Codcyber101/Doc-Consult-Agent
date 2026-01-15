import { Module } from '@nestjs/common';
import { DocumentController } from '../../api/controllers/document.controller';

@Module({
  controllers: [DocumentController],
})
export class DocumentModule {}
