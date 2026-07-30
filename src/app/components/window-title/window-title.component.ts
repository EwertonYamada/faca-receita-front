import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'window-title',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './window-title.component.html',
  styleUrl: './window-title.component.scss'
})

export class WindowTitleComponent {
   @Input() windowTitle!: { icon: string; label: string };

  constructor(
  ) { }

    
}
