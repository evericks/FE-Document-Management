import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/types/user.type';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

    private _user: BehaviorSubject<User | null> = new BehaviorSubject(null);
    private _users: BehaviorSubject<User[] | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for user
 */
    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    /**
     * Getter for users
     */
    get users$(): Observable<User[]> {
        return this._users.asObservable();
    }


    getUsers():
        Observable<User[]> {
        return this._httpClient.get<User[]>('/api/users').pipe(
            tap((response) => {
                // Set value for current users
                this._users.next(response);
            }),
        );
    }

    /**
     * Get user by id
     */
    getUserById(id: string): Observable<User> {
        return this.users$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<User>('/api/users/' + id).pipe(
                map((user) => {

                    // Set value for current user
                    this._user.next(user);

                    // Return the new user
                    return user;
                })
            ))
        );
    }

    /**
* Create user
*/
    createUser(data) {
        return this.users$.pipe(
            take(1),
            switchMap((users) => this._httpClient.post<User>('/api/users', data).pipe(
                map((newuser) => {

                    // Update users
                    if (users) {
                        this._users.next([newuser, ...users]);
                    }

                    // Return new user
                    return newuser;
                })
            ))
        )
    }

    /**
    * Update user
    */
    updateUser(id: string, data) {
        return this.users$.pipe(
            take(1),
            switchMap((users) => this._httpClient.put<User>('/api/users/' + id, data).pipe(
                map((updatedProvince) => {

                    if (users) {

                        // Update users
                        this._users.next(users);
                    }

                    // Update user
                    this._user.next(updatedProvince);

                    // Return updated user
                    return updatedProvince;
                })
            ))
        )
    }

    deleteUser(id: string): Observable<boolean> {
        return this.users$.pipe(
            take(1),
            switchMap(users => this._httpClient.delete('/api/users/' + id).pipe(
                map(() => {
                    // Find the index of the deleted user
                    const index = users.findIndex(item => item.id === id);

                    // Delete the user
                    users.splice(index, 1);

                    // Update the users
                    this._users.next(users);

                    // Return the deleted status
                    return true;
                }),
            )),
        );
    }
}