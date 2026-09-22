import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login';
import { CadastroComponent } from './cadastro.component';
import { TrilhasComponent } from './trilhas.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'trilhas', component: TrilhasComponent, canActivate: [authGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'cadastro', component: CadastroComponent },
	{ path: '**', redirectTo: '' }
];
