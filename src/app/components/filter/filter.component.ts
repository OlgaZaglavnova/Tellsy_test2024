import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Filter } from 'src/app/models/filter.model';
import { User } from 'src/app/models/user.model';
import { FilterFacade } from 'src/app/store/filter/filter.facades';
import { UserFacade } from 'src/app/store/users/user.facades';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filterForm: FormGroup = {} as FormGroup;

  users$: Observable<User[]>;
  ids$: Observable<string[]>;
  fullNames$: Observable<string[]>;
  jobs$: Observable<string[]>;
  logins$: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private usersFacade: UserFacade,
    private filterFacade: FilterFacade
  ) {
    this.users$ = this.usersFacade.getAllUsers$();
    this.ids$ = this.users$.pipe(
      map((res: User[]) => {
        const ids: (string | undefined)[] = res.map(elem => elem.id).filter((value, index, self) => self.indexOf(value)===index);
        // почему-то .filter(id => !!id) к данному массиву не сработал
        const filteredIds: string[] = [];
        for(let id of ids) {
          if (id) {
            filteredIds.push(id);
          }
        }
        return filteredIds;
      })
    );
    this.fullNames$ = this.users$.pipe(
      map((res: User[]) => 
        res.map(elem => elem.fullName).filter((value, index, self) => self.indexOf(value)===index)
      )
    );
    this.jobs$ = this.users$.pipe(
      map((res: User[]) => 
        res.map(elem => elem.job).filter((value, index, self) => self.indexOf(value)===index)
      )
    );
    this.logins$ = this.users$.pipe(
      map((res: User[]) => 
        res.map(elem => elem.login).filter((value, index, self) => self.indexOf(value)===index)
      )
    );
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      id: [''],
      fullName: [''],
      job: [''],
      login: ['']
    })
  }

  onSubmit(): void {
    const fId = this.filterForm.get('id')?.value;
    const fFullName = this.filterForm.get('fullName')?.value;
    const fJob = this.filterForm.get('job')?.value;
    const fLogin = this.filterForm.get('login')?.value;
    let newFilter: Filter | null = null;
    if (fId || fFullName || fJob || fLogin) {
      newFilter  = {};
      if (fId) { 
        newFilter.id = fId;
      }
      if (fFullName) { 
        newFilter.fullName = fFullName;
      }
      if (fJob) { 
        newFilter.job = fJob;
      }
      if (fLogin) { 
        newFilter.login = fLogin;
      }
    }
    this.filterFacade.setFilter(newFilter);
  }
}
