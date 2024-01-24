import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserFacade } from 'src/app/store/users/user.facades';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {

  @Output() onAddClicked = new EventEmitter<User>();

  addUserForm: FormGroup = {} as FormGroup;
  showErrors = false;

  jobs$: Observable<string[]>;
  destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private usersFacade: UserFacade,
  ) {
    this.jobs$ = this.usersFacade.getAllUsers$().pipe(
      takeUntil(this.destroy$),
      map((res: User[]) => 
        res.map((elem: User) => elem.job).filter((value, index, self) => self.indexOf(value)===index))
    );
  }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      regDate: ['', Validators.required],
      fullName: ['', Validators.required],
      job:['', Validators.required],
      login: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone:  ['', [Validators.required, Validators.minLength(11), Validators.maxLength(12)]],
    });
    this.addUserForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      if (this.addUserForm.valid) {
        this.showErrors = false;
      } else {
        this.showErrors = true;
      }
    });
  }

  required(controlName: string): boolean {
    const control = this.addUserForm.get(controlName) as FormControl;
    return control.hasValidator(Validators.required) && !control.disabled
  }

  showRequiredMsg(controlName: string): boolean {
    const control = this.addUserForm.get(controlName) as FormControl;
    return this.showErrors && control.errors && control.errors['required'];
  }

  onSubmit(): void {
    if (!this.addUserForm.valid) {
      this.showErrors = true;
      return;
    }
    const newRegDate = this.addUserForm.get('regDate')?.value;
    const newUser: User = {
      regDate: newRegDate ? this.datePipe.transform(newRegDate, 'dd.MM.yyyy') ?? '' : '',
      fullName: this.addUserForm.get('fullName')?.value,
      job: this.addUserForm.get('job')?.value,
      login: this.addUserForm.get('login')?.value,
      password: this.addUserForm.get('password')?.value,
      phone: this.addUserForm.get('phone')?.value,
    };
    this.usersFacade.addUser(newUser);
    this.addUserForm.reset();
    this.onAddClicked.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
