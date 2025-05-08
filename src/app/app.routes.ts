import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterRecipeComponent } from './register-recipe/register-recipe.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {
      path: '',
      component: LayoutComponent,
      children: [
        { path: 'homepage', component: HomepageComponent },
        { path: 'new-recipe', component: RegisterRecipeComponent },
      ]
    },
    { path: '**', redirectTo: '/homepage' }
  ];
