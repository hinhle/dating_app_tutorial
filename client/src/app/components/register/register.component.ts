import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from 'src/app/_services/account/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<boolean>();

  model: any = {};
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe();
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
