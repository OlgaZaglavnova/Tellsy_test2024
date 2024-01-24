import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, takeUntil} from 'rxjs/operators';
import { Filter } from 'src/app/models/filter.model';
import { User } from 'src/app/models/user.model';
import { FilterFacade } from 'src/app/store/filter/filter.facades';
import { UserFacade } from 'src/app/store/users/user.facades';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  users$: Observable<User[]>
  selectedUsers: User[] = [];
  editUser: User | null = null;
  showAddDialog = false;
  showEditDialog = false;
  isLoading = false;
  destroy$ = new Subject();

  constructor(
    private usersFacade: UserFacade,
    private filterFacade: FilterFacade
  ) {
    this.users$ = combineLatest([
      this.usersFacade.getAllUsers$(),
      this.filterFacade.getFilter$()
    ]).pipe(
      map(([users, filter]) => {
        return this.applyFilter(users, filter);
      })
    );
  }

  ngOnInit(): void {
    this.users$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(usersRes => {
      this.users = usersRes ? [...usersRes] : [];
    });
  }

  applyFilter(users: User[], filter: Filter | null): User[] {
    // По оператору OR - если совпадает хотя бы одно поле, считаем подходит
    if (!filter || Object.keys(filter).length <= 0) {
      return users;
    }
    return users.filter((user: User) => {
      for (let [filterKey, filterValue] of Object.entries(filter)) {
        if (user[filterKey as keyof User]?.toLowerCase().includes(filterValue.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

  onAddBtnClick(): void {
    this.showAddDialog = true;
  }

  onAddClicked(): void {
    this.showAddDialog = false;
  }

  onDelBtnClick(): void {
    this.usersFacade.deleteUsers(this.selectedUsers);
    this.selectedUsers = [];
  }

  onEditClick(user: User): void {
    this.editUser = user;
    this.showEditDialog = true;
  }

  onSaveEdit(): void {
    this.showEditDialog = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

}
