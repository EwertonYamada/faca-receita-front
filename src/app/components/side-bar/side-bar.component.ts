import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SYSTEM_MODULES } from './helpers/system-modules';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  public modules = SYSTEM_MODULES
  public selectedItem: any = null;

  constructor(
    private router: Router
  ) { }

  public selectItem(item: any): void {    
    this.selectedItem = item;

    this.goToModule(item.route);
  }

  public goToModule(route: string): void {
    console.log(route);
    
    this.router.navigate([`/${route}`]);
  }
    
}
