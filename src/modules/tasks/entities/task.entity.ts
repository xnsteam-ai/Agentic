import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Agent } from '../agents/entities/agent.entity';
import { Workflow } from '../workflows/entities/workflow.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ default: 'pending' })
  status: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  order: number;

  @Column('json', { nullable: true })
  input: Record<string, any>;

  @Column('json', { nullable: true })
  output: Record<string, any>;

  @Column('text', { nullable: true })
  error: string;

  @ManyToOne(() => Agent, agent => agent.tasks)
  agent: Agent;

  @Column({ nullable: true })
  agentId: string;

  @ManyToOne(() => Workflow, workflow => workflow.tasks)
  workflow: Workflow;

  @Column({ nullable: true })
  workflowId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}