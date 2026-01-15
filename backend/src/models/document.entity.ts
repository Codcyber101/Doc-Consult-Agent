import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column({ nullable: true })
  job_id: string;

  @Column()
  storage_path: string;

  @Column()
  mime_type: string;

  @Column()
  checksum: string;

  @CreateDateColumn()
  created_at: Date;
}
