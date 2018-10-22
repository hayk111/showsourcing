import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
  ElementRef
} from '@angular/core';

import { Router } from '@angular/router';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
import { OnBoardingService } from '../../services';
import { Attachment, SupplierClaim } from '~models';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';

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
	supplierClaim: SupplierClaim;

  /** hidden file input */
  @ViewChild('inpFile')
  inpFile: ElementRef;

  constructor(
    private router: Router,
    private onBoardSrv: OnBoardingService,
    private dlgSrv: DialogService,
    private cdr: ChangeDetectorRef
    ) {
    super();

    // TODO REMOVE FIXED DATA
    // this.listFile = [
    //   new Attachment('file 1', 15464),
    //   new Attachment('file 2', 534873),
    //   new Attachment('file 3', 654564),
    //   new Attachment('file 4', 131321),
    //   new Attachment('file 5', 85454)
    // ];
  }

  ngOnInit() {
    this.supplierClaim = this.onBoardSrv.getClaim();
    this.listFile = this.supplierClaim.attachment || [];
  }

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
    // this.listFile = this.listFile.filter(x => x !== file); 
		console.log(this.dlgSrv),
		console.log(ConfirmDialogComponent),
    this.dlgSrv.open(ConfirmDialogComponent, {
			text: 'Remove 1 file ?',
			callback: () => this.onBoardSrv.updateClaim({attachment: this.listFile}).subscribe()
		});
  }

  getAttachmentFromFile(file: File): Attachment {
    return new Attachment(file.name, file.size);
  }
  add(files: Array<File>) {
    if (files.length === 0) {
      return;
    }
    this.pendingFiles = [...this.pendingFiles, ...files];
    this.onBoardSrv.uploadFiles(files).subscribe(filesUploaded => {
      this.listFile.push(...filesUploaded);
      this.pendingFiles.length = 0;
      this.cdr.detectChanges();
      this.onBoardSrv.updateClaim({attachment: this.listFile}).subscribe();
    });
  }
}
