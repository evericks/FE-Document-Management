import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from 'app/types/department.type';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DepartmentService {

    private _department: BehaviorSubject<Department | null> = new BehaviorSubject(null);
    private _departments: BehaviorSubject<Department[] | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for department
 */
    get department$(): Observable<Department> {
        return this._department.asObservable();
    }

    /**
     * Getter for departments
     */
    get departments$(): Observable<Department[]> {
        return this._departments.asObservable();
    }


    getDepartments():
        Observable<Department[]> {
        return this._httpClient.get<Department[]>('/api/departments').pipe(
            tap((response) => {
                // Set value for current departments
                this._departments.next(response);
            }),
        );
    }

    /**
     * Get department by id
     */
    getDepartmentById(id: string): Observable<Department> {
        return this.departments$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<Department>('/api/departments/' + id).pipe(
                map((department) => {

                    // Set value for current department
                    this._department.next(department);

                    // Return the new department
                    return department;
                })
            ))
        );
    }

    /**
* Create department
*/
    createDepartment(data) {
        return this.departments$.pipe(
            take(1),
            switchMap((departments) => this._httpClient.post<Department>('/api/departments', data).pipe(
                map((newdepartment) => {

                    // Update departments
                    if (departments) {
                        this._departments.next([newdepartment, ...departments]);
                    }

                    // Return new department
                    return newdepartment;
                })
            ))
        )
    }

    /**
    * Update department
    */
    updateDepartment(id: string, data) {
        return this.departments$.pipe(
            take(1),
            switchMap((departments) => this._httpClient.put<Department>('/api/departments/' + id, data).pipe(
                map((updatedProvince) => {

                    if (departments) {

                        // Update departments
                        this._departments.next(departments);
                    }

                    // Update department
                    this._department.next(updatedProvince);

                    // Return updated department
                    return updatedProvince;
                })
            ))
        )
    }

    deleteDepartment(id: string): Observable<boolean> {
        return this.departments$.pipe(
            take(1),
            switchMap(departments => this._httpClient.delete('/api/departments/' + id).pipe(
                map(() => {
                    // Find the index of the deleted department
                    const index = departments.findIndex(item => item.id === id);

                    // Delete the department
                    departments.splice(index, 1);

                    // Update the departments
                    this._departments.next(departments);

                    // Return the deleted status
                    return true;
                }),
            )),
        );
    }
}