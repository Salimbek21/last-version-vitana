import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpBaseService {
  private readonly baseUrl: string;

  constructor(private client: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  post(
    absoluteUrl: string,
    body: any = {},
    params: { [param: string]: string } = {},
    headers: { [header: string]: string } = {}
  ): Observable<any> {
    return this.client.post(`${this.baseUrl}/${absoluteUrl}`, body, {
      params: new HttpParams().appendAll(params),
      headers: this.makeHeaders(headers),
    });
  }

  get(absoluteUrl: string, params: { [param: string]: string } = {}, headers: { [header: string]: string } = {}): Observable<any> {
    return this.client.get(`${this.baseUrl}/${absoluteUrl}`, {
      params: new HttpParams().appendAll(params),
      headers: this.makeHeaders(headers),
    });
  }

  put(
    absoluteUrl: string,
    body: any = {},
    params: { [param: string]: string } = {},
    headers: { [header: string]: string } = {}
  ): Observable<any> {
    return this.client.put(`${this.baseUrl}/${absoluteUrl}`, body, {
      params: new HttpParams().appendAll(params),
      headers: this.makeHeaders(headers),
    });
  }

  patch(
    absoluteUrl: string,
    body: any = {},
    params: { [param: string]: string } = {},
    headers: { [header: string]: string } = {}
  ): Observable<any> {
    return this.client.patch(`${this.baseUrl}/${absoluteUrl}`, body, {
      params: new HttpParams().appendAll(params),
      headers: this.makeHeaders(headers),
    });
  }

  delete(absoluteUrl: string, params: { [param: string]: string } = {}, headers: { [header: string]: string } = {}): Observable<any> {
    return this.client.delete(`${this.baseUrl}/${absoluteUrl}`, {
      params: new HttpParams().appendAll(params),
      headers: this.makeHeaders(headers),
    });
  }

  private makeHeaders(headers: { [header: string]: string } = {}): HttpHeaders {
    if (headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
    if (headers['Accept']) {
      headers['Accept'] = 'application/json';
    }

    return new HttpHeaders(headers);
  }
}
