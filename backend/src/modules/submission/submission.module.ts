import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MesobConnectorService } from "../connectors/mesob.service";
import { Submission } from "../../models/submission.entity";
import { SubmissionService } from "./submission.service";
import { SubmissionController } from "../../api/controllers/submission.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Submission])],
  controllers: [SubmissionController],
  providers: [MesobConnectorService, SubmissionService],
  exports: [MesobConnectorService, SubmissionService],
})
export class SubmissionModule {}
