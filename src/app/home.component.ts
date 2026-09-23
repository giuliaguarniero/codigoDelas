import { Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnDestroy {
  topics = [
    { title: 'Lógica de programação', label: 'Comece pela base', description: 'Transforme ideias em passos claros e aprenda a resolver problemas com confiança.', image: '/img/logica.png', color: '#a84f68' },
    { title: 'Linguagens', label: 'Escolha suas ferramentas', description: 'Conheça linguagens diferentes e entenda qual delas combina com cada projeto.', image: '/img/js.png', color: '#d77b4d' },
    { title: 'Front-end', label: 'Dê forma às ideias', description: 'Crie páginas bonitas, acessíveis e responsivas que as pessoas adoram usar.', image: '/img/html.png', color: '#4f8f9d' },
    { title: 'Back-end', label: 'Faça tudo funcionar', description: 'Descubra o que acontece por trás das telas, dos dados às regras do sistema.', image: '/img/terminal.png', color: '#6b719e' },
    { title: 'Inteligência artificial', description: 'Explore novas formas de criar, automatizar tarefas e tirar projetos do papel.', image: '/img/IA.png', color: '#7c8f5b' }
  ];

  activeTopic = 0;
  private autoAdvanceTimer?: number;

  constructor() {
    this.startAutoAdvance();
  }

  ngOnDestroy(): void {
    this.stopAutoAdvance();
  }

  get currentTopic() {
    return this.topics[this.activeTopic];
  }

  selectTopic(index: number): void {
    this.activeTopic = index;
    this.restartAutoAdvance();
  }

  nextTopic(): void {
    this.selectTopic((this.activeTopic + 1) % this.topics.length);
  }

  previousTopic(): void {
    this.selectTopic((this.activeTopic - 1 + this.topics.length) % this.topics.length);
  }

  pausePreview(): void {
    this.stopAutoAdvance();
  }

  resumePreview(): void {
    this.startAutoAdvance();
  }

  private startAutoAdvance(): void {
    this.stopAutoAdvance();
    this.autoAdvanceTimer = window.setInterval(() => this.nextTopic(), 5000);
  }

  private stopAutoAdvance(): void {
    if (this.autoAdvanceTimer !== undefined) {
      window.clearInterval(this.autoAdvanceTimer);
      this.autoAdvanceTimer = undefined;
    }
  }

  private restartAutoAdvance(): void {
    this.startAutoAdvance();
  }
}
