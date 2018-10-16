import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "business-type-app",
  templateUrl: "./business-type.component.html",
  styleUrls: [
    "./business-type.component.scss",
    "./../common-boarding.component.scss"
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessTypeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  previousPage() {
    this.router.navigate(["address"]);
  }

  nextPage() {
    this.router.navigate(["category"]);
  }

  onSubmit() {
    // stuff
    this.nextPage();
  }
}
