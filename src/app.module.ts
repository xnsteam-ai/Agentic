import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { AgentOrchestratorService } from './services/agent-orchestrator/agent-orchestrator.service';
import { WorkflowEngineService } from './services/workflow-engine/workflow-engine.service';
import { ExecutionService } from './services/execution-service/execution-service.service';
import { LLMRouterService } from './services/llm-router/llm-router.service';
import { AgentModule } from './modules/agents/agent.module';
import { TaskModule } from './modules/tasks/task.module';
import { WorkflowModule } from './modules/workflows/workflow.module';
import { ToolsModule } from './modules/tools/tools.module';
import { GitHubIntegrationModule } from './integrations/github/github-integration.module';
import { LLMIntegrationModule } from './integrations/llm/llm-integration.module';
import { ProjectController } from './api/controllers/project.controller';
import { AgentController } from './api/controllers/agent.controller';
import { TaskController } from './api/controllers/task.controller';
import { DeploymentController } from './api/controllers/deployment.controller';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'agentic',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
    AgentModule,
    TaskModule,
    WorkflowModule,
    ToolsModule,
    GitHubIntegrationModule,
    LLMIntegrationModule,
  ],
  controllers: [
    ProjectController,
    AgentController,
    TaskController,
    DeploymentController,
  ],
  providers: [
    AgentOrchestratorService,
    WorkflowEngineService,
    ExecutionService,
    LLMRouterService,
  ],
})
export class AppModule {}