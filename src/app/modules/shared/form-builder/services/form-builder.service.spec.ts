import { TestBed, inject } from '@angular/core/testing';

import { FormBuilderService } from './form-builder.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { FormControlDescriptor } from '../interfaces/form-control-descriptor.interface';

describe('FormBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilderService]
    });
  });

  it('should be created', inject([FormBuilderService], (service: FormBuilderService) => {
    expect(service).toBeTruthy();
  }));

  describe('FormBuilderService.toFormControl()', () => {

    it('Should create a formControl', inject([FormBuilderService], (service: FormBuilderService) => {
      // jasmine won't make 2 FormControl equal (not strict equal) to each other because jasmine 
      // doesn't account for functions equaling eachother
      // so we will have to delete the function _onCollectionChange for those to be equal
      const desc = {};
      const f1 = new FormControl('');
      const f2 = service.toFormControl(desc);
      expect(f1).not.toEqual(f2);
      delete (f1 as any)._onCollectionChange;
      delete (f2 as any)._onCollectionChange;
      expect(f1).toEqual(f2);
    }));
    
    it('Should have values populated', inject([FormBuilderService], (service: FormBuilderService) => {
      expect(service.toFormControl({ value: 'x' }).value).toEqual('x');
    }));

    it('Should have default value empty string', inject([FormBuilderService], (service: FormBuilderService) => {
      expect(service.toFormControl({}).value).toEqual('');
    }));

    it('Should create validators', inject([FormBuilderService], (service: FormBuilderService) => {
      let desc: FormControlDescriptor = { required: true};
      const fc = service.toFormControl(desc);
      expect(typeof fc.validator).toEqual('function');
      fc.patchValue('');
      expect(fc.valid).toEqual(false);
      
    }));

  });

  describe('FormBuilderService.toFormGroup()', () => {
    it('Should create formGroup', inject([FormBuilderService], (service: FormBuilderService) => {
      const group = service.toFormGroup({});
      const group2 = new FormGroup({});
      delete (group as any)._onCollectionChange;
      delete (group2 as any)._onCollectionChange;
      expect(group).toEqual(group2);
    }));

    it('Should contain formControl', inject([FormBuilderService], (service: FormBuilderService) => {
      const desc = { name: { value: 'cedric', required: true } }
      const group = service.toFormGroup(desc);
      expect(group.controls.name.value).toEqual('cedric');
    }));

  });
});
