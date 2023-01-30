import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit{

  private _urls:string[] = [];

  pokemons:any[] = [];

  limit: number = 18;
  offset: number = 0;

  loading: boolean = false;

  servicio: any = () => { 
  this._PS.getPokemonList(this.limit,this.offset)
    .pipe(
      tap( pokemon => {
        
        this.loading = !this.loading;

        const list:any[] = pokemon.results;

        list.forEach(element => {
          this._urls.push(element.url) 
        });
      }),
      delay(1000),
      switchMap((_) => this._PS.getPokemonListDetails(this._urls))
    )
    .subscribe(responseList => {
      this.loading = !this.loading;
      this.pokemons = responseList
    });
  }

  constructor(private _router:Router,
              private _PS: PokemonService){}

  ngOnInit(): void {

    this.servicio();
    
  }

  backPage(){
    if(this.offset <= 0){return;}
    this.offset = this.offset-20;
    this.pokemons = [];
    this._urls = [];
    
    this.servicio();
  }
  
  nextPage(){
    this.offset = this.offset+20;
    this.pokemons = [];
    this._urls = [];
    
    this.servicio();
  }

  launchModal(){
    console.log('modal lanzado');    
  }

  logout(){
    localStorage.removeItem('accessToken');
    this._router.navigate(['./auth']);
  }

}
