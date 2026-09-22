import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface Usuario {
  nome: string;
  email: string;
  senha: string;
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class CadastroComponent {
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  lgpdAccepted = false;

  constructor(private readonly router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.senha !== this.confirmarSenha) {
      alert('As senhas precisam ser iguais.');
      return;
    }

    if (!this.lgpdAccepted) {
      alert('Você precisa confirmar a LGPD para criar sua conta.');
      return;
    }

    const usuarios = this.getUsuarios();
    const emailNormalizado = this.email.trim().toLowerCase();

    if (usuarios.some((usuario) => usuario.email === emailNormalizado)) {
      alert('Este e-mail já está cadastrado.');
      return;
    }

    usuarios.push({
      nome: this.nome.trim(),
      email: emailNormalizado,
      senha: this.senha
    });
    localStorage.setItem('codigoDelasUsers', JSON.stringify(usuarios));

    alert('Conta criada com sucesso!');
    this.router.navigate(['/login']);
  }

  private getUsuarios(): Usuario[] {
    const usuariosSalvos = localStorage.getItem('codigoDelasUsers');

    if (!usuariosSalvos) {
      return [];
    }

    try {
      return JSON.parse(usuariosSalvos) as Usuario[];
    } catch {
      return [];
    }
  }
}
