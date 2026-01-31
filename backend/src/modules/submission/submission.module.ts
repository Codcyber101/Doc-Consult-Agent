import { Module } from "@nestjs/common";
import { MesobConnectorService } from "../connectors/mesob.service";

@Module({
  providers: [MesobConnectorService],
  exports: [MesobConnectorService],
})
export class SubmissionModule {}
