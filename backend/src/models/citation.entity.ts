import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("citations")
export class Citation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  claim_text: string;

  @Column({ type: "uuid" })
  snippet_id: string;

  @Column({ type: "uuid" })
  analysis_id: string;

  @Column({ default: false })
  is_verified: boolean;

  @CreateDateColumn()
  created_at: Date;
}
