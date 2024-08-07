import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '@app/_services/post.service';
import { CommentService } from '@app/_services/comment.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  post: any;
  comments: any[] = [];
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id') || 'noID'
    this.postService.getPostById(postId).subscribe((data) => {
      this.post = data;
      console.log('pic '+ data.image)
    });

    this.postService.getAllComments(postId).subscribe((data) => {
      this.comments = data;
    });
  }

  addComment(): void {
    const postId = this.route.snapshot.paramMap.get('id') || 'noID'
    this.postService.createComment(postId, { content: this.newComment }).subscribe((comment) => {
      this.comments.push(comment);
      this.newComment = '';
    });
  }
  
}
