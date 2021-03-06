import { Action } from '@ngrx/store';
import { BlogModel } from './blog.model';
import { IRequestList } from './request-list';
import { IResponseList } from './response-list';
import { BlogTypes } from './types';

export class CreateBlogRequest implements Action {
    readonly type = BlogTypes.CREATE_BLOG_REQUEST;
    constructor(readonly payload: BlogModel) { }
}
export class CreateBlogSuccess implements Action {
    readonly type = BlogTypes.CREATE_BLOG_SUCCESS;
    constructor(readonly success: BlogModel) { }
}
export class CreateBlogError implements Action {
    readonly type = BlogTypes.CREATE_BLOG_ERROR;
    constructor(readonly error) { }
}

export class GetBlogsRequest implements Action {
    readonly type = BlogTypes.GET_BLOGS_REQUEST;
    constructor(readonly payload: IRequestList) { }
}
export class GetBlogsSuccess implements Action {
    readonly type = BlogTypes.GET_BLOGS_SUCCESS;
    constructor(readonly success: IResponseList<BlogModel>) { }
}
export class GetBlogsError implements Action {
    readonly type = BlogTypes.GET_BLOGS_ERROR;
    constructor(readonly error) { }
}

export class GetBlogRequest implements Action {
    readonly type = BlogTypes.GET_BLOG_REQUEST;
    constructor(readonly payload: string) { }
}
export class GetBlogSuccess implements Action {
    readonly type = BlogTypes.GET_BLOG_SUCCESS;
    constructor(readonly success: BlogModel) { }
}
export class GetBlogError implements Action {
    readonly type = BlogTypes.GET_BLOG_ERROR;
    constructor(readonly error) { }
}

export class UpdateBlogRequest implements Action {
    readonly type = BlogTypes.UPDATE_BLOG_REQUEST;
    constructor(readonly payload: BlogModel) { }
}
export class UpdateBlogSuccess implements Action {
    readonly type = BlogTypes.UPDATE_BLOG_SUCCESS;
    constructor(readonly payload: BlogModel) { }
}
export class UpdateBlogError implements Action {
    readonly type = BlogTypes.UPDATE_BLOG_ERROR;
    constructor(readonly error) { }
}

export class DeleteBlogPreRequest implements Action {
    readonly type = BlogTypes.DELETE_BLOG_PRE_REQUEST;
    constructor(readonly payload: string) { }
}
export class DeleteBlogRequest implements Action {
    readonly type = BlogTypes.DELETE_BLOG_REQUEST;
    constructor(readonly payload: string) { }
}
export class DeleteBlogSuccess implements Action {
    readonly type = BlogTypes.DELETE_BLOG_SUCCESS;
    constructor(readonly payload: string) { }
}
export class DeleteBlogError implements Action {
    readonly type = BlogTypes.DELETE_BLOG_ERROR;
    constructor(readonly error) { }
}

export class HubCreateBlogRequest implements Action {
    readonly type = BlogTypes.HUB_CREATE_BLOG_REQUEST;
    constructor(readonly payload: BlogModel) { }
}
export class HubCreateBlogSuccess implements Action {
    readonly type = BlogTypes.HUB_CREATE_BLOG_SUCCESS;
    constructor(readonly payload: BlogModel) { }
}

export class HubUpdateBlogRequest implements Action {
    readonly type = BlogTypes.HUB_UPDATE_BLOG_REQUEST;
    constructor(readonly payload: BlogModel) { }
}
export class HubUpdateBlogSuccess implements Action {
    readonly type = BlogTypes.HUB_UPDATE_BLOG_SUCCESS;
    constructor(readonly payload: BlogModel) { }
}

export class DeleteBlogs implements Action {
    readonly type = BlogTypes.DELETE_BLOGS;
    constructor() { }
}

export class DeleteCreatedBlog implements Action {
    readonly type = BlogTypes.DELETE_CREATED_BLOG;
    constructor() { }
}
export class DeleteUpdatedBlog implements Action {
    readonly type = BlogTypes.DELETE_UPDATED_BLOG;
    constructor() { }
}

export type BlogActionsUnion = CreateBlogRequest
    | CreateBlogSuccess
    | CreateBlogError
    | GetBlogsRequest
    | GetBlogsSuccess
    | GetBlogsError
    | GetBlogRequest
    | GetBlogSuccess
    | GetBlogError
    | UpdateBlogRequest
    | UpdateBlogSuccess
    | UpdateBlogError
    | DeleteBlogPreRequest
    | DeleteBlogRequest
    | DeleteBlogSuccess
    | DeleteBlogError
    | HubCreateBlogRequest
    | HubCreateBlogSuccess
    | HubUpdateBlogRequest
    | HubUpdateBlogSuccess
    | DeleteBlogs
    | DeleteCreatedBlog
    | DeleteUpdatedBlog;
