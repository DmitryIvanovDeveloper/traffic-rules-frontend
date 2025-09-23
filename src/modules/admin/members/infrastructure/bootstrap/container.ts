import { TYPES } from '../../types';
import { container } from '@/infrastructure/bootstrap/inversify.config';

import IMembersRepository from '@/modules/admin/members/business/plugins/members.http-repository.plugin';
import IMembersLocalRepository from '@/modules/admin/members/business/plugins/members.local-repository.plugin';
import MembersHttpRepository from '@/modules/admin/members/infrastructure/repositories/members.http-repository';
import MembersLocalRepository from '@/modules/admin/members/infrastructure/repositories/members.local-repository';
import MembersPresenter from '@/modules/admin/members/presentation/presenter/members.presenter';
import MembersController from '@/modules/admin/members/presentation/controller/members.controller';
import IMembersHttpRepository from '@/modules/admin/members/business/plugins/members.http-repository.plugin';
import LoadMembersUseCase from '../../business/usecases/load-members.usecase';
import LoadMemberUseCase from '../../business/usecases/load-member.usecase';
import AssignMemberToProjectUseCase from '../../business/usecases/assign-member-project.usecase';
import UnAssignMemberToProjectUseCase from '../../business/usecases/unassign-member-project.usecase';

container
	.bind<IMembersHttpRepository>(TYPES.MembersHttpRepository)
	.to(MembersHttpRepository)
	.inSingletonScope();

container
	.bind<IMembersLocalRepository>(TYPES.MembersLocalRepository)
	.to(MembersLocalRepository)
	.inSingletonScope();

container
	.bind(TYPES.MembersPresenter)
	.to(MembersPresenter)
	.inSingletonScope();

container
	.bind(TYPES.MembersController)
	.to(MembersController)
	.inSingletonScope();

container
	.bind(TYPES.LoadMembersUseCase)
	.to(LoadMembersUseCase)
	.inSingletonScope();

container
	.bind(TYPES.LoadMemberUseCase)
	.to(LoadMemberUseCase)
	.inSingletonScope();

container
	.bind(TYPES.AssignMemberToProjectUseCase)
	.to(AssignMemberToProjectUseCase)
	.inTransientScope()
;

container
	.bind(TYPES.UnAssignMemberToProjectUseCase)
	.to(UnAssignMemberToProjectUseCase)
	.inTransientScope()
;