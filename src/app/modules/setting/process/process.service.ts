import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Process } from 'app/types/process.type';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProcessService {

    private _process: BehaviorSubject<Process | null> = new BehaviorSubject(null);
    private _processes: BehaviorSubject<Process[] | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for process
 */
    get process$(): Observable<Process> {
        return this._process.asObservable();
    }

    /**
     * Getter for processes
     */
    get processes$(): Observable<Process[]> {
        return this._processes.asObservable();
    }


    getProcesses():
        Observable<Process[]> {
        return this._httpClient.get<Process[]>('/api/processes').pipe(
            tap((response) => {
                // Set value for current processes
                this._processes.next(response);
            }),
        );
    }

    /**
     * Get process by id
     */
    getProcessById(id: string): Observable<Process> {
        return this.processes$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<Process>('/api/processes/' + id).pipe(
                map((process) => {

                    // Set value for current process
                    this._process.next(process);

                    // Return the new process
                    return process;
                })
            ))
        );
    }

    /**
 * Get process by id
 */
    getProcessByDocumentTypeId(id: string): Observable<Process> {
        return this.processes$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<Process>('/api/processes/document-types/' + id).pipe(
                map((process) => {

                    // Set value for current process
                    this._process.next(process);

                    // Return the new process
                    return process;
                })
            ))
        );
    }

    /**
* Create process
*/
    createProcess(data) {
        return this.processes$.pipe(
            take(1),
            switchMap((processes) => this._httpClient.post<Process>('/api/processes', data).pipe(
                map((newprocess) => {

                    // Update processes
                    if (processes) {
                        this._processes.next([newprocess, ...processes]);
                    }

                    // Return new process
                    return newprocess;
                })
            ))
        )
    }

    /**
    * Update process
    */
    updateProcess(id: string, data) {
        return this.processes$.pipe(
            take(1),
            switchMap((processes) => this._httpClient.put<Process>('/api/processes/' + id, data).pipe(
                map((updatedProvince) => {

                    if (processes) {

                        // Update processes
                        this._processes.next(processes);
                    }

                    // Update process
                    this._process.next(updatedProvince);

                    // Return updated process
                    return updatedProvince;
                })
            ))
        )
    }

    deleteProcess(id: string): Observable<boolean> {
        return this.processes$.pipe(
            take(1),
            switchMap(processes => this._httpClient.delete('/api/processes/' + id).pipe(
                map(() => {
                    // Find the index of the deleted process
                    const index = processes.findIndex(item => item.id === id);

                    // Delete the process
                    processes.splice(index, 1);

                    // Update the processes
                    this._processes.next(processes);

                    // Return the deleted status
                    return true;
                }),
            )),
        );
    }
}