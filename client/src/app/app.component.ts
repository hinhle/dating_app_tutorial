import { Component } from '@angular/core';
import { AccountService } from './_services/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(private accountService: AccountService) {}
  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user = localStorage.getItem('user') as string;
    this.accountService.setCurrentUser(JSON.parse(user));
  }
}
