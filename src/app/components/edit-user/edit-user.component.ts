import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserFacade } from 'src/app/store/users/user.facades';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {

  editUser: User | null = null;
  @Input('editUser') set setEditUser(user: User | null) {
    this.editUser = user;
    if (user) {
      this.editUserForm.get('regDate')?.setValue(user.regDate);
      this.editUserForm.get('fullName')?.setValue(user.fullName);
      this.editUserForm.get('job')?.setValue(user.job);
      this.editUserForm.get('login')?.setValue(user.login);
      this.editUserForm.get('password')?.setValue(user.password);
      this.editUserForm.get('phone')?.setValue(user.phone);
    }
  };

  @Output() saveEdit = new EventEmitter();

  editUserForm: FormGroup = {} as FormGroup;

  jobs$: Observable<string[]>;
  destroy$ = new Subject();
  showErrors = false;

  constructor(
    private fb: FormBuilder,
    private usersFacade: UserFacade,
  ){
    this.editUserForm = this.fb.group({
      regDate: ['', Validators.required],
      fullName: ['', Validators.required],
      job:['', Validators.required],
      login: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone:  ['', [Validators.required, Validators.minLength(11), Validators.maxLength(12)]],
    });
    this.editUserForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      if (this.editUserForm.valid) {
        this.showErrors = false;
      } else {
        this.showErrors = true;
      }
    });

    this.jobs$ = this.usersFacade.getAllUsers$().pipe(
      takeUntil(this.destroy$),
      map((res: User[]) => 
        res.map((elem: User) => elem.job).filter((value, index, self) => self.indexOf(value)===index))
    )
  }

  ngOnInit(): void {}

  required(controlName: string): boolean {
    const control = this.editUserForm.get(controlName) as FormControl;
    return control.hasValidator(Validators.required) && !control.disabled
  }

  showRequiredMsg(controlName: string): boolean {
    const control = this.editUserForm.get(controlName) as FormControl;
    return this.showErrors && control.errors && control.errors['required'];
  }

  onSubmit(): void {
    if (!this.editUserForm.valid) {
      this.showErrors = true;
      return;
    }
    const editedUser: User = {
      id: this.editUser?.id,
      ...this.editUserForm.value
    };
    this.usersFacade.editUser(editedUser);
    this.saveEdit.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
