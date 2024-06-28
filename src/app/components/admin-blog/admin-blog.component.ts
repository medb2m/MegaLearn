import { Component, OnInit } from '@angular/core';
import { BlogService } from '@app/_services/blog.service';
import { Post } from '@app/_models/post';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.css']
})
export class AdminBlogComponent implements OnInit {
  posts: Post[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.blogService.getPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  deletePost(postId: number): void {
    this.blogService.deletePost(postId.toString()).subscribe(
      () => {
        // Remove the deleted post from the local array
        this.posts = this.posts.filter(post => post.id !== postId);
        console.log(`Post with ID ${postId} deleted successfully.`);
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }
}
