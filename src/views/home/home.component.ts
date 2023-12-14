import { NgFor, NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf, NgFor, NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent implements OnInit {


  constructor() {

  }

  public ngOnInit(): void {
    // todo idk but why not..: setInterval(() => { this._spriteIndexInverse = this._spriteIndexInverse >= 1 ? 0 : 1; }, 1600)
  }

}

