import { Injectable, Logger } from "@nestjs/common";
import { Client, Connection } from "@temporalio/client";

@Injectable()
export class TemporalService {
  private readonly logger = new Logger(TemporalService.name);
  private client: Client | null = null;
  private connection: Connection | null = null;

  private async getClient(): Promise<Client> {
    if (this.client) return this.client;
    const address = process.env.TEMPORAL_HOST || "localhost:7233";
    this.connection = await Connection.connect({ address });
    this.client = new Client({ connection: this.connection });
    return this.client;
  }

  async startWorkflow(workflowName: string, args: any): Promise<string> {
    const taskQueue = process.env.TEMPORAL_TASK_QUEUE || "govassist-tasks";
    const workflowId = `${workflowName}-${Math.random().toString(36).slice(2)}`;
    try {
      const client = await this.getClient();
      const handle = await client.workflow.start(workflowName, {
        taskQueue,
        workflowId,
        args: [args],
      });
      this.logger.log(
        `[TEMPORAL] Started workflow ${workflowName} with ID ${handle.workflowId}`,
      );
      return handle.workflowId;
    } catch (err: any) {
      this.logger.warn(
        `[MOCK TEMPORAL FALLBACK] Failed to start workflow (${workflowName}): ${err?.message || err}`,
      );
      const fallbackId = `mock-wf-${Math.random().toString(36).substring(7)}`;
      return fallbackId;
    }
  }

  async getStatus(workflowId: string): Promise<string> {
    try {
      const client = await this.getClient();
      const handle = client.workflow.getHandle(workflowId);
      const desc = await handle.describe();
      return desc.status.name;
    } catch {
      return "UNKNOWN";
    }
  }
}
