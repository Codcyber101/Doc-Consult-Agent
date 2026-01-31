import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("playbooks")
export class Playbook {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  service_type: string;

  @Column()
  jurisdiction: string;

  @Column("jsonb")
  steps: any;

  @Column()
  version: string;

  @Column({ nullable: true })
  policy_ref_id: string;

  @CreateDateColumn()
  created_at: Date;
}
