import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SerchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey :  string = 'xZF1S5ST2mpVwrH4IipWzguQnB9Y0jNL';
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];
  
  get historial(){    
    return [...this._historial];
  }

  constructor( private http:HttpClient){

    this._historial = JSON.parse( localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')!) || [];
    //console.log('resultados: ',this.resultados);
  }

  buscarGifs(query: string){

    query = query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query)){
      this._historial.unshift(query); 
      this._historial = this._historial.slice(0,10); 

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);
    //console.log(params.toString());

    this.http.get<SerchGifsResponse>(`${ this.servicioUrl }/search`, { params } )
      .subscribe( (resp) => {
          //console.log('data',resp.data)
          this.resultados = resp.data;
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
        });

  }

}
