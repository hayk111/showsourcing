export abstract class BaseComponent {
  public trackByFn(index, item) {
    return index;
  }

	public trackById = (index, item) => item.id;
}
