import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Contact } from '../models/contact';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  loading: boolean = false;
  newContact: Contact|null = null;

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.loading = true;
    const formValues = Object.assign({}, form.value);
    const contact: Contact = {
      name: `${formValues.firstName} ${formValues.lastName}`,
      address: formValues.address,
      phone: `${formValues.areaCode} ${formValues.prefix}-${formValues.lineNumber}`,
      photoUrl: formValues.photo,
    };

    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');

    this.http.post<Contact>('/api/contacts', contact, {headers: header})
      .subscribe(data=>{
        form.reset();
        this.loading = false;
        console.log(data);
        this.newContact = data;
      });
  }

}
