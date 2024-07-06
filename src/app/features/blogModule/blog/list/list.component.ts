import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
>>>>>>> siwarMerge
import { PostService } from '@app/_services/post.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  posts: any[] = [];

<<<<<<< HEAD
  constructor(
    private postService: PostService,
    private router : Router
  ) { }
=======
  constructor(private postService: PostService) { }
>>>>>>> siwarMerge

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
    });
  }
<<<<<<< HEAD

  goto(id : string){
    this.router.navigate([`/post/${id}`])
  }
=======
>>>>>>> siwarMerge
}
