import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(documents: any[], searchTitle: string): any[] {
        if(!documents) return [];
        if(!searchTitle) return documents;
        searchTitle = searchTitle.toLowerCase();
        return documents.filter( doc => {
            return doc.title.toLowerCase().includes(searchTitle);
        });
    }
}