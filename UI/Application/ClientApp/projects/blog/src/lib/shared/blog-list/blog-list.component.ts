import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { InfiniteSource } from '@renet-consulting/infinite-source';
import { Subscription } from 'rxjs';
import { filter, map, shareReplay, withLatestFrom } from 'rxjs/operators';
import { DeleteBlogs, GetBlogsRequest } from '../../core/actions';
import { BlogHubService } from '../../core/services/blog-hub.service';
import { BlogModel } from '../../core/blog.model';
import { RootBlogStore } from '../../core/reducers';
import { selecBlogTotalAmount, selectBlogs, selectCreatedBlog, selectUpdatedBlog } from '../../core/selectors';

@Component({
    selector: 'lib-blog-list',
    templateUrl: './blog-list.component.html',
    styleUrls: ['./blog-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogListComponent implements OnInit, OnDestroy {

    @ViewChild(CdkVirtualScrollViewport, { static: true }) cdk: CdkVirtualScrollViewport;
    readonly subscription = new Subscription();
    readonly updated = this.store.select(selectUpdatedBlog).pipe(shareReplay(1));
    readonly created = this.store.select(selectCreatedBlog).pipe(shareReplay(1));
    readonly source = new InfiniteSource<BlogModel>();

    constructor(
        @Inject(Store) private store: Store<RootBlogStore>,
        @Inject(BlogHubService) private blogHub: BlogHubService,
    ) { }

    ngOnInit(): void {
        /** to prevent a bug with wrong counting of blogs, on other pages a blog can be added to store */
        this.store.dispatch(new DeleteBlogs());
        this.getItems(0);
        this.blogHub.connect();
        this.subscription.add(this.store.select(selectBlogs).subscribe(this.source.update));
        this.subscription.add(this.source.emitter.pipe(
            withLatestFrom(this.store.select(selecBlogTotalAmount)),
            filter(([end, total]) => end < total),
            map(([end]) => end),
        ).subscribe(this.getItems));
        this.subscription.add(this.store.select(selectUpdatedBlog).subscribe(this.scrollToModel));
        this.subscription.add(this.store.select(selectCreatedBlog).subscribe(this.scrollToModel));
    }

    ngOnDestroy(): void {
        this.blogHub.disconnect();
        this.subscription.unsubscribe();
    }

    trackByFn = (_, x: BlogModel) => x.blogId;

    getItems = (index: number): void => this.store.dispatch(new GetBlogsRequest({ index }));

    scrollToIndex = (index: number) => this.cdk.scrollToIndex(index, 'smooth');

    scrollToModel = (x: BlogModel): void => {
        if (x) {
            const blogs = this.source.stream.getValue();
            this.scrollToIndex(blogs.findIndex(z => z.blogId === x.blogId));
        }
    }
}