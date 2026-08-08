import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterRecipeComponent } from './register-recipe/register-recipe.component';
import { LayoutComponent } from './layout/layout.component';
import { SimulateRecipeComponent } from './simulate-recipe/simulate-recipe.component';
import { ReportsComponent } from './reports/reports.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AccountRegistrationComponent } from './account-registration/account-registration.component';
import { ResetPasswordComponent } from './account-registration/reset-password/reset-password.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'registration', component: AccountRegistrationComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    {
      path: '',
      component: LayoutComponent,
      children: [
        { path: 'homepage', component: HomepageComponent },
        { path: 'recipe', component: RegisterRecipeComponent },
        { path: 'recipe/edit/:id', component: RegisterRecipeComponent },
        { path: 'recipes', component: RecipeListComponent },
        { path: 'simulate-recipe', component: SimulateRecipeComponent },
        { path: 'reports', component: ReportsComponent },
        { path: 'company', component: CompanyRegistrationComponent },
        { path: 'category-list', component: CategoryListComponent },
        { path: 'category-form', component: CategoryFormComponent },
        { path: 'category-form/edit/:id', component: CategoryFormComponent },
      ]
    },
    { path: '**', redirectTo: '/homepage' }
  ];
