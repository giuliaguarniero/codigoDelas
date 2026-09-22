import { Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trilhas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './trilhas.html',
  styleUrls: ['./trilhas.css']
})
export class TrilhasComponent implements OnDestroy {
  slides = [
    {
      title: 'Lógica de Programação',
      tag: 'Fundamentos',
      description: 'Desenvolva raciocínio estruturado para resolver problemas com clareza e eficiência.',
      image: '/img/logica.png',
      href: '#'
    },
    {
      title: 'Linguagens de Programação',
      tag: 'Aprendizado',
      description: 'Explore as principais linguagens e entenda quando cada uma faz mais sentido.',
      image: '/img/js.png',
      href: '#'
    },
    {
      title: 'Front-end',
      tag: 'Interface',
      description: 'Aprenda a criar experiências visuais, responsivas e funcionais na web.',
      image: '/img/html.png',
      href: '#'
    },
    {
      title: 'Back-end',
      tag: 'Servidor',
      description: 'Entenda como a lógica do sistema funciona por trás da interface e dos dados.',
      image: '/img/terminal.png',
      href: '#'
    },
    {
      title: 'IA',
      tag: 'Inovação',
      description: 'Descubra como inteligência artificial pode ampliar ideias, automações e projetos.',
      image: '/img/IA.png',
      href: '#'
    }
  ];

  currentIndex = 0;
  isTransitioning = false;
  private readonly autoAdvanceMs = 4200;
  private autoAdvanceTimer?: number;
  private transitionTimer?: number;

  constructor() {
    this.startAutoAdvance();
  }

  ngOnDestroy(): void {
    this.stopAutoAdvance();
    this.clearTransitionTimer();
  }

  get currentSlide() {
    return this.slides[this.currentIndex];
  }

  previous(): void {
    this.triggerTransition();
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.restartAutoAdvance();
  }

  next(): void {
    this.triggerTransition();
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.restartAutoAdvance();
  }

  goTo(index: number): void {
    this.triggerTransition();
    this.currentIndex = index;
    this.restartAutoAdvance();
  }

  pauseAutoAdvance(): void {
    this.stopAutoAdvance();
  }

  resumeAutoAdvance(): void {
    this.startAutoAdvance();
  }

  private triggerTransition(): void {
    this.isTransitioning = true;
    this.clearTransitionTimer();
    this.transitionTimer = window.setTimeout(() => {
      this.isTransitioning = false;
    }, 260);
  }

  private clearTransitionTimer(): void {
    if (this.transitionTimer !== undefined) {
      window.clearTimeout(this.transitionTimer);
      this.transitionTimer = undefined;
    }
  }

  private startAutoAdvance(): void {
    this.stopAutoAdvance();
    this.autoAdvanceTimer = window.setInterval(() => {
      this.triggerTransition();
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    }, this.autoAdvanceMs);
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
