import { Component, OnInit, AfterContentInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AdvertisersService } from '../../../services/advertisers/advertisers.service';
import { IAdvertiser, IAdvertiserContext, IAdvertiserView } from './../../../entities/advertisers.entity';
import * as Rx from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { SortByPipe } from '../../../pipes/sort.pipe';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { environment } from '../../../../environments/environment';
import { Response } from "@angular/http";
import { ModalInfo, ModalCommand, ModalType, ModalFormType, ModalLocation } from '../../../entities/modal.entity';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-advertisers-list',
    templateUrl: './advertisers-list.component.html',
    styleUrls: ['./advertisers-list.component.scss']
})

export class AdvertisersListComponent implements OnInit, AfterContentInit, OnDestroy {
    public advertisersResponse: IAdvertiserContext = undefined;
    public advertisersCollection: Array<IAdvertiser> = undefined;
    private subs: Rx.Subscription;
    public searchTerm: string = undefined;
    private sortByParam: string = 'firstName';
    public SortDirection = SortDirection;
    private sortDirection: SortDirection = SortDirection.Ascending;
    private formerSortDirection: SortDirection = undefined;
    public p: number = 1;
    private defaultItemsPerPage: number = environment.config.pagination.defaultItemsPerPage;

    @ViewChild("searchAdvertiserTerm") searchAdvertiserTerm: ElementRef;

    closeResult: string;

    constructor(
        private _advertisersService: AdvertisersService,
        private _modalService: NgbModal
    ) {
    }

    ngOnInit() {

        this._advertisersService.GetAllAdvertisersAlt().subscribe((response: Array<IAdvertiser>) => {
            this.advertisersCollection = response;

        }, (error: Error) => {
            console.log(error);
        })
    }

    ngAfterContentInit() {

        Rx.fromEvent(<HTMLInputElement>this.searchAdvertiserTerm.nativeElement, "input")
            .pipe(
                map(
                    (event: Event) => (<HTMLInputElement>event.target).value
                ),
                debounceTime(800)
            )
            .subscribe((searchTerm) => {
                console.log(searchTerm);
                this.searchTerm = searchTerm;
            });
    }

    public ApplySort(param: string, direction: SortDirection) {
        this.sortByParam = param;
        this.formerSortDirection = this.sortDirection;
        this.sortDirection = direction;

        if (this.sortDirection != this.formerSortDirection) {
            this.advertisersCollection = this.advertisersCollection.reverse();
        }
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    public open(content) {
        this._modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    public SubmitForm(){
        this._advertisersService.SubmitForm();
    }

}


export enum SortDirection {
    Ascending,
    Descending
}
