import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Job } from '../models/jobs.model';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public users: User[] = [
    {
      id: '1',
      regDate: '01.11.2020',
      fullName: 'Петров Петр Петрович',
      job: Job.EXTERNAL_EXPERT,
      login: 'petrt@mail.ru',
      password: '123',
      phone: '+79281111111'
    },
    {
      id: '2',
      regDate: '01.11.2020',
      fullName: 'Сергеев Сергей Сергеевич',
      job: Job.HR_BP,
      login: 'serii@mail.ru',
      password: '123',
      phone: '+79282222222'
    }
  ];
  constructor() { }

  public getUsers$(): Observable<User[]> {
    return of(this.users).pipe(delay(1000));
  }
}
