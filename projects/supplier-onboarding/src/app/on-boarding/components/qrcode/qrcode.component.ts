import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractInput } from '~shared/inputs';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
	selector: 'qrcode-app',
	templateUrl: './qrcode.component.html',
	styleUrls: ['./qrcode.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QRCodeComponent implements OnInit {
	public form: FormGroup;

	public selectedValue: true;
	constructor(
    private router: Router,
		private fb: FormBuilder) {
      this.form = this.fb.group({
      });
    }

	ngOnInit() {
	}

	previousPage() {
		this.router.navigate(['proof-of-identity']);
	}

	nextPage() {
		this.router.navigate(['verification']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}
}
