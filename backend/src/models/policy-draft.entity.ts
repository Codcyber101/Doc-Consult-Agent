import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("policy_drafts")
export class PolicyDraft {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  jurisdiction: string;

  @Column("jsonb")
  content: any;

  @Column({ type: "uuid", nullable: true })
  source_bundle_id: string;

  @Column({ type: "float", default: 0 })
  confidence_score: number;

  @Column({
    type: "enum",
    enum: ["DRAFT", "PENDING_REVIEW", "APPROVED", "REJECTED"],
    default: "DRAFT",
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
