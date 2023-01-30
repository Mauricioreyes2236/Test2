import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { combineLatest, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  private _baseUrl: string = 'https://pokeapi.co/api/v2';

  constructor(private _http: HttpClient) { }

  // getPokemonList(offset: number, limit: number = 20): Observable<any[]>{
  //   return this._http.get<any[]>(this._baseUrl + 'pokemon?offset=' + offset + '&limit' +limit)
  //   .pipe(
  //     map((x:any) => x.results)
  //   );
  // }

  // getPokemonDetails(pokemon: number | string): Observable<any>{
  //   return this._http.get<any>(this._baseUrl+ 'pokemon/' + pokemon);
  // }
  getPokemonList(limit: number, offset:Number): Observable<any>{
    return this._http.get<any>(`${this._baseUrl}/pokemon?offset=${offset}&limit=${limit}`)
  }
  
  getPokemonDetails(url:string): Observable<any[]>{
    return this._http.get<any>(`${url}`);
  }
  
  // getPokemonDetails2(url:string): Observable<any[]>{
  //   return this._http.get<any>(`${url}`);
  // }

  getPokemonListDetails( urls: string[]): Observable<any[]> {

    const peticiones: Observable<any>[] = [];

    urls.forEach(url => {
      const peticion = this.getPokemonDetails(url);
      peticiones.push(peticion);
    });

    return combineLatest( peticiones );
  }
}
