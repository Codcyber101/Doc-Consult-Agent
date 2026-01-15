import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PolicyAdminService {
  private readonly registryPath = path.resolve(__dirname, '../../../../../policy-registry');

  async saveDraft(jurisdiction: string, filename: string, content: string): Promise<string> {
    const dir = path.join(this.registryPath, jurisdiction);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    const filePath = path.join(dir, `${filename}.draft.yaml`);
    fs.writeFileSync(filePath, content, 'utf8');
    return filePath;
  }

  async approvePolicy(jurisdiction: string, filename: string): Promise<void> {
    const draftPath = path.join(this.registryPath, jurisdiction, `${filename}.draft.yaml`);
    const approvedPath = path.join(this.registryPath, jurisdiction, `${filename}.yaml`);
    
    if (fs.existsSync(draftPath)) {
      fs.renameSync(draftPath, approvedPath);
    }
  }
}
