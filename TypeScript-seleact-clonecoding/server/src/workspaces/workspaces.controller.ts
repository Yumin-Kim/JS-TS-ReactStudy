import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Workspaces')
@Controller('api/workspaces')
export class WorkspacesController {
  @Get()
  getMuWorkspaces() {}

  @Post()
  createWorkspace() {}

  @Get(':url/members')
  getAllMembersFromWorkspace() {}

  @Post(':url/members')
  inviteMemebersToWorkspace() {}

  @Delete(':url/members:id')
  kickMemberFromWorkspace() {}

  @Get(':url/members/:id')
  getMembersInfoWorkspace() {}

  @Get(':url/users/:id')
  DEORECATED_getMembersInfoWorkspace() {
    this.getMembersInfoWorkspace();
  }
}
