import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import { RouterPaths } from './router-paths';
import { TYPES } from '@/infrastructure/bootstrap/types';
import App from '../App.vue';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import AuthenticationScreen from '@/modules/shared/authentication/AuthenticationScreen.vue';
import { IEventBus } from '@/infrastructure/events/event-bus.plugin';
import Admin from '@/modules/admin/Admin.vue';
import AdminAuthenticatedEvent from '@/modules/shared/authentication/business/events/admin-authenticated.event';
import AuthTokenUseCases from '@/modules/shared/authStorage/business/usecases/auth-token.usecases';
import Login from '@/modules/shared/authentication/presentation/view/Login/Login.vue';
import Registration from '@/modules/shared/authentication/presentation/view/Registration/Registration.vue';
import ProjectConstructor from '@/modules/admin/projects/presentation/view/ProjectConstructor.vue';
import Projects from '@/modules/admin/projects/presentation/view/Projects.vue';
import ProjectsList from '@/modules/admin/projects/presentation/view/ProjectsList.vue';
import Levels from '@/modules/admin/levels/presentation/view/Levels.vue';
import LevelList from '@/modules/admin/levels/presentation/view/LevelList.vue';
import AchievementsConstructor from '@/modules/admin/achievements/presentation/view/AchievementsConstructor.vue';
import Profile from '@/modules/admin/profile/presentation/view/Profile.vue';
import Members  from '@/modules/admin/members/presentation/view/Members.vue';
import Member from '@/modules/admin/members/presentation/view/Member.vue';

const getRoutes = (): Array<RouteRecordRaw> => {
    return [{
            path: RouterPaths.root,
            name: 'App',
            component: App,
            meta: { requiresAuth: true },
            beforeEnter: (to, from, next) => {
                const isAuthenticated = container.get<AuthTokenUseCases>(TYPES.AuthTokenUseCases).isAuthenticated();

                if (to.meta.requiresAuth && !isAuthenticated) {
                    next(RouterPaths.registration);
                    return;
                }

                next(`${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.list}`);
            },
        },
        {
            path: RouterPaths.authentication,
            component: AuthenticationScreen,
            children: [{
                path: RouterPaths.login,
                component: Login,
            },
            {
                path: RouterPaths.registration,
                component: Registration,
            }]
        },
        {
            path: RouterPaths.admin,
            component: Admin,
            meta: { requiresAuth: true },
            beforeEnter: async (to, from, next) => {
                const authToken = container.get<AuthTokenUseCases>(TYPES.AuthTokenUseCases);

                if (to.meta.requiresAuth && !authToken.isAuthenticated()) {
                    next(RouterPaths.registration);
                    return;
                }

                const eventBus = container.get<IEventBus>(TYPES.EventBus);
                await eventBus.publishAsync(new AdminAuthenticatedEvent());

                next();
            },
            children: [{
                path: RouterPaths.projects,
                component: Projects,
                children: [
                    {
                        path: RouterPaths.constructor,
                        component: ProjectConstructor,
                    },
                    {
                        path: RouterPaths.list,
                        component: ProjectsList,
                    }
                ]
            },
            {
                path: RouterPaths.levels,
                component: Levels,
                children: [
                    {
                        path: RouterPaths.constructor,
                        component: ProjectConstructor,
                    },
                    {
                        path: RouterPaths.list,
                        component: LevelList,
                    }
                ]
            },
            {
                path: RouterPaths.achievements,
                component: AchievementsConstructor,
            },
            {
                path: RouterPaths.account,
                component: Profile,
            },
            {
                path: RouterPaths.members,
                component: Members,
            },
            {
                path: RouterPaths.member,
                component: Member,
            },
        ],
        },
    ];
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: getRoutes(),
    scrollBehavior() {
        return { top: 0 };
    }
});

export default router;
