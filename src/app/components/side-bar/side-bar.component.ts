import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  public modules = [
    {key: 'RECIPE', label: 'Cadastrar Receitas', icon: 'playlist_add', route: '/new-recipe' },
    {key: 'EXECUTE_RECIPE', label: 'Executar Receita', icon: 'playlist_play', route: '/execute-recipe' },
    {key: 'SIMULATE_RECIPE', label: 'Simular Receita', icon: 'playlist_add_check', route: '/simulate-recipe' },
    {key: 'REPORTS', label: 'Relatórios', icon: 'bar_chart_4_bars', route: '/reports' },
  ]
  public selectedItem: any = null;

  constructor(
    private router: Router
  ) { }

  public selectItem(item: any): void {    
    // if (this.selectedItem && this.selectedItem === item) {
    //   this.selectedItem = null;
    //   return;
    // }
    this.selectedItem = item;

    this.gotoModule(item.route);
  }

  public gotoModule(route: string): void {
    console.log(route);
    
    this.router.navigate([`/${route}`]);
  }
    
}
