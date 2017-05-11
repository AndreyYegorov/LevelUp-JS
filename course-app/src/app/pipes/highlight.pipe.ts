import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, term): string {
    if(!term) return text;

    return text.replace(term, (match) => `<span class="highlight">${match}</span>`);
  }
}