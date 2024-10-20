import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentStatus } from 'app/types/document-status.type';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentStatusService {

    private _documentStatus: BehaviorSubject<DocumentStatus | null> = new BehaviorSubject(null);
    private _documentStatuses: BehaviorSubject<DocumentStatus[] | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for documentStatus
 */
    get documentStatus$(): Observable<DocumentStatus> {
        return this._documentStatus.asObservable();
    }

    /**
     * Getter for documentStatuses
     */
    get documentStatuses$(): Observable<DocumentStatus[]> {
        return this._documentStatuses.asObservable();
    }


    getDocumentStatuses():
        Observable<DocumentStatus[]> {
        return this._httpClient.get<DocumentStatus[]>('/api/document-statuses').pipe(
            tap((response) => {
                // Set value for current documentStatuses
                this._documentStatuses.next(response);
            }),
        );
    }

    /**
     * Get documentStatus by id
     */
    getDocumentStatusById(id: string): Observable<DocumentStatus> {
        return this.documentStatuses$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<DocumentStatus>('/api/document-statuses/' + id).pipe(
                map((documentStatus) => {

                    // Set value for current documentStatus
                    this._documentStatus.next(documentStatus);

                    // Return the new documentStatus
                    return documentStatus;
                })
            ))
        );
    }

    /**
* Create documentStatus
*/
    createDocumentStatus(data) {
        return this.documentStatuses$.pipe(
            take(1),
            switchMap((documentStatuses) => this._httpClient.post<DocumentStatus>('/api/document-statuses', data).pipe(
                map((newdocumentStatus) => {

                    // Update documentStatuses
                    if (documentStatuses) {
                        this._documentStatuses.next([newdocumentStatus, ...documentStatuses]);
                    }

                    // Return new documentStatus
                    return newdocumentStatus;
                })
            ))
        )
    }

    /**
    * Update documentStatus
    */
    updateDocumentStatus(id: string, data) {
        return this.documentStatuses$.pipe(
            take(1),
            switchMap((documentStatuses) => this._httpClient.put<DocumentStatus>('/api/document-statuses/' + id, data).pipe(
                map((updatedProvince) => {

                    if (documentStatuses) {

                        // Update documentStatuses
                        this._documentStatuses.next(documentStatuses);
                    }

                    // Update documentStatus
                    this._documentStatus.next(updatedProvince);

                    // Return updated documentStatus
                    return updatedProvince;
                })
            ))
        )
    }

    deleteDocumentStatus(id: string): Observable<boolean> {
        return this.documentStatuses$.pipe(
            take(1),
            switchMap(documentStatuses => this._httpClient.delete('/api/document-statuses/' + id).pipe(
                map(() => {
                    // Find the index of the deleted documentStatus
                    const index = documentStatuses.findIndex(item => item.id === id);

                    // Delete the documentStatus
                    documentStatuses.splice(index, 1);

                    // Update the documentStatuses
                    this._documentStatuses.next(documentStatuses);

                    // Return the deleted status
                    return true;
                }),
            )),
        );
    }
}