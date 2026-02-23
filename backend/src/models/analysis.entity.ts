import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export type AnalysisStatus = "PROCESSING" | "COMPLETED" | "FAILED";

@Entity("analyses")
export class Analysis {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  document_id: string;

  @Column({
    type: "enum",
    enum: ["PROCESSING", "COMPLETED", "FAILED"],
    default: "PROCESSING",
  })
  status: AnalysisStatus;

  @Column("jsonb", { nullable: true })
  results: any | null;

  @Column({ nullable: true })
  workflow_id: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

