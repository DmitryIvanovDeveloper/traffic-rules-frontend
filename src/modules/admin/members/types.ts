const TYPES = {
	MembersHttpRepository: Symbol.for("MembersHttpRepository"),
	MembersLocalRepository: Symbol.for("MembersLocalRepository"),
	MembersPresenter: Symbol.for("MembersPresenter"),
	MembersController: Symbol.for("MembersController"),
	LoadMembersUseCase: Symbol.for("LoadMembersUseCase"),
	LoadMemberUseCase: Symbol.for("LoadMemberUseCase"),
	AssignMemberToProjectUseCase: Symbol.for("AssignMemberToProjectUseCase"),
	UnAssignMemberToProjectUseCase: Symbol.for("UnAssignMemberToProjectUseCase"),
};

export { TYPES };
