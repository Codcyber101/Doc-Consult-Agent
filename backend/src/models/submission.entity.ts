import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('submissions')
export class Submission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  portal_submission_id: string;

  @Column({ type: 'enum', enum: ['PENDING', 'SUBMITTED', 'ACCEPTED', 'REJECTED', 'APPROVED'], default: 'PENDING' })
  status: string;

  @Column('jsonb', { nullable: true })
  metadata: any;

  @CreateDateColumn()
  submitted_at: Date;
}
