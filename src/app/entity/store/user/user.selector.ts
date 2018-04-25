import { createSelector } from '@ngrx/store';


export const selectUser = state => state.entities.user;



export const selectUserTeamId = createSelector([selectUser], user => user.currentTeamId);

// export const selectUser = pipe(
// 	select((state: any) => state.entities.user),
// 	distinctUntilChanged(),
// 	filter((user: User) => !!user.id)
// );

// export const selectUserTeamId = pipe(selectUser, map((user) => user.currentTeamId));
