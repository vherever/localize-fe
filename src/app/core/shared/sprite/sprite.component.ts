import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sprite',
  templateUrl: 'sprite.component.html',
})
export class SpriteComponent {
  @Input() spriteKey: string;
}
