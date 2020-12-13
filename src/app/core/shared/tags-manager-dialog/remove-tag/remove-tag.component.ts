import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
// app imports
import { AppStateModel } from '../../../../store/models/app-state.model';
import { RemoveTagAction } from '../../../../store/actions/tag.actions';

@Component({
  selector: 'app-tags-manager-remove-tag',
  templateUrl: 'remove-tag.component.html',
})
export class RemoveTagComponent {
  @Input() projectUuid: string;
  @Input() tagUuid: string;

  constructor(
    private readonly store: Store<AppStateModel>,
  ) {
  }

  public removeTag(): void {
    this.store.dispatch(new RemoveTagAction(this.projectUuid, this.tagUuid));
  }
}
