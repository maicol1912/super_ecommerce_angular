import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { takeUntil, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    apiUrl: string = environment.webService;

    constructor(
        protected httpClient: HttpClient,
    ) {
    }

    /**
     * Call Api GET method
     * param  {string} path
     * param  {Object} [Optional]
     * return {Observable<any>}
     */
    protected httpGet(path: string, params: any = {}, subscribeToNavigation = true): Observable<any> {

      let options: any = { params: this.renderParams(params) }
        'responseType' in params ? options.responseType = params.responseType : null;
        return this.httpClient.get(
            `${this.apiUrl}${path}`,
            options,

        )
        .pipe(
            catchError((err: any, caught: Observable<any>) => {
                return of({ success: false, error: err });
            })
        );
    }

    /**
     * Call Api GET method
     * param  {string} path
     * param  {Object} [Optional]
     * return {Observable<any>}
     */
    protected httpDelete(path: string, subscribeToNavigation = true): Observable<any> {
        return this.httpClient.delete(
            `${this.apiUrl}${path}`
        )
        .pipe(
            catchError((err: any, caught: Observable<any>) => {
                return of({ success: false, error: err });
            })
        );
    }

    /**
     * Call Api POST method
     * param  {string} path
     * param  {Object} data
     * param  {Object} params [Optional]
     * return {Observable<any>}
     */
     protected httpPost(path: string, data: object, params: object = {}, subscribeToNavigation = true): Observable<any> {
        return this.httpClient.post(
            `${this.apiUrl}${path}`,
            data,
            { params: this.renderParams(params) },
        )
            .pipe(
                catchError((err: any, caught: Observable<any>) => {
                    return of({ success: false, error: err });
                })
            );
    }

    protected httpPatch(path: string, data: object, params: object = {}, subscribeToNavigation = true): Observable<any> {
        return this.httpClient.patch(
            `${this.apiUrl}${path}`,
            data,
            { params: this.renderParams(params) },
        )
            .pipe(
                catchError((err: any, caught: Observable<any>) => {
                    return of({ success: false, error: err });
                })
            );
    }

    protected httpPut(path: string, data: object, params: object = {}, subscribeToNavigation = true): Observable<any> {
        return this.httpClient.put(
            `${this.apiUrl}${path}`,
            data,
            { params: this.renderParams(params) },
        )
            .pipe(
                catchError((err: any, caught: Observable<any>) => {
                    return of({ success: false, error: err });
                })
            );
    }

    public httpExternalPost(path: string, data: object, params: object = {}, headers: object = {}, subscribeToNavigation = true): Observable<any> {
        return this.httpClient.post(
            `${path}`,
            data,
            {
                headers: this.renderHeaders(headers),
                params: this.renderParams(params)
            },
        )
            .pipe(
                catchError((err: any, caught: Observable<any>) => {
                    return of({ success: false, error: err });
                })
            );
    }

    public httpPostDownload(path: string, headers: any = {}, subscribeToNavigation = true): Observable<any> {
        return this.httpClient.post(
            `${this.apiUrl}${path}`,
            {},
            {
                responseType: "arraybuffer"
            },
        )
            .pipe(
                catchError((err: any, caught: Observable<any>) => {
                    return of({ success: false, error: err });
                })
            );
    }

    /**
     * Generate httpParams by Object velues
     * param  {Object}     params
     * return {HttpParams}
     */
    private renderParams(params: any): HttpParams {
        let httpParams = new HttpParams();
        Object.keys(params).forEach((key) => {
            httpParams = httpParams.append(key, params[key]);
        });
        return httpParams;
    }

    /**
     * Generate httpParams by Object velues
     * param  {Object}     params
     * return {HttpParams}
     */
    private renderHeaders(headers: any): HttpHeaders {
        let httpHeaders = new HttpHeaders();
        Object.keys(headers).forEach((key) => {
            httpHeaders = httpHeaders.append(key, headers[key]);
        });
        return httpHeaders;
    }

    /**
     * generic method that make a post or get based on data variable
     * @param path string
     * @param data object or null for httpGet request
     * @param params object
     */
    public request(path: string, data = {}, params: object = {}): Observable<any> {
        if (!data) {
            return this.httpGet(path, params);
        }
        return this.httpPost(path, data);
    }
}
