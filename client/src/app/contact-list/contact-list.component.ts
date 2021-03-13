import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];

  constructor(public api: ApiService){
    this.contacts = [];
  }

  ngOnInit(): void {
    
    this.api.get<Contact[]>('contacts')
      .subscribe(data=>{
        this.contacts = data;
      });
  }
}
