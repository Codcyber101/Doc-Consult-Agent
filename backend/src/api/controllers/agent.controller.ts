import { Controller, Post, Body, Param, Logger } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import {
  complianceEvaluationTotal,
  mesobSubmissionTotal,
  ocrJobTotal,
  recordAgentExecution,
} from "../../metrics/metrics";

@ApiTags("Agents")
@Controller("agents")
export class AgentController {
  private readonly logger = new Logger(AgentController.name);

  @Post(":agentName/run")
  @ApiOperation({ summary: "Run a specific agent with payload" })
  async runAgent(@Param("agentName") agentName: string, @Body() payload: any) {
    const start = Date.now();
    this.logger.log(
      `Running agent ${agentName} with payload: ${JSON.stringify(payload)}`,
    );

    // Simulated "Real" Agent Interaction Logic
    if (agentName === "compliance-agent") {
      const result = this.handleCompliance(payload);
      complianceEvaluationTotal.inc();
      recordAgentExecution(agentName, "success", Date.now() - start);
      return result;
    } else if (agentName === "policy-research-agent") {
      const result = this.handleResearch(payload);
      recordAgentExecution(agentName, "success", Date.now() - start);
      return result;
    } else if (agentName === "document-analyzer") {
      const result = this.handleDocumentAnalysis(payload);
      ocrJobTotal.inc();
      recordAgentExecution(agentName, "success", Date.now() - start);
      return result;
    } else if (agentName === "mesob-connector") {
      mesobSubmissionTotal.inc();
      recordAgentExecution(agentName, "success", Date.now() - start);
      return { status: "submitted" };
    }

    recordAgentExecution(agentName, "error", Date.now() - start);
    return {
      status: "error",
      message: `Agent ${agentName} not implemented in live backend yet.`,
    };
  }

  private handleCompliance(payload: any) {
    const age = payload.applicant_data?.age;
    const isCompliant = age >= 18;

    return {
      compliant: isCompliant,
      violations: isCompliant
        ? []
        : [
            {
              rule_id: "min_age_18",
              severity: "critical",
              message: `Applicant Age (${age}) is below the minimum required age (18).`,
            },
          ],
      recommendations: isCompliant
        ? ["Proceed to next step"]
        : ["Wait until 18 or use a guardian"],
      confidence: 0.99,
      timestamp: new Date().toISOString(),
    };
  }

  private handleResearch(payload: any) {
    const query = payload.query || "";
    return {
      status: "completed",
      draft_policy: {
        id: `pol_${Math.random().toString(36).substring(7)}`,
        title: `Regulation for ${query}`,
        jurisdiction: payload.jurisdiction || "federal",
        effective_date: "2026-02-01",
        rules: [
          {
            id: "r1",
            title: "Registration Requirement",
            content: `All entities involved in ${query} must register.`,
          },
          {
            id: "r2",
            title: "Capital Requirements",
            content: "Minimum capital of 500,000 ETB required.",
          },
        ],
      },
      source_bundle: [
        {
          source: "Ethiopian Proclamation 1234/2024",
          snippet: `Section 5: ${query} activities are subject to...`,
          url: "https://legal.gov.et/proc1234",
        },
      ],
      confidence_score: 0.92,
    };
  }

  private handleDocumentAnalysis(payload: any) {
    const text = payload.document_text || "";
    const isPassport = text.toLowerCase().includes("passport");

    return {
      document_type: isPassport ? "passport" : "unknown",
      extracted_fields: isPassport
        ? {
            full_name: "Almaz Ayana",
            passport_number: "EP99887766",
            dob: "1992-08-12",
            gender: "Female",
          }
        : {},
      verification_checks: {
        format_valid: true,
        not_expired: true,
        ocr_confidence: 0.95,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
