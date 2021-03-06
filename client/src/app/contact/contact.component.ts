import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @Input() contact?: Contact;

  @HostBinding('class') columnClass = "four wide column";

  constructor() { }

  ngOnInit(): void {
  }

}
