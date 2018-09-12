export abstract class TrackingComponent {
  public trackByFn(index, item) {
    return index;
  }

	public trackById = (index, item) => item.id;
}
