import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateService {
    d_year = 365.25;
    d_month = [{n: "Jan", d: 31},{n: "Fev", d: 28.25},{n: "Mar", d: 31},{n: "Avr", d: 30},{n: "May", d: 31},{n: "Jun", d: 30},{n: "Jul", d: 31},{n: "Aug", d: 31},{n: "Sep", d: 30},{n: "Oct", d: 31},{n: "Nov", d: 30},{n: "Dec", d: 31}];
    start = 0;
    length = 0;
    history: Array<any> = [];

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

    get_event(date: string) {
        return ((this.datetodays(date) - this.start) / this.length) * 100
    }
    get_period(date1: string, date2: string) {
        let start_day = this.datetodays(date1);
        let end_day = this.datetodays(date2);
        let level = 0;
        for (let p of this.history) {
            if (p.l == level) {
                console.log(`s: ${start_day}, e: ${end_day}, ${p.s}, ${p.e}`)
                if ((start_day >= p.s && start_day <= p.e) || (end_day >= p.s && end_day <= p.e) || (start_day < p.s && end_day > p.e)) {
                    level += 1;
                }
            }
        }
        this.history.push({s: start_day, e: end_day, l: level});
        let out = {
            pos: ((start_day - this.start) / this.length) * 100,
            width: ((end_day - start_day) / this.length) * 100,
            top: level
        }
        return out
    }
}