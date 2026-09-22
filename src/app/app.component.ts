import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="app-root">
      <header class="site-header">
        <div class="container">
          @if (!isLoginPage) {
            <button class="menu-toggle" type="button" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen" aria-controls="side-menu" aria-label="Abrir menu lateral">
              <span></span><span></span><span></span>
            </button>
          }
          <a class="brand" routerLink="/" aria-label="Código Delas - página inicial">
            <img src="/img/codigoimg.png" alt="">
            <h1>Código Delas</h1>
          </a>
          <nav>
            <a routerLink="/">Home</a>
            <a routerLink="/trilhas">Trilhas</a>
            <a routerLink="/login">Login</a>
          </nav>
        </div>
      </header>

      @if (!isLoginPage) {
        <div class="menu-backdrop" [class.visible]="menuOpen" (click)="closeMenu()"></div>
        <aside id="side-menu" class="side-menu" [class.open]="menuOpen" aria-label="Menu lateral">
          <div class="side-menu-header">
            <span>Menu</span>
            <button type="button" (click)="closeMenu()" aria-label="Fechar menu">×</button>
          </div>
          <nav class="side-nav">
            <a routerLink="/" (click)="closeMenu()">Home</a>
            <a routerLink="/trilhas" (click)="closeMenu()">Trilhas</a>
            <button type="button" (click)="logout()">Logout</button>
          </nav>
        </aside>
      }

      <div class="content">
        <router-outlet></router-outlet>
      </div>

      <footer class="site-footer">
        <div class="container">© Código Delas - Todos os direitos reservados</div>
      </footer>
    </div>
  `,
  styles: [`:host{display:block}
    .app-root{min-height:100vh;display:flex;flex-direction:column}
    .container{max-width:1000px;margin:0 auto;padding:0 16px}
    .site-header{position:relative;background:linear-gradient(90deg,#ff8db1 0%,#ff5a9e 100%);color:#fff;padding:9px 0}
    .site-header .container{display:flex;align-items:center;justify-content:space-between;gap:16px}
    .brand{display:flex;align-items:center;gap:10px;color:#fff;text-decoration:none}
    .brand img{width:32px;height:32px;object-fit:contain}
    .site-header h1{margin:0;font-size:1.3rem}
    .site-header nav{display:flex;align-items:center;gap:18px}
    .site-header nav a{color:#fff;text-decoration:none;position:relative;transition:box-shadow .18s ease,transform .18s ease;padding:6px 4px;border-radius:8px;font:inherit;font-size:inherit;line-height:inherit}
    .site-header nav a:hover{box-shadow:0 8px 20px rgba(255,90,158,0.25);transform:translateY(-3px)}
    .menu-toggle{display:none;position:absolute;top:50%;left:12px;transform:translateY(-50%);width:36px;height:36px;padding:8px;border:0;border-radius:8px;background:#8f3f5c;box-shadow:0 6px 16px rgba(43,27,35,0.22);cursor:pointer;z-index:20}
    .menu-toggle span{display:block;height:2px;margin:4px 0;border-radius:2px;background:#fff}
    .menu-backdrop{position:fixed;inset:0;z-index:29;background:rgba(43,29,34,0.28);opacity:0;pointer-events:none;transition:opacity .2s ease}
    .menu-backdrop.visible{opacity:1;pointer-events:auto}
    .side-menu{position:fixed;top:0;bottom:0;left:0;z-index:30;width:min(300px,82vw);padding:22px 18px;background:#fff;box-shadow:12px 0 35px rgba(70,43,51,0.16);transform:translateX(-105%);transition:transform .24s ease}
    .side-menu.open{transform:translateX(0)}
    .side-menu-header{display:flex;align-items:center;justify-content:space-between;padding:8px 4px 24px;color:#5c2638;font-size:1.25rem;font-weight:800}
    .side-menu-header button{border:0;background:transparent;color:#5c2638;font-size:2rem;line-height:1;cursor:pointer}
    .side-nav{display:flex;flex-direction:column;gap:8px}
    .side-nav a,.side-nav button{display:block;width:100%;padding:13px 14px;border:0;border-radius:10px;background:transparent;color:#5c2638;text-align:left;text-decoration:none;font:inherit;font-weight:700;cursor:pointer;transition:background .18s ease,color .18s ease}
    .side-nav a:hover,.side-nav button:hover{background:#eee5e7;color:#8f3f5c}
    .side-nav button{margin-top:14px;border-top:1px solid rgba(92,38,56,0.12);border-radius:0;padding-top:20px}
    .content{flex:1}
    .site-footer{background:#eeeae9;padding:12px 0;text-align:center;margin-top:0;color:#5c2638}
    @media (max-width:640px){
      .site-header{padding:7px 0}
      .site-header .container{min-height:38px;gap:10px}
      .site-header nav{display:none}
      .menu-toggle{display:block}
      .brand{gap:6px;margin:0 auto}
      .brand img{width:24px;height:24px}
      .site-header h1{font-size:1.05rem}
      .side-menu{width:min(250px,78vw);padding:18px 14px}
      .side-menu-header{padding:4px 2px 18px;font-size:1.1rem}
      .side-nav a,.side-nav button{padding:11px 12px}
    }`]
})
export class AppComponent {
  menuOpen = false;

  constructor(private readonly router: Router) {}

  get isLoginPage(): boolean {
    return this.router.url.startsWith('/login');
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.closeMenu();
    localStorage.removeItem('codigoDelasAuthenticated');
    this.router.navigate(['/']);
  }
}
