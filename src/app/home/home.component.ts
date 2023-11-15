import { Component } from '@angular/core';
import { RecordService } from '../record.service'
import { Record } from '../Record';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  allRecords: Record[];
  records: Record[];
  searchText: string;
  sortBy: string;
  updatedAt: string;

  constructor(private recordService: RecordService) { }

  ngOnInit() {
    this.updatedAt = new Date().toLocaleString();
    this.sortBy = 'name'
    this.allRecords = [];
    this.records = this.allRecords;
    this.fetchRecords({});
  }

  fetchRecords(params: any) {
    const queryParams = new HttpParams({fromObject: params}).toString()
    this.recordService.get(queryParams).subscribe((data: any) => {
      this.updatedAt = new Date(data.data.timestamp).toLocaleString();
      this.allRecords = data.data.balances;
      this.records = this.allRecords;
    });
  }

  onSearchTextChange() {
    this.records = this.allRecords.filter(record =>
      record.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      record.contact.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.onSortByChange();
  }

  onSortByChange() {
    this.records.sort((a: Record, b: Record) => {
      if (this.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (this.sortBy === 'area') {
        return a.area.localeCompare(b.area);
      } else if (this.sortBy === 'balance') {
        return b.balance - a.balance;
      }
      return 0;
    });
  }
}
