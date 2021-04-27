import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser!: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.currentUser
      .pipe(map((user) => (this.currentUser = user)))
      .subscribe();
  }

  logout() {
    this.authService.logout();
  }
}
