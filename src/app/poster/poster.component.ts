import { Component, OnInit } from '@angular/core';
import { HttpService } from "../services/http.service";

@Component({
    selector: 'poster',
    templateUrl: './poster.component.html',
    styleUrls: ['./poster.component.less']
})
export class PosterComponent implements OnInit {
    public data: any[] = [];
    private selectedDate: string = new Date().toISOString();
    private offset: number = 0;

    constructor(private httpService: HttpService) { }


    ngOnInit(): void {
        this.httpService.getEvents(new Date().toISOString(), 0)
            .subscribe((res) => {
                console.log(res);
                this.data = res.data;
            })
    }

    public appendData(): void {
        this.offset += 6;
        this.httpService.getEvents(this.selectedDate, this.offset)
            .subscribe((res) => {
                this.data.push(...res.data);
            })
    }

    public loadData(date: string): void {
        this.selectedDate = date;
        this.httpService.getEvents(date, 0)
            .subscribe((res) => {
                this.data = res.data;
            })
    }
}
