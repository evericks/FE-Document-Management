import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization } from 'app/types/organization.type';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrganizationService {

    private _organization: BehaviorSubject<Organization | null> = new BehaviorSubject(null);
    private _organizations: BehaviorSubject<Organization[] | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for organization
 */
    get organization$(): Observable<Organization> {
        return this._organization.asObservable();
    }

    /**
     * Getter for organizations
     */
    get organizations$(): Observable<Organization[]> {
        return this._organizations.asObservable();
    }


    getOrganizations():
        Observable<Organization[]> {
        return this._httpClient.get<Organization[]>('/api/organizations').pipe(
            tap((response) => {
                // Set value for current organizations
                this._organizations.next(response);
            }),
        );
    }

    /**
     * Get organization by id
     */
    getOrganizationById(id: string): Observable<Organization> {
        return this.organizations$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<Organization>('/api/organizations/' + id).pipe(
                map((organization) => {

                    // Set value for current organization
                    this._organization.next(organization);

                    // Return the new organization
                    return organization;
                })
            ))
        );
    }

    /**
* Create organization
*/
    createOrganization(data) {
        return this.organizations$.pipe(
            take(1),
            switchMap((organizations) => this._httpClient.post<Organization>('/api/organizations', data).pipe(
                map((neworganization) => {

                    // Update organizations
                    if (organizations) {
                        this._organizations.next([neworganization, ...organizations]);
                    }

                    // Return new organization
                    return neworganization;
                })
            ))
        )
    }

    /**
    * Update organization
    */
    updateOrganization(id: string, data) {
        return this.organizations$.pipe(
            take(1),
            switchMap((organizations) => this._httpClient.put<Organization>('/api/organizations/' + id, data).pipe(
                map((updatedProvince) => {

                    if (organizations) {

                        // Update organizations
                        this._organizations.next(organizations);
                    }

                    // Update organization
                    this._organization.next(updatedProvince);

                    // Return updated organization
                    return updatedProvince;
                })
            ))
        )
    }

    deleteOrganization(id: string): Observable<boolean> {
        return this.organizations$.pipe(
            take(1),
            switchMap(organizations => this._httpClient.delete('/api/organizations/' + id).pipe(
                map(() => {
                    // Find the index of the deleted organization
                    const index = organizations.findIndex(item => item.id === id);

                    // Delete the organization
                    organizations.splice(index, 1);

                    // Update the organizations
                    this._organizations.next(organizations);

                    // Return the deleted status
                    return true;
                }),
            )),
        );
    }
}