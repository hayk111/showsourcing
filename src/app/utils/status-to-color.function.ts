


export function statusToColor(status: string) {
	switch (status) {
		case 'inProgress':
		case '_inProgress':
			return 'primary';
		case 'validated':
		case '_validated':
			return 'success';
		case 'refused':
		case '_refused':
			return 'warn';
	}
}

