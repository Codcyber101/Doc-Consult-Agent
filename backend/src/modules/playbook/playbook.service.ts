import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";

@Injectable()
export class PlaybookService {
  private readonly registryPath = path.resolve(
    __dirname,
    "../../../../../policy-registry",
  );

  async findAll(): Promise<any[]> {
    const playbooks = [];
    const walk = (dir) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          walk(fullPath);
        } else if (file.endsWith(".yaml") || file.endsWith(".yml")) {
          if (!fullPath.includes("schemas")) {
            const content = fs.readFileSync(fullPath, "utf8");
            playbooks.push(yaml.load(content));
          }
        }
      }
    };
    walk(this.registryPath);
    return playbooks;
  }

  async findOne(serviceType: string, jurisdiction: string): Promise<any> {
    const all = await this.findAll();
    return all.find(
      (p) => p.service_type === serviceType && p.jurisdiction === jurisdiction,
    );
  }
}
