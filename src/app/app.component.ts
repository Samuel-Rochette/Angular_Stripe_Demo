import { Component } from "@angular/core";
import { FormControl, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  customForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: "pk_test_aos8Hb9bRHO6zriz071XhMNv",
      locale: "auto",
      token: function(token: any) {
        console.log(token.id);
      }
    });

    handler.open({
      name: "Demo Site",
      description: "2 widgets",
      amount: 2000
    });
  }

  createForm() {
    this.customForm = this.fb.group({
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: ""
    });
  }

  onSubmit() {
    (<any>window).Stripe.card.createToken(
      {
        number: this.customForm.value.cardNumber,
        exp_month: this.customForm.value.expiryMonth,
        exp_year: this.customForm.value.expiryYear,
        cvc: this.customForm.value.cvc
      },
      (status: number, response: any) => {
        if (status === 200) {
          console.log(`Success! Card token ${response.card.id}.`);
        } else {
          console.log(response.error.message);
        }
      }
    );
  }
}
