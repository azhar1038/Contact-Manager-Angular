import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];

  constructor(public http: HttpClient){
    this.contacts = [];
  }

  ngOnInit(): void {
    
    this.http.get<Contact[]>('/api/contacts')
      .subscribe(data=>{
        this.contacts = data;
      });
  }
}
