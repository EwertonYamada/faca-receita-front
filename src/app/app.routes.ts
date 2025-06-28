import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterRecipeComponent } from './register-recipe/register-recipe.component';
import { LayoutComponent } from './layout/layout.component';
import { SimulateRecipeComponent } from './simulate-recipe/simulate-recipe.component';
import { ReportsComponent } from './reports/reports.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {
      path: '',
      component: LayoutComponent,
      children: [
        { path: 'homepage', component: HomepageComponent },
        { path: 'recipe', component: RegisterRecipeComponent },
        { path: 'recipe/:id', component: RegisterRecipeComponent },
        { path: 'recipes', component: RecipeListComponent },
        { path: 'simulate-recipe', component: SimulateRecipeComponent },
        { path: 'reports', component: ReportsComponent },
      ]
    },
    { path: '**', redirectTo: '/homepage' }
  ];
