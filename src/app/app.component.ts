import { Component } from '@angular/core';
import { environment } from './../environments/environment';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    public title:string = environment.config.dictionary.appTitle;
    public date:number = new Date().getFullYear();
}
