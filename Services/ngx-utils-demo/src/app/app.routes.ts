import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    // { path: '', redirectTo: '', pathMatch: 'full' },

    { path: 'captcha', loadChildren: () => import('./captcha/captcha.module').then(m => m.CaptchaModule), data: { title: 'Captcha' } },
    { path: 'input', loadChildren: () => import('./input/input.module').then(m => m.InputModule), data: { title: 'Input' } },
    { path: 'validator', loadChildren: () => import('./validator/validator.module').then(m => m.ValidatorModule), data: { title: 'Validator' } },
    { path: 'uploader', loadChildren: () => import('./uploader/uploader.module').then(m => m.UploaderModule), data: { title: 'Uploader' } },
    { path: 'messenger', loadChildren: () => import('./messenger/messenger.module').then(m => m.MessagerModule), data: { title: 'Messenger' } },
    { path: 'storage', loadChildren: () => import('./storage/storage.module').then(m => m.StorageModule), data: { title: 'Storage' }, },
    { path: 'editor', loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule), data: { title: 'Editor' }, },
    { path: 'viewport', loadChildren: () => import('./viewport/viewport.module').then(m => m.ViewportModule), data: { title: 'Viewport' }, },
    { path: 'external', loadChildren: () => import('./external/external.module').then(m => m.ExternalModule), data: { title: 'External' }, },

    { path: '**', redirectTo: '' }
];
