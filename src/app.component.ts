import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/Menu/menu.component';
import { FooterComponent } from "./components/Footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
   <menu-component></menu-component>
    <main class="col-12 padding1">
      <router-outlet > </router-outlet> 
    </main> 
    <footer-component></footer-component>`,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MenuComponent,
    FooterComponent
  ]
})

export class AppComponent {
  title = 'angular-test';
  constructor() { }
}

