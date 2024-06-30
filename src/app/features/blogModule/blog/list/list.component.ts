import { Component, OnInit } from '@angular/core';
import { PostService } from '@app/_services/post.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
    });
  }
}
