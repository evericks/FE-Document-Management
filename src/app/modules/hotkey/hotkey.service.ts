import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HotkeyService {
    constructor() { }

    listenForCtrlEnter(callback: () => void): void {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'Enter') {
                event.preventDefault();
                callback();
            }
        });
    }
}
