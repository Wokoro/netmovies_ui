import { Component, OnInit } from '@angular/core';
import { faHome as sHome } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope as sEnvelop } from '@fortawesome/free-solid-svg-icons';
import { faPhone as sPhone } from '@fortawesome/free-solid-svg-icons';
import { faPrint as sPrint } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  home = sHome;
  envelop = sEnvelop;
  print = sPrint;
  phone = sPhone;
  constructor() { }

  ngOnInit() {
  }

}
