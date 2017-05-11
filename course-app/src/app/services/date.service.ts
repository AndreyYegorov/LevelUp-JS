import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  constructor() { }

  getCurrentDate() {
    let dateNow = new Date(),
      day = (dateNow.getDate() < 10) ? '0' + dateNow.getDate() : dateNow.getDate(),
      month = (dateNow.getMonth() + 1 < 10) ? '0' + (dateNow.getMonth() + 1) : dateNow.getMonth() + 1,
      yearFull = dateNow.getFullYear(),
      hours = (dateNow.getHours() < 10) ? '0' + (dateNow.getHours()) : dateNow.getHours(),
      minutes = (dateNow.getMinutes() < 10) ? '0' + (dateNow.getMinutes()) : dateNow.getMinutes();

    return `${day}.${month}.${yearFull} at ${hours}:${minutes}`;
  }

}
