import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {
  public _pokeApiAvailable: boolean = false;

  public constructor() {
    this.tryCallApi();
  }

  public ngOnInit(): void {
    this.tryCallApi();
    setInterval(this.tryCallApi, 12000 * 50);
  }

  private tryCallApi() {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then(response => {
        this._pokeApiAvailable = response.ok;
      })
      .catch(error => {
        console.error("========>", error);
        this._pokeApiAvailable = false;
      })
  }

  public get pokeApiAvailable(): boolean {
    return this._pokeApiAvailable;
  }

}

