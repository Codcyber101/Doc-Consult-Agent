import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("regulation_snippets")
export class RegulationSnippet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  document_id: string;

  @Column("text")
  content: string;

  @Column("jsonb", { nullable: true })
  metadata: any;

  @CreateDateColumn()
  created_at: Date;
}
