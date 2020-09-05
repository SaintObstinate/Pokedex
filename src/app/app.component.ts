import { Component } from '@angular/core';
import  {Pokemon} from './pokemon'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pokedex';
  pokemons: Pokemon[] = [];
  searchText;
  public paginaAtual = 1; // Dizemos que queremos que o componente quando carregar, inicialize na página 1.


  constructor() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0', true);
    xhr.send();

    xhr.onload = () => {
      let jsonv = JSON.parse(xhr.response);
      console.log(jsonv);
      for (let i = 0; i < jsonv.results.length; i++) {
        this.pokemons.push(this.getPokemon(jsonv.results[i].url));
      }
      console.log(this.pokemons);
    }
  }
  getPokemon(pk: string) : Pokemon {
    let pokemonaux = new Pokemon();
    let xhr = new XMLHttpRequest();
    xhr.open("GET", pk, true)
    xhr.send();
    xhr.onload = () => {
      let aux = JSON.parse(xhr.response)
      console.log(aux);
      pokemonaux.id = aux.id;
      pokemonaux.name = aux.name;
      pokemonaux.sprite = aux.sprites.front_default;
      pokemonaux.height = aux.height;
      pokemonaux.types = aux.types;
      pokemonaux.hp = aux.stats[0].base_stat;
      pokemonaux.atk = aux.stats[1].base_stat;
      pokemonaux.def = aux.stats[2].base_stat;
      pokemonaux.speed = aux.stats[5].base_stat;
      return pokemonaux;
    }
    return pokemonaux;
  }
  
}
