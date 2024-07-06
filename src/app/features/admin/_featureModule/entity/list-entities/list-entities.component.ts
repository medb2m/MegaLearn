import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { EntityService } from '@app/_services';
import { Entity } from '@app/_models';

@Component({
  selector: 'list-entities',
  templateUrl: './list-entities.component.html',
  styleUrls: ['./list-entities.component.css']
})
export class ListEntitiesComponent {
  entities: any[] = []
  searchText: string = '';
  selectedEntities: Entity[] = [];


  constructor(
    private entityService: EntityService,
  ) { }

  ngOnInit() {
    this.loadEntities();
  }
  
  loadEntities(){
    this.entityService.getAll().subscribe(entities => {
      this.entities = entities
    })
  }

  deleteEntity(id: string) {
    const entity = this.entities!.find(x => x._id === id);
    if (!entity) return
    entity.isDeleting = true;
    this.entityService.delete(id)
        .pipe(first())
        .subscribe(() => {
            this.entities = this.entities!.filter(x => x._id !== id)
        });
  }

  toggleAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked
      this.entities.forEach(entity => entity.selected = isChecked)
      this.updateSelection()
  }

  updateSelection() {
    this.selectedEntities = this.entities.filter(entity => entity.selected)
  }

  deleteSelectedEntities(): void {
    this.selectedEntities.forEach(entity => {
      this.entityService.delete(entity._id).subscribe(() => {
        this.entities = this.entities.filter(x => x.id !== entity._id);
        this.updateSelection();
      });
    });
  }
}
