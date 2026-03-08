import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Task } from '../tasks/entities/task.entity';

@Entity('agents')
export class Agent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ default: 'active' })
  status: string;

  @Column('json', { nullable: true })
  capabilities: Record<string, any>;

  @Column({ nullable: true })
  modelPreference: string;

  @OneToMany(() => Task, task => task.agent)
  tasks: Task[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}