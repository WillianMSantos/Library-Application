import { Injectable } from '@angular/core';
import { ApiService } from './general/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Author } from '../common/api/author/Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  AUTHOR_PATH = '/author';
  AUTHOR_PATH_PAGE = '/pagination';
  FIND_ALL_BY_NAME_PATH = '/find?name=';

  constructor(private apiService: ApiService, private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.apiService.getAll(this.AUTHOR_PATH).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  getAllPageable(page: any): Observable<ApiResponse<Author>> {
    return this.apiService.getAllPageable<ApiResponse<Author>>(this.AUTHOR_PATH + this.AUTHOR_PATH_PAGE, page);
  }

  findAllByName(name: any){
    return this.apiService.findAllByName(this.AUTHOR_PATH + this.FIND_ALL_BY_NAME_PATH + name).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  getById(id: number): Observable<any> {
    return this.apiService.getById(this.AUTHOR_PATH + '/' + id).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  post(author): Observable<any> {
    return this.apiService.post(this.AUTHOR_PATH, author).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  put(id,author): Observable<any> {
    return this.apiService.put(this.AUTHOR_PATH + '/' + id, author).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  delete(id):  Observable<any> {
    return this.apiService.delete(this.AUTHOR_PATH + '/' + id).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
}
