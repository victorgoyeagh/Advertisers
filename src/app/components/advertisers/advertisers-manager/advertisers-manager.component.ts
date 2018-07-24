import { Component, OnInit } from '@angular/core';
import { Response, HttpModule, Http } from '@angular/http';
import { AdvertisersService } from '../../../services/advertisers/advertisers.service';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { IAdvertiser, IAddress } from './../../../entities/advertisers.entity';
import { MiscUtil } from './../../../utils/MiscUtils';
import { delay, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-advertisers-manager',
    templateUrl: './advertisers-manager.component.html',
    styleUrls: ['./advertisers-manager.component.scss']
})
export class AdvertisersManagerComponent implements OnInit {
    private textRestrictRegex = new RegExp("^[0-9,a-z,A-Z ,.'-]+$");
    private urlRestrictRegex = new RegExp("^(https?|ftp)://(-\.)?([^\s/?\.#-]+\.?)+(/[^\s]*)?$");
    private emailRegex = new RegExp("^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$");

    public advertiserManagerForm = new FormGroup({
        firstname: new FormControl("", [
            Validators.required,
            Validators.pattern(this.textRestrictRegex)
        ]),        
        lastname: new FormControl("", [
            Validators.required,
            Validators.pattern(this.textRestrictRegex)
        ]),     
        email: new FormControl("", [
            Validators.required,
            Validators.pattern(this.emailRegex)
        ]),
        url: new FormControl("", [
            Validators.required,
            Validators.pattern(this.urlRestrictRegex)
        ]),
        organisation: new FormControl("", [
            Validators.pattern(this.textRestrictRegex)
        ]),
        telephone: new FormControl(),
        address: new FormControl(),
        postcode: new FormControl()
    })

    constructor(
        private _http: Http,
        private _advertisersService: AdvertisersService
    ) {

    }

    ngOnInit(){
        this._advertisersService.submitForm.subscribe((value: boolean) => {
            console.log(value);
            if(value){
                this.SubmitForm();
            }
        })
    }

    SubmitForm() {

        if (!this.advertiserManagerForm.valid) {
            for (let i in this.advertiserManagerForm.controls) {
                this.advertiserManagerForm.controls[i].markAsTouched();
            }

        } else {

            //capture values
            let newAdvertiser = <IAdvertiser> {
                firstName: this.advertiserManagerForm.controls.firstname.value,
                lastName: this.advertiserManagerForm.controls.lastname.value,
                email: this.advertiserManagerForm.controls.email.value,
                orgurl: this.advertiserManagerForm.controls.url.value,
                name: this.advertiserManagerForm.controls.organisation.value,
                telephone: this.advertiserManagerForm.controls.organisation.value,
            }

            let newAddress = <IAddress> {
                address: this.advertiserManagerForm.controls.address.value,
                postcode: this.advertiserManagerForm.controls.postcode.value,
            }

            this._advertisersService.SaveAdvertiserWithAddress(newAdvertiser, newAddress);
            
        }
    }



}
