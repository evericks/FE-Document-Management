import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentType } from 'app/types/document-type.type';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentTypeService {

    private _documentType: BehaviorSubject<DocumentType | null> = new BehaviorSubject(null);
    private _documentTypes: BehaviorSubject<DocumentType[] | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for documentType
 */
    get documentType$(): Observable<DocumentType> {
        return this._documentType.asObservable();
    }

    /**
     * Getter for documentTypes
     */
    get documentTypes$(): Observable<DocumentType[]> {
        return this._documentTypes.asObservable();
    }

    getDocumentTypes():
        Observable<DocumentType[]> {
        return this._httpClient.get<DocumentType[]>('/api/document-types').pipe(
            tap((response) => {
                // Set value for current documentTypes
                this._documentTypes.next(response);
            }),
        );
    }

    getAdditionalInformationById(id: string): Observable<any[]> {
        return this._httpClient.get<any[]>('/api/document-types/additional-informations/' + id);
    }

    /**
     * Get documentType by id
     */
    getDocumentTypeById(id: string): Observable<DocumentType> {
        return this.documentTypes$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<DocumentType>('/api/document-types/' + id).pipe(
                map((documentType) => {

                    // Set value for current documentType
                    this._documentType.next(documentType);

                    // Return the new documentType
                    return documentType;
                })
            ))
        );
    }

    /**
* Create documentType
*/
    createDocumentType(data) {
        return this.documentTypes$.pipe(
            take(1),
            switchMap((documentTypes) => this._httpClient.post<DocumentType>('/api/document-types', data).pipe(
                map((newdocumentType) => {

                    // Update documentTypes
                    if (documentTypes) {
                        this._documentTypes.next([newdocumentType, ...documentTypes]);
                    }

                    // Return new documentType
                    return newdocumentType;
                })
            ))
        )
    }

    /**
    * Update documentType
    */
    updateDocumentType(id: string, data) {
        return this.documentTypes$.pipe(
            take(1),
            switchMap((documentTypes) => this._httpClient.put<DocumentType>('/api/document-types/' + id, data).pipe(
                map((updatedProvince) => {

                    if (documentTypes) {

                        // Update documentTypes
                        this._documentTypes.next(documentTypes);
                    }

                    // Update documentType
                    this._documentType.next(updatedProvince);

                    // Return updated documentType
                    return updatedProvince;
                })
            ))
        )
    }

    deleteDocumentType(id: string): Observable<boolean> {
        return this.documentTypes$.pipe(
            take(1),
            switchMap(documentTypes => this._httpClient.delete('/api/document-types/' + id).pipe(
                map(() => {
                    // Find the index of the deleted documentType
                    const index = documentTypes.findIndex(item => item.id === id);

                    // Delete the documentType
                    documentTypes.splice(index, 1);

                    // Update the documentTypes
                    this._documentTypes.next(documentTypes);

                    // Return the deleted status
                    return true;
                }),
            )),
        );
    }
}