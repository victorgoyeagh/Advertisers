import { InternalViewRef } from "@angular/core/src/linker/view_ref";

export interface IAdvertiserRoot {
    '@context'?: string,
    '@id': string,
    '@type': string
}

export interface IAdvertiserContext extends IAdvertiserRoot {
    'hydra:member': Array<IAdvertiser>,
    'hydra:totalItems': number,
    'hydra:view': IAdvertiserView
}

export interface IAdvertiserView {
    '@id': string,
    '@type': string
}

export interface IAdvertiser {
    '@id': string,
    '@type':string,
    address: string,
    email: string,
    firstName: string,
    id: number,
    lastName: string,
    name: string,
    orgurl: string,
    telephone: string
    updatedTs: string,
    addressDetails?: IAddress
}

export interface IAddress extends IAdvertiserRoot {
    id?: number,
    address: string,
    postcode: string,
    city?: string,
    updatedTs?: string
}