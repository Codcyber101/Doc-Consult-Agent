import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentController } from "../../api/controllers/document.controller";
import { Document } from "../../models/document.entity";
import { Analysis } from "../../models/analysis.entity";
import { DocumentService } from "./document.service";

@Module({
  imports: [TypeOrmModule.forFeature([Document, Analysis])],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
