export interface SystemModule {
  key: string;
  label: string;
  icon: string;
  route: string;
}

export const SYSTEM_MODULES: SystemModule[] = [
  { key: 'RECIPE', label: 'Receitas', icon: 'restaurant_menu', route: '/recipes' },
  { key: 'EXECUTE_RECIPE', label: 'Executar Receita', icon: 'play_circle', route: '/execute-recipe' },
  { key: 'SIMULATE_RECIPE', label: 'Simular Receita', icon: 'science', route: '/simulate-recipe' },
  { key: 'REPORTS', label: 'Relatórios', icon: 'bar_chart', route: '/reports' }
]
