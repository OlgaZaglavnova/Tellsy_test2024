import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  items: MenuItem[] = [
    {label: 'О платформе'},
    {label: 'Загрузка пользователей'},
    {label: 'Список пользователей', routerLink: ['/main']}
  ];
  activeItem: MenuItem = this.items[2];
}
