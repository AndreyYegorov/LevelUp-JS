import { Pipe, PipeTransform } from '@angular/core';

import { ChatMessage } from '../utils/chat-message';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(messages: ChatMessage[], term: string) {
    if(!term) return messages;

    term = term.toLowerCase();

    return messages.filter(message => {
      let userName = message.userName.toLowerCase(),
        messageText = message.messageText.toLowerCase();
        
      return userName.includes(term) || messageText.includes(term);
    });
  }
}