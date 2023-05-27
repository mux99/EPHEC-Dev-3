import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateService {
    d_year = 365.25;
    d_month = [{n: "Jan", d: 31},{n: "Fev", d: 28.25},{n: "Mar", d: 31},{n: "Avr", d: 30},{n: "May", d: 31},{n: "Jun", d: 30},{n: "Jul", d: 31},{n: "Aug", d: 31},{n: "Sep", d: 30},{n: "Oct", d: 31},{n: "Nov", d: 30},{n: "Dec", d: 31}];
    start = 0;
    length = 0;

    init(d_year: number, d_month: any, start: string, end: string) {
        this.d_year = d_year;
        this.d_month = d_month;
        this.start = this.datetodays(start);
        this.length = this.datetodays(end) - this.start;
    }

    datetodays(date: string) {
        let date_array = date.split("/").map(function(n,_i,_a){return Number(n);},this);
        let days = date_array[2]+(date_array[0]*this.d_year);
        for (let i = 0; i < date_array[1]; i++) {
           days += this.d_month[i].d;
        }
        return days;
    }

    get_pos(date: string) {
        return ((this.datetodays(date) - this.start) / this.length) * 100
    }
    get_len(date1: string, date2: string) {
        return ((this.datetodays(date2) - this.datetodays(date1)) / this.length) * 100
    }
}