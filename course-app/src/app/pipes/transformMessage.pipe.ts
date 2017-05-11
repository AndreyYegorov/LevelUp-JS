import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'transformMessage'
})
export class TransformMessage implements PipeTransform {

  transform(text: string, message) {
    // RegExp: clear hash | hash outside and inside span | hash inside span
    let findHashes = /(#[\wа-я]+)|(#<span(.+)?>[\wа-я]+<\/span>([\wа-я]+)?)|(<span(.+)?#([\wа-я]+)?<\/span>([\wа-я]+)?)/g;
      
    let hashes = message.hashes;

    if(hashes.length > 0) {
      let index = 0;

      return text.replace(findHashes, (match) => {
        let hash = hashes[index];

        index++;

        return `<a href="${hash}">${match}</a>`
      });
    }
    else {
      return text;
    }
  }
}