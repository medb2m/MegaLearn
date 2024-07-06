import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { Post } from '@app/_models/post';
import { PostService } from '@app/_services/post.service';

@Component({
  selector: 'list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent {
  posts: any[] = []
  searchText: string = '';
  selectedPosts: Post[] = [];


  constructor(
    private postService: PostService,
  ) { }

  ngOnInit() {
    this.loadPosts();
  }
  
  loadPosts(){
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts
    })
  }

  deletePost(id: string) {
    const entity = this.posts!.find(x => x._id === id);
    if (!entity) return
    entity.isDeleting = true;
    this.postService.deletePost(id)
        .pipe(first())
        .subscribe(() => {
            this.posts = this.posts!.filter(x => x._id !== id)
        });
  }

  toggleAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked
      this.posts.forEach(post => post.selected = isChecked)
      this.updateSelection()
  }

  updateSelection() {
    this.selectedPosts = this.posts.filter(post => post.selected)
  }

  deleteSelectedPosts(): void {
    this.selectedPosts.forEach(post => {
      this.postService.deletePost(post._id).subscribe(() => {
        this.posts = this.posts.filter(x => x.id !== post._id);
        this.updateSelection();
      });
    });
  }
}
