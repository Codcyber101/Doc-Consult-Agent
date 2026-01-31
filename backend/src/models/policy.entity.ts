import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("policies")
export class Policy {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  jurisdiction: string;

  @Column()
  version: string;

  @Column({ type: "date" })
  effective_date: Date;

  @Column("text")
  content: string;

  @Column({
    type: "enum",
    enum: ["DRAFT", "APPROVED", "DEPRECATED"],
    default: "DRAFT",
  })
  status: string;

  @Column("jsonb", { nullable: true })
  test_cases: any;

  @CreateDateColumn()
  created_at: Date;
}
