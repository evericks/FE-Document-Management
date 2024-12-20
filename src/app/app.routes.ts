import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboard'
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    // Redirect signed-in user to the '/dashboard'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes') },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes') },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes') },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes') },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes') }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes') },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes') }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes') },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            { path: 'dashboard', loadChildren: () => import('app/modules/admin/dashboard/dashboard.routes') },
        ]
    },

    // Incoming routes
    {
        path: 'incoming-documents',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            { path: 'receive', loadChildren: () => import('app/modules/incoming/receive/receive.routes') },
            { path: 'return', loadChildren: () => import('app/modules/incoming/return/return.routes') },
            { path: 'classify', loadChildren: () => import('app/modules/incoming/classify/classify.routes') },
            { path: 'register', loadChildren: () => import('app/modules/incoming/register/register-incoming.routes') },
            { path: 'manage-and-process', loadChildren: () => import('app/modules/incoming/process/process.routes') },
            { path: 'tracking', loadChildren: () => import('app/modules/tracking/tracking.routes') },
        ]
    },

    // Outgoing routes
    {
        path: 'outgoing-documents',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            { path: 'editings', loadChildren: () => import('app/modules/outgoing/editing/editing.routes') },
            { path: 'register', loadChildren: () => import('app/modules/outgoing/register/register-outgoing.routes') },
        ]
    },

    // Settings routes
    {
        path: 'settings',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            { path: 'documents', loadChildren: () => import('app/modules/setting/document/document.routes') },
            { path: 'users', loadChildren: () => import('app/modules/setting/user/user.routes') },
            { path: 'departments', loadChildren: () => import('app/modules/setting/department/department.routes') },
            { path: 'roles', loadChildren: () => import('app/modules/setting/role/role.routes') },
            { path: 'document-types', loadChildren: () => import('app/modules/setting/document-type/document-type.routes') },
            { path: 'processes', loadChildren: () => import('app/modules/setting/process/process-setting.routes') },
            { path: 'organizations', loadChildren: () => import('app/modules/setting/organization/organization.routes') },
        ]
    }
];
