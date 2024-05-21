import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Ciudad } from '../interfaces/Ciudad.interface';
import { Binding, Destino } from '../interfaces/destinos.interface';
import { Restaurante } from '../interfaces/restaurante.interface';
import { Hotel } from '../interfaces/hotel.interface';
import { Evento } from '../interfaces/evento.interface';
import { Aeropuerto } from '../interfaces/aeropueto.interface';
import { Terminal } from '../interfaces/terminal.interface';

@Injectable({providedIn: 'root'})
export class ConsultasService {

  constructor(private httpClient:HttpClient) { }

  private url_api:string="http://127.0.0.1:8000/";

  getDestinos(city_name:string,destino_name:string,tipo:string):Observable<Destino>{
    const params=new HttpParams()
    .set('city_name',city_name)
    .set('destination_name',destino_name)
    .set('tipoDestino',tipo)

    return this.httpClient.get<Destino>(`${this.url_api}destinos`,{params})
    .pipe(
      catchError(error=>of())
    );
  }

  getDestinosPorTipo(tipo:string):Observable<Destino>{
    const params=new HttpParams()
    .set('tipoDestino',tipo)
    return this.httpClient.get<Destino>(`${this.url_api}destinos`,{params})
    .pipe(
      catchError(error=>of())
    );
  }

  getCiudades():Observable<Ciudad>{
    const ulr=`${this.url_api}ciudades`;
    return this.httpClient.get<Ciudad>(ulr)
    .pipe(
      catchError(error=>of())
    );
  }

  getDestinosById(id: string): Observable<Binding | null> {
    const params = new HttpParams().set('destination_id', id);
    return this.httpClient.get<Destino>(`${this.url_api}destinos`, { params }).pipe(
      map(destinos => {
        if (destinos && destinos._bindings && destinos._bindings.length > 0) {
          return destinos._bindings[0];
        } else {
          return null;
        }
      }),
      catchError(error => {
        console.error('Error fetching destinos by id:', error);
        return of(null);
      })
    );
  }

  getRestaurantesPorDestino(id:string):Observable<Restaurante>{
    const params=new HttpParams()
    .set('destino_id',id)
    return this.httpClient.get<Restaurante>(`${this.url_api}restaurantesPorDestino`,{params})
    .pipe(
      catchError(error=>of())
    );
  }


  getHotelesPorDestino(id:string):Observable<Hotel>{
    const params=new HttpParams()
    .set('destino_id',id)
    return this.httpClient.get<Hotel>(`${this.url_api}hotelesPorDestino`,{params})
    .pipe(
      catchError(error=>of())
    );
  }

  getEventosPorDestino(id:string):Observable<Evento>{
    const params=new HttpParams()
    .set('destino_id',id);
    return this.httpClient.get<Evento>(`${this.url_api}eventosPorDestino`,{params})
    .pipe(
      catchError(error=>of())
    )
  }

  getCiudadDestino(city_id:string):Observable<Ciudad>{
    const params=new HttpParams()
    .set('city_id',city_id);
    return this.httpClient.get<Ciudad>(`${this.url_api}ciudades`,{params})
    .pipe(
      catchError(error=>of())
    )
  }

  getAeropuertosDestino(idCity:string):Observable<Aeropuerto>{
    const params=new HttpParams()
    .set('city_id',idCity);
    return this.httpClient.get<Aeropuerto>(`${this.url_api}aeropuertosPorCiudad`,{params})
    .pipe(
      catchError(error=>of())
    )
  }

  getTerminalesDestino(idCity:string):Observable<Terminal>{
    const params=new HttpParams()
    .set('city_id',idCity);
    return this.httpClient.get<Terminal>(`${this.url_api}terminalesPorCiudad`,{params})
    .pipe(
      catchError(
        error=>of()
      )
    )
  }
}
