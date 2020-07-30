import { Image } from 'showsourcing-api-lib';
import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({ name: 'firstImage' })
export class FirstImage implements PipeTransform {
	transform(images: Image[]): any {
		return _.minBy(images, (img: Image) => new Date(img.createdAt));
	}
}
