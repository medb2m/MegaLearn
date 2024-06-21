import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityService } from '@app/_services';
import { Entity } from '@app/_models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  entity!: Entity ;

  constructor(private route: ActivatedRoute, private entityService: EntityService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.entityService.getById(id).subscribe((data: Entity) => {
        this.entity = data;
      });
    }
  }
  
}
