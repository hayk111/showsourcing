import { TestPageModule } from './test-page.module';

describe('TestPageModule', () => {
  let testPageModule: TestPageModule;

  beforeEach(() => {
    testPageModule = new TestPageModule();
  });

  it('should create an instance', () => {
    expect(testPageModule).toBeTruthy();
  });
});
