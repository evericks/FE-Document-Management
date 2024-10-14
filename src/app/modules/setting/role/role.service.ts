import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'app/types/role.type';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoleService {

    private _role: BehaviorSubject<Role | null> = new BehaviorSubject(null);
    private _roles: BehaviorSubject<Role[] | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for role
 */
    get role$(): Observable<Role> {
        return this._role.asObservable();
    }

    /**
     * Getter for roles
     */
    get roles$(): Observable<Role[]> {
        return this._roles.asObservable();
    }


    getRoles():
        Observable<Role[]> {
        return this._httpClient.get<Role[]>('/api/roles').pipe(
            tap((response) => {
                // Set value for current roles
                this._roles.next(response);
            }),
        );
    }

    /**
     * Get role by id
     */
    getRoleById(id: string): Observable<Role> {
        return this.roles$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<Role>('/api/roles/' + id).pipe(
                map((role) => {

                    // Set value for current role
                    this._role.next(role);

                    // Return the new role
                    return role;
                })
            ))
        );
    }

    /**
* Create role
*/
    createRole(data) {
        return this.roles$.pipe(
            take(1),
            switchMap((roles) => this._httpClient.post<Role>('/api/roles', data).pipe(
                map((newrole) => {

                    // Update roles
                    if (roles) {
                        this._roles.next([newrole, ...roles]);
                    }

                    // Return new role
                    return newrole;
                })
            ))
        )
    }

    /**
    * Update role
    */
    updateRole(id: string, data) {
        return this.roles$.pipe(
            take(1),
            switchMap((roles) => this._httpClient.put<Role>('/api/roles/' + id, data).pipe(
                map((updatedProvince) => {

                    if (roles) {

                        // Update roles
                        this._roles.next(roles);
                    }

                    // Update role
                    this._role.next(updatedProvince);

                    // Return updated role
                    return updatedProvince;
                })
            ))
        )
    }

    deleteRole(id: string): Observable<boolean> {
        return this.roles$.pipe(
            take(1),
            switchMap(roles => this._httpClient.delete('/api/roles/' + id).pipe(
                map(() => {
                    // Find the index of the deleted role
                    const index = roles.findIndex(item => item.id === id);

                    // Delete the role
                    roles.splice(index, 1);

                    // Update the roles
                    this._roles.next(roles);

                    // Return the deleted status
                    return true;
                }),
            )),
        );
    }
}