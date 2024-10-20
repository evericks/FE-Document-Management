import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Document } from 'app/types/document.type';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReceiveDocumentService {

    private _receiveDocument: BehaviorSubject<Document | null> = new BehaviorSubject(null);
    private _receiveDocuments: BehaviorSubject<Document[] | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for receiveDocument
 */
    get receiveDocument$(): Observable<Document> {
        return this._receiveDocument.asObservable();
    }

    /**
     * Getter for receiveDocuments
     */
    get receiveDocuments$(): Observable<Document[]> {
        return this._receiveDocuments.asObservable();
    }


    getDocuments():
        Observable<Document[]> {
        return this._httpClient.get<Document[]>('/api/documents/users').pipe(
            tap((response) => {
                // Set value for current receiveDocuments
                this._receiveDocuments.next(response);
            }),
        );
    }

    /**
     * Get receiveDocument by id
     */
    getDocumentById(id: string): Observable<Document> {
        return this.receiveDocuments$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<Document>('/api/documents/' + id).pipe(
                map((receiveDocument) => {

                    // Set value for current receiveDocument
                    this._receiveDocument.next(receiveDocument);

                    // Return the new receiveDocument
                    return receiveDocument;
                })
            ))
        );
    }

    /**
* Create receiveDocument
*/
    createDocument(data) {
        return this.receiveDocuments$.pipe(
            take(1),
            switchMap((receiveDocuments) => this._httpClient.post<Document>('/api/documents', data).pipe(
                map((newreceiveDocument) => {

                    // Update receiveDocuments
                    if (receiveDocuments) {
                        this._receiveDocuments.next([newreceiveDocument, ...receiveDocuments]);
                    }

                    // Return new receiveDocument
                    return newreceiveDocument;
                })
            ))
        )
    }

    /**
    * Update receiveDocument
    */
    updateDocument(id: string, data) {
        return this.receiveDocuments$.pipe(
            take(1),
            switchMap((receiveDocuments) => this._httpClient.put<Document>('/api/documents/' + id, data).pipe(
                map((updatedProvince) => {

                    if (receiveDocuments) {

                        // Update receiveDocuments
                        this._receiveDocuments.next(receiveDocuments);
                    }

                    // Update receiveDocument
                    this._receiveDocument.next(updatedProvince);

                    // Return updated receiveDocument
                    return updatedProvince;
                })
            ))
        )
    }

    deleteDocument(id: string): Observable<boolean> {
        return this.receiveDocuments$.pipe(
            take(1),
            switchMap(receiveDocuments => this._httpClient.delete('/api/documents/' + id).pipe(
                map(() => {
                    // Find the index of the deleted receiveDocument
                    const index = receiveDocuments.findIndex(item => item.id === id);

                    // Delete the receiveDocument
                    receiveDocuments.splice(index, 1);

                    // Update the receiveDocuments
                    this._receiveDocuments.next(receiveDocuments);

                    // Return the deleted status
                    return true;
                }),
            )),
        );
    }
}