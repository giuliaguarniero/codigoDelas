import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  title = 'login';
  lgpdAccepted = false;

  constructor(private readonly router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();

    if (!this.lgpdAccepted) {
      alert('Você precisa confirmar a LGPD antes de entrar ou criar uma conta.');
      return;
    }

    localStorage.setItem('codigoDelasAuthenticated', 'true');
    this.router.navigate(['/trilhas']);
  }
}
