export interface SystemModule {
  key: string;
  label: string;
  icon: string;
  route: string;
}

export const SYSTEM_MODULES: SystemModule[] = [
  { key: 'RECIPE', label: 'Cadastrar Receitas', icon: 'playlist_add', route: '/new-recipe' },
  { key: 'EXECUTE_RECIPE', label: 'Executar Receita', icon: 'playlist_play', route: '/execute-recipe' },
  { key: 'SIMULATE_RECIPE', label: 'Simular Receita', icon: 'playlist_add_check', route: '/simulate-recipe' },
  { key: 'REPORTS', label: 'Relatórios', icon: 'bar_chart_4_bars', route: '/reports' }
];
