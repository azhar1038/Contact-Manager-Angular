import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  loading: boolean = false;
  newContact: Contact|null = null;

  constructor(public api: ApiService) { }

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

    this.api.post<Contact>('contacts', contact)
      .subscribe(data=>{
        form.reset();
        this.loading = false;
        console.log(data);
        this.newContact = data;
      });
  }

}
