import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResources } from "src/helpers";
import { BaseService } from "./base.service";

export enum USER_ROLES {
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN',
    BASIC = 'BASIC',
    ALLY = 'ALLY',
    RISK = 'RISK',
    COMMERCIAL = 'COMMERCIAL',
    SQUAD = 'SQUAD',
    BILLING_SUPER_ADMIN = 'BILLING_SUPER_ADMIN',
    BILLING_COLLECTION_HOUSE_ADMIN = 'BILLING_COLLECTION_HOUSE_ADMIN',
    BILLING_COLLECTION_HOUSE_ADVISER = 'BILLING_COLLECTION_HOUSE_ADVISER'
}

export interface AllyAttr {
    nombre:   string
    area?:    string
    cedula:   string
    usuario:  string
    correo:   string
    password: string
    telefono: string
    celular:  string
    cargo:    string
    entity:   string
    estado?:  boolean
}

export interface PaginationAttrs {
    skip:   number
    limit:  number
    fields: Array<keyof AllyAttr>
}

export interface UserQueryAttrs extends Partial<AllyAttr>, Partial<PaginationAttrs> {}

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {

    public entity: string = ''

    public getUserInfo(): Observable<any> {
        return this.httpGet(ApiResources.userInfo);
    }

    public getUserList(filter: any): Observable<any> {
        //console.log(filter)
        return this.httpPost(ApiResources.userList, this.encryptObject(filter));
    }

    public getUserQuery(filter: any): Observable<any> {
        //console.log(filter)
        return this.httpPost(ApiResources.userQuery, this.encryptObject(filter));
    }

    public getUserListByUser(user: string): Observable<any> {
        return this.httpGet(ApiResources.userListByUser(user));
    }

    public updateResetPasswordUser(user: any): Observable<any> {
        return this.httpPatch(ApiResources.resetPassword(user._id), user );
    }

    public activateUser(userId: string): Observable<any> {
        return this.httpPatch(ApiResources.activateUser(userId), {});
    }
    public inactivateUser(userId: string): Observable<any> {
        return this.httpPatch(ApiResources.inactivateUser(userId), {});
    }

    public getUserByEmail(email: string): Observable<any> {
        return this.httpGet(ApiResources.users.findOneByEmail(email), {});
    }

    public getUserByDocument(userQueryAttrs: UserQueryAttrs): Observable<any> {
        return this.getUsersByTerm(this.getQueryStringFromQuery(userQueryAttrs))
    }

    public getUserToActivate(userQueryAttrs: UserQueryAttrs): Observable<any> {
        return this.getUsersByTerm(this.getQueryStringFromQuery(userQueryAttrs))
    }

    public getMyUserList(): Observable<any> {
        return this.httpGet(ApiResources.myUserList);
    }

    registerUser(user: any): Observable<any> {
        return this.httpPost(ApiResources.registerUser, this.encryptObject(user));
    }

    updateUserBySession(payload: object): Observable<any> {
        return this.httpPatch(ApiResources.updateUserBySession, payload);
    }

    registerMyUser(user: any): Observable<any> {
        return this.httpPost(ApiResources.registerMyUser, this.encryptObject(user));
    }

    updateUser(user: any): Observable<any> {
        return this.httpPost(ApiResources.updateUser, this.encryptObject(user));
    }

    setProyectoUser(user: any): Observable<any> {
        return this.httpPost(ApiResources.setProyectoUsuario, this.encryptObject(user));
    }
    
    removeProyectoUsuario(user: any): Observable<any> {
        return this.httpPost(ApiResources.removeProyectoUsuario, this.encryptObject(user));
    }

    getUsuariosList(ldap: Boolean): Observable<any> {
        return this.httpPost(ApiResources.getUserList, this.encryptObject({ ldap: ldap }));
    }

    sendAllyInfo(payload: AllyAttr): Observable<any> {
        return this.httpPost(ApiResources.signupAlly, payload);
    }

    activateAlly(payload: { token: string }): Observable<any> {
        return this.httpPost(ApiResources.activateAlly, payload);
    }

    createUser(user: any): Observable<any> {
        return this.httpPost(ApiResources.createUser, user);
    }

    private getUsersByTerm(term: string): Observable<any> {
        return this.httpGet(ApiResources.users.findByTerm(term));
    }

    private getQueryStringFromQuery(b: any): string {
        let query: string[] = []
        let queryString = ""
        Object.keys(b).forEach((key: any) => {
            if(key !== 'fields') {
                query.push(`${key}=${b[key]}`)
            }
        })
        queryString = `?${query.join('&')}`
        if(b['fields']) {
            queryString = queryString + `&fields=${b.fields.join(',')}`
        }
        return queryString
    }
}
