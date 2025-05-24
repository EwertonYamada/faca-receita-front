import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  public hoveredIndex: number | null = null;
  public index: number | null = null;
  public reports = [
    {
      title: 'Produção',
      reportKey: 'EXECUTED_RECIPE',
      icon: 'factory',
      subReports: [
        {
          title: 'Produção por receita',
          reportKey: 'EXECUTED_RECIPE'
        },
        {
          title: 'Produção por produto',
          reportKey: 'EXECUTED_PRODUCT'
        }
      ]
    },
    {
      title: 'Lucratividade',
      reportKey: 'PROFITABILITY',
      icon: 'currency_exchange',
      subReports: [
        {
          title: 'Lucro por produção',
          reportKey: 'PROFITABILITY_BY_PRODUCTION'
        },
        {
          title: 'Lucro por receita',
          reportKey: 'PROFITABILITY_BY_RECIPE'
        }
      ]
    },
    {
      title: 'Estoque',
      reportKey: 'STOCK',
      icon: 'filter_5'
    },
    {
      title: 'Rentabilidade',
      reportKey: 'RENTABILITY',
      icon: 'trending_up'
    }
  ]
}
