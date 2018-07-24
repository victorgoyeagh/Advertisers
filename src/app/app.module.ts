import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

//routing
import { RouterModule } from '@angular/router';
import { Routing } from './routes/routing.route';

//plugins
import { NgxPaginationModule } from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//components
import { AppComponent } from './app.component';
import { AdvertisersListComponent } from './components/advertisers/advertisers-list/advertisers-list.component';
import { AdvertisersManagerComponent } from './components/advertisers/advertisers-manager/advertisers-manager.component';

//services
import { AdvertisersService } from './services/advertisers/advertisers.service';

//views
import { AdvertisersPage } from './views/advertisers/advertisers.component';

//pipes
import { SortByPipe } from './pipes/sort.pipe';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
    declarations: [
        AppComponent,
        AdvertisersListComponent,
        AdvertisersManagerComponent,
        AdvertisersPage,
        SortByPipe,
        FilterPipe
    ],
    imports: [
        NgbModule.forRoot(),
        Routing,
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        NgxPaginationModule
    ],
    providers: [
        AdvertisersService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
