import { Component } from '@angular/core';
import { Entity } from '@app/_models';
import { EntityService } from '@app/_services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  entities: Entity[] = []

  constructor(
    private entityService: EntityService,
  ) { }

  ngOnInit() {
    this.entityService.getAll().subscribe(entities => {
      this.entities = entities
    });
  }
}
