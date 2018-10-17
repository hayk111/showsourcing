import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Router } from '@angular/router';
import { Attachment } from '~models';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

@Component({
  selector: 'proof-of-identity-app',
  templateUrl: './proof-of-identity.component.html',
  styleUrls: [
    './proof-of-identity.component.scss',
    './../common-boarding.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProofOfIdentityComponent extends TrackingComponent
  implements OnInit {
  public listFile: Attachment[] = [];

  /** hidden file input */
  @ViewChild('inpFile')
  inpFile: ElementRef;

  constructor(private router: Router) {
    super();
  }

  ngOnInit() {}

  previousPage() {
    this.router.navigate(['account-creation']);
  }

  nextPage() {
    this.router.navigate(['qrcode']);
  }

  onSubmit() {
    // stuff
    this.nextPage();
  }

  openFileBrowser() {
    this.inpFile.nativeElement.click();
  }

  async add(files: Array<File>) {
    console.log(files);
    if (files.length === 0) {
      return;
    }
    for (const file of files) {
      const attachment = new Attachment(file.name, file.size);
      this.listFile.push(attachment);
    }
    console.log(this.listFile);
  }
}
