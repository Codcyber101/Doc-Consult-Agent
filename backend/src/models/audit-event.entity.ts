import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("audit_events")
export class AuditEvent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  timestamp: string;

  @Column()
  event_type: string;

  @Column()
  actor: string;

  @Column("jsonb")
  details: any;

  @Column()
  signature: string;

  @Column()
  key_id: string;

  @Column({ nullable: true })
  correlation_id: string | null;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("audit_events")
export class AuditEvent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  timestamp: string;

  @Column()
  event_type: string;

  @Column()
  actor: string;

  @Column("jsonb")
  details: any;

  @Column()
  signature: string;

  @Column()
  key_id: string;

  @Column({ nullable: true })
  correlation_id: string | null;
}

