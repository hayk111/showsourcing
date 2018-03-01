
// Icons should be imported individually to keep bundle size down
import * as faHeart from '@fortawesome/fontawesome-free-solid/faHeart';
import * as faCheckSquare from '@fortawesome/fontawesome-free-solid/faCheckSquare';
import * as faComment from '@fortawesome/fontawesome-free-solid/faComment';
import * as faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import * as faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import * as faCheckCircle from '@fortawesome/fontawesome-free-solid/faCheckCircle';
import * as faCircle from '@fortawesome/fontawesome-free-solid/faCircle';
import * as faTag from '@fortawesome/fontawesome-free-solid/faTag';
import * as faBolt from '@fortawesome/fontawesome-free-solid/faBolt';
import * as faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp';
import * as faBell from '@fortawesome/fontawesome-free-solid/faBell';
import * as faSortDown from '@fortawesome/fontawesome-free-solid/faSortDown';
import * as faShare from '@fortawesome/fontawesome-free-solid/faShare';
import * as faEllipsisH from '@fortawesome/fontawesome-free-solid/faEllipsisH';
import * as faEllipsisV from '@fortawesome/fontawesome-free-solid/faEllipsisV';
import * as faFire from '@fortawesome/fontawesome-free-solid/faFire';
import * as faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt';
import * as faAngleRight from '@fortawesome/fontawesome-free-solid/faAngleRight';
import * as faAngleLeft from '@fortawesome/fontawesome-free-solid/faAngleLeft';
import * as faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import * as faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import * as faInfoCircle from '@fortawesome/fontawesome-free-solid/faInfoCircle';
import * as faQuestionCircle from '@fortawesome/fontawesome-free-solid/faQuestionCircle';
import * as faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimesCircle';
import * as faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt';
import * as faThumbsDown from '@fortawesome/fontawesome-free-solid/faThumbsDown';
import * as faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import * as faFolder from '@fortawesome/fontawesome-free-solid/faFolder';
import * as faExternalLinkAlt from '@fortawesome/fontawesome-free-solid/faExternalLinkAlt';
import * as faChartBar from '@fortawesome/fontawesome-free-solid/faChartBar';
import * as faFilter from '@fortawesome/fontawesome-free-solid/faFilter';
import * as fontawesome from '@fortawesome/fontawesome';

fontawesome.config.searchPseudoElements = false;
fontawesome.config.observeMutations = false;
export const faIcons = [	faAngleRight,
	faAngleLeft,
	faPencilAlt,
	faShare,
	faEllipsisH,
	faEllipsisV,
	faFire,
	faHeart,
	faCheckSquare,
	faComment,
	faSearch,
	faCheckCircle,
	faCircle,
	faTag,
	faBolt,
	faThumbsUp,
	faThumbsDown,
	faBell,
	faSortDown,
	faInfoCircle,
	faQuestionCircle,
	faTimesCircle,
	faTrashAlt,
	faTimes,
	faFolder,
	faExternalLinkAlt,
	faChartBar,
	faCheck,
	faAngleUp,
	faAngleDown,
	faFilter
];

faIcons.forEach(ic => fontawesome.library.add(ic));
