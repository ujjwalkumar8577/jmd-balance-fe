import { Component, Input } from '@angular/core';
import { Record } from '../Record';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {
  @Input() record: Record;
  @Input() index: number;
  
  constructor() { }
}
