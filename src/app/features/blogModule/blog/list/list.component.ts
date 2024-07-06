import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '@app/_services/post.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  posts: any[] = [];

  constructor(
    private postService: PostService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  goto(id : string){
    this.router.navigate([`/post/${id}`])
  }
}
