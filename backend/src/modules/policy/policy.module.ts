import { Module } from "@nestjs/common";
import { PolicyAdminService } from "./admin.service";
import { AdminPolicyController } from "../../api/controllers/admin-policy.controller";

@Module({
  providers: [PolicyAdminService],
  controllers: [AdminPolicyController],
  exports: [PolicyAdminService],
})
export class PolicyModule {}
