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
import { OnBoardingService } from '../../services';

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
  public pendingFiles: File[] = [];

  /** hidden file input */
  @ViewChild('inpFile')
  inpFile: ElementRef;

  constructor(
    private router: Router,
		private onBoardSrv: OnBoardingService
  ) {
    super();

    // TODO REMOVE FIXED DATA
    this.listFile = [
      new Attachment('file 1', 15464),
      new Attachment('file 2', 534873),
      new Attachment('file 3', 654564),
      new Attachment('file 4', 131321),
      new Attachment('file 5', 85454),
    ]
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

  public onDelete(file: Attachment) {
    this.listFile = this.listFile.filter(x => x !== file);
  }

  getAttachmentFromFile(file: File): Attachment {
    return new Attachment(file.name, file.size);
  }
  async add(files: Array<File>) {
    if (files.length === 0) {
      return;
    }
    this.pendingFiles = [...this.pendingFiles, ...files];
    this.onBoardSrv.uploadFiles(files).subscribe(x =>
       {
         console.log(x);
       });
    // for (const file of files) {
    //   const attachment = new Attachment(file.name, file.size);
    //   this.listFile.push(attachment);
    // }
  }
}
