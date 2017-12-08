import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComment } from '../../store/model/comment.model';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { FileUploader2 } from '../uploader/services/file-uploader2.service';
import { entityRepresentationMap } from '../../store/model/filter.model';

@Injectable()
export class ProductService {

	constructor(private http: HttpClient, private uploader: FileUploader2) { }

	sendPatchRequest(p: { id: string, propName: string, value: any }) {
		return this.http.patch(`api/product/${p.id}`, { [p.propName]: p.value});
	}

	deepLoad(id: string) {
		return forkJoin([
			this.sendImgReq(id),
			this.sendAttachmentReq(id),
			this.sendCommentReq(id),
			this.sendVoteReq(id),
			this.sendTagReq(id)
		]);
	}

	sendImgReq(id: string) {
		return this.http.get(`api/product/${id}/image`).map(images => ({images}) );
	}

	sendAttachmentReq(id: string) {
		return this.http.get(`api/product/${id}/attachment`).map(attachments => ({attachments}) );
	}

	sendCommentReq(id: string) {
		return this.http.get(`api/product/${id}/comment`).map(comments => ({ comments }) );
	}

	sendVoteReq(id: string) {
		return this.http.get(`api/product/${id}/vote`).map(votes => ({ votes }));
	}

	sendTagReq(id: string) {
		return this.http.get(`api/product/${id}/tag`).map(tags => ({ tags }) );
	}

	postVote(v: { productId: string, value: number }) {
		return this.http.post(`api/product/${v.productId}/vote`, { value : v.value});
	}

	postComment(comment: AppComment) {
		return this.http.post(`api/product/${comment.productId}/comment`, { text: comment.text });
	}

	postImage(productId, img: any) {
		return this.uploader.uploadImage(img, productId, entityRepresentationMap.product);
	}
}
