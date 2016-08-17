import { Injectable } from '@angular/core';

@Injectable()
export class LabelService {

    constructor() { }

    labelnize(label: string, uppercase: boolean) {
        return label !== "ios" ? (uppercase ? label.toUpperCase() : label) : "iOS";
    }

}