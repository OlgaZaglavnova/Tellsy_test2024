import { Component, OnInit } from '@angular/core';
import { UserFacade } from 'src/app/store/users/user.facades';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private usersFacade: UserFacade,
  ) {}

  ngOnInit(): void {
    this.usersFacade.loadUsers();
  }

}
