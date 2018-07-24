import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], term): any {
        let retItems: Array<any>;

        if(!term)
            retItems = items;
         else
            retItems = items.filter((item) => { 
                term = term.toLowerCase();
                return (
                    item["name"].toLowerCase().indexOf(term) !== -1 ||
                    item["firstName"].toLowerCase().indexOf(term) !== -1 ||
                    item["lastName"].toLowerCase().indexOf(term) !== -1 ||
                    (item["firstName"] + ' ' + item["lastName"]).toLowerCase().indexOf(term) !== -1
                )
            });

        return retItems;
    }
}