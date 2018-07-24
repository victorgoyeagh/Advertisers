import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { map, debounceTime, switchMap, mergeMap, concat } from 'rxjs/operators';
import { IAdvertiser, IAdvertiserContext, IAddress } from './../../entities/advertisers.entity';
import { Http, Response, RequestOptions, RequestOptionsArgs, ResponseType, Headers } from '@angular/http';
import { environment } from './../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AdvertisersService {
    public advertisersResponse: IAdvertiserContext = undefined;
    public addressResponse: IAdvertiserContext = undefined;
    public advertisersCollection: Array<IAdvertiser> = undefined;
    public submitForm: Rx.BehaviorSubject<boolean> = new Rx.BehaviorSubject<boolean>(false);  
    private advertisersUrl: string = environment.config.api.advertisers;
    private addressesUrl: string = environment.config.api.addresses;
    private params:RequestOptions;

    constructor(
        private _http: Http
    ) {
    
        this.params = new RequestOptions({
            headers: new Headers({
                "Content-Type" : "application/json"
            }),
        });        
    }

    SaveAdvertiserWithAddress(advertiser: IAdvertiser, address: IAddress){
        console.log(advertiser, address);

        let dataToSave = {
            advertiser: advertiser,
            address: address
        }

        return this._http.post(this.advertisersUrl, dataToSave, this.params);
    }

    GetAllAdvertisersAlt() {
        return this._http.get(this.advertisersUrl)
            .pipe(
                switchMap((advertisersResponse: Response, index: number) => {

                    let advertisersCollection = advertisersResponse.json()["hydra:member"];

                    return this._http.get(this.addressesUrl)
                        .pipe(
                            switchMap((addressResponse: Response) => {

                                let addressCollection = addressResponse.json()["hydra:member"];
                                advertisersCollection.map((advertiser: IAdvertiser) => {

                                    advertiser.addressDetails = addressCollection.filter((address: IAddress) => {
                                        return advertiser.address == address["@id"]
                                    })[0];

                                    return advertiser
                                })

                                return Rx.of(advertisersCollection)
                            })
                        )
                })
            );
    }

    public SubmitForm(){
        this.submitForm.next(true);
    }
}
