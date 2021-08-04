import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });
  public registerInvalid: boolean;
  private formSubmitAttempt: boolean;

  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.registerInvalid = false;
    this.returnUrl = "";
    this.formSubmitAttempt = false;
  }

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';

    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });

  }

  async onSubmit() {
    this.registerInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        let username = this.form.get('username')?.value;
        let password = this.form.get('password')?.value;
        let email = this.form.get('email')?.value;
        
        console.log("Registration submitted!")
      } catch (err) {
        this.registerInvalid = true;
        console.log("something went wrong with registration!");
      }
    } else {
      this.formSubmitAttempt = true;
      console.log("Registration attempted!");
    }
  }
}
