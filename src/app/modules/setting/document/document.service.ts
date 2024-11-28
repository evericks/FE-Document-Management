import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Document } from 'app/types/document.type';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentService {

    private _document: BehaviorSubject<Document | null> = new BehaviorSubject(null);
    private _documents: BehaviorSubject<Document[] | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for document
 */
    get document$(): Observable<Document> {
        return this._document.asObservable();
    }

    /**
     * Getter for documents
     */
    get documents$(): Observable<Document[]> {
        return this._documents.asObservable();
    }

    getAllDocuments():
        Observable<Document[]> {
        return this._httpClient.get<Document[]>('/api/documents').pipe(
            tap((response) => {
                // Set value for current documents
                this._documents.next(response);
            }),
        );
    }

    getDocuments():
        Observable<Document[]> {
        return this._httpClient.get<Document[]>('/api/documents/users').pipe(
            tap((response) => {
                // Set value for current documents
                this._documents.next(response);
            }),
        );
    }

    getReferenceDocuments():
        Observable<Document[]> {
        return this._httpClient.get<Document[]>('/api/documents/users/references').pipe(
            tap((response) => {
                // Set value for current documents
                this._documents.next(response);
            }),
        );
    }

    getUserReceiveDocuments():
        Observable<Document[]> {
        return this._httpClient.get<Document[]>('/api/documents/users/receive').pipe(
            tap((response) => {
                // Set value for current documents
                this._documents.next(response);
            }),
        );
    }

    getUserReturnDocuments():
        Observable<Document[]> {
        return this._httpClient.get<Document[]>('/api/documents/users/return').pipe(
            tap((response) => {
                // Set value for current documents
                this._documents.next(response);
            }),
        );
    }

    getUserDraftDocuments():
        Observable<Document[]> {
        return this._httpClient.get<Document[]>('/api/documents/users/drafting').pipe(
            tap((response) => {
                // Set value for current documents
                this._documents.next(response);
            }),
        );
    }

    getUserUnclassifiedDocuments():
        Observable<Document[]> {
        return this._httpClient.get<Document[]>('/api/documents/users/unclassified').pipe(
            tap((response) => {
                // Set value for current documents
                this._documents.next(response);
            }),
        );
    }

    getUserPendingProcessingDocuments():
        Observable<Document[]> {
        return this._httpClient.get<Document[]>('/api/documents/users/pending-processing').pipe(
            tap((response) => {
                // Set value for current documents
                this._documents.next(response);
            }),
        );
    }

    /**
     * Get document by id
     */
    getDocumentById(id: string): Observable<Document> {
        return this.documents$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<Document>('/api/documents/' + id).pipe(
                map((document) => {

                    // Set value for current document
                    this._document.next(document);

                    // Return the new document
                    return document;
                })
            ))
        );
    }

    /**
* Create document
*/
    createDocument(data) {
        return this.documents$.pipe(
            take(1),
            switchMap((documents) => this._httpClient.post<Document>('/api/documents', data).pipe(
                map((newdocument) => {

                    // Update documents
                    if (documents) {
                        this._documents.next([newdocument, ...documents]);
                    }

                    // Return new document
                    return newdocument;
                })
            ))
        )
    }

    /**
* Create document
*/
    createOutgoingDocument(data) {
        return this.documents$.pipe(
            take(1),
            switchMap((documents) => this._httpClient.post<Document>('/api/documents/outgoing', data).pipe(
                map((newdocument) => {

                    // Update documents
                    if (documents) {
                        this._documents.next([newdocument, ...documents]);
                    }

                    // Return new document
                    return newdocument;
                })
            ))
        )
    }

    /**
* Create document
*/
    createDraftDocument(data) {
        return this.documents$.pipe(
            take(1),
            switchMap((documents) => this._httpClient.post<Document>('/api/documents/drafting', data).pipe(
                map((newdocument) => {

                    // Update documents
                    if (documents) {
                        this._documents.next([newdocument, ...documents]);
                    }

                    // Return new document
                    return newdocument;
                })
            ))
        )
    }

    /**
* Create document
*/
    createIncomingDocument(data) {
        return this.documents$.pipe(
            take(1),
            switchMap((documents) => this._httpClient.post<Document>('/api/documents/incoming', data).pipe(
                map((newdocument) => {

                    // Update documents
                    if (documents) {
                        this._documents.next([newdocument, ...documents]);
                    }

                    // Return new document
                    return newdocument;
                })
            ))
        )
    }

    /**
    * Update document
    */
    updateDocument(id: string, data) {
        return this.documents$.pipe(
            take(1),
            switchMap((documents) => this._httpClient.put<Document>('/api/documents/' + id, data).pipe(
                map((updatedDocument) => {

                    if (documents) {

                        // Update documents
                        this._documents.next(documents);
                    }

                    // Update document
                    this._document.next(updatedDocument);

                    // Return updated document
                    return updatedDocument;
                })
            ))
        )
    }

    receiveDocument(id: string) {
        return this.documents$.pipe(
            take(1),
            switchMap((documents) => this._httpClient.put<Document>('/api/documents/' + id + '/receive', null).pipe(
                map((updatedDocument) => {

                    if (documents) {

                        // Update documents
                        this._documents.next(documents);
                    }

                    // Update document
                    this._document.next(updatedDocument);

                    // Return updated document
                    return updatedDocument;
                })
            ))
        )
    }

    returnDocument(id: string, data) {
        return this.documents$.pipe(
            take(1),
            switchMap((documents) => this._httpClient.put<Document>('/api/documents/' + id + '/return', data).pipe(
                map((updatedDocument) => {

                    if (documents) {

                        // Update documents
                        this._documents.next(documents);
                    }

                    // Update document
                    this._document.next(updatedDocument);

                    // Return updated document
                    return updatedDocument;
                })
            ))
        )
    }

    sendDocument(id: string, data) {
        return this.documents$.pipe(
            take(1),
            switchMap((documents) => this._httpClient.put<Document>('/api/documents/' + id + '/send', data).pipe(
                map((updatedDocument) => {

                    if (documents) {

                        // Update documents
                        this._documents.next(documents);
                    }

                    // Update document
                    this._document.next(updatedDocument);

                    // Return updated document
                    return updatedDocument;
                })
            ))
        )
    }

    classifyDocument(id: string, data: any) {
        return this.documents$.pipe(
            take(1),
            switchMap((documents) => this._httpClient.put<Document>('/api/documents/' + id + '/classify/', data).pipe(
                map((updatedDocument) => {

                    if (documents) {

                        // Update documents
                        this._documents.next(documents);
                    }

                    // Update document
                    this._document.next(updatedDocument);

                    // Return updated document
                    return updatedDocument;
                })
            ))
        )
    }

    deleteDocument(id: string): Observable<boolean> {
        return this.documents$.pipe(
            take(1),
            switchMap(documents => this._httpClient.delete('/api/documents/' + id).pipe(
                map(() => {
                    if (documents) {

                        // Find the index of the deleted document
                        const index = documents.findIndex(item => item.id === id);

                        // Delete the document
                        documents.splice(index, 1);

                        // Update the documents
                        this._documents.next(documents);
                    }

                    // Return the deleted status
                    return true;
                }),
            )),
        );
    }

    uploadFile(data) {
        return this._httpClient.post<any>('/api/documents/preview', data);
    }
}