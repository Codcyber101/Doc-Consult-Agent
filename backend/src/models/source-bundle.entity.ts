import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("source_bundles")
export class SourceBundle {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid", { array: true })
  snippets: string[];

  @Column()
  task_id: string;

  @CreateDateColumn()
  created_at: Date;
}
