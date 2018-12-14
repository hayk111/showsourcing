

// Icons should be imported individually to keep bundle size down
import * as faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import * as faAngleLeft from '@fortawesome/fontawesome-free-solid/faAngleLeft';
import * as faAngleRight from '@fortawesome/fontawesome-free-solid/faAngleRight';
import * as faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import * as faArrowCircleDown from '@fortawesome/fontawesome-free-solid/faArrowCircleDown';
import * as faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft';
import * as faArrowRight from '@fortawesome/fontawesome-free-solid/faArrowRight';
import * as faBell from '@fortawesome/fontawesome-free-regular/faBell';
import * as faBolt from '@fortawesome/fontawesome-free-solid/faBolt';
import * as faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown';
import * as faCaretLeft from '@fortawesome/fontawesome-free-solid/faCaretLeft';
import * as faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight';
import * as faChartBar from '@fortawesome/fontawesome-free-solid/faChartBar';
import * as faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import * as faCheckCircle from '@fortawesome/fontawesome-free-solid/faCheckCircle';
import * as faCheckSquare from '@fortawesome/fontawesome-free-solid/faCheckSquare';
import * as faCircle from '@fortawesome/fontawesome-free-solid/faCircle';
import * as faCog from '@fortawesome/fontawesome-free-solid/faCog';
import * as faComment from '@fortawesome/fontawesome-free-solid/faComment';
import * as faEdit from '@fortawesome/fontawesome-free-solid/faEdit';
import * as faEllipsisH from '@fortawesome/fontawesome-free-solid/faEllipsisH';
import * as faEllipsisV from '@fortawesome/fontawesome-free-solid/faEllipsisV';
import * as faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import * as faExternalLinkAlt from '@fortawesome/fontawesome-free-solid/faExternalLinkAlt';
import * as faFilter from '@fortawesome/fontawesome-free-solid/faFilter';
import * as faFire from '@fortawesome/fontawesome-free-solid/faFire';
import * as faFolder from '@fortawesome/fontawesome-free-solid/faFolder';
import * as faGlobe from '@fortawesome/fontawesome-free-solid/faGlobe';
import * as faHeart from '@fortawesome/fontawesome-free-solid/faHeart';
import * as faInfoCircle from '@fortawesome/fontawesome-free-solid/faInfoCircle';
import * as faMapMarkerAlt from '@fortawesome/fontawesome-free-solid/faMapMarkerAlt';
import * as faMinus from '@fortawesome/fontawesome-free-solid/faMinus';
import * as faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt';
import * as faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import * as faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import * as faQuestion from '@fortawesome/fontawesome-free-solid/faQuestion';
import * as faQuestionCircle from '@fortawesome/fontawesome-free-solid/faQuestionCircle';
import * as faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import * as faShare from '@fortawesome/fontawesome-free-solid/faShare';
import * as faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import * as faSortDown from '@fortawesome/fontawesome-free-solid/faSortDown';
import * as faSortUp from '@fortawesome/fontawesome-free-solid/faSortUp';
import * as faTag from '@fortawesome/fontawesome-free-solid/faTag';
import * as faThumbsDown from '@fortawesome/fontawesome-free-solid/faThumbsDown';
import * as faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp';
import * as faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import * as faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimesCircle';
import * as faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt';
import * as fontawesome from '@fortawesome/fontawesome';
// TODO observa mutation should not be needed
fontawesome.config.searchPseudoElements = false;
fontawesome.config.observeMutations = true;

export const faIconsRegular = [
	faBell
];

export const faIconsSolid = [
	faAngleDown,
	faAngleLeft,
	faAngleRight,
	faAngleUp,
	faArrowCircleDown,
	faArrowLeft,
	faArrowRight,
	faBolt,
	faCaretDown,
	faCaretLeft,
	faCaretRight,
	faChartBar,
	faCheck,
	faCheckCircle,
	faCheckSquare,
	faCircle,
	faCog,
	faComment,
	faEdit,
	faEllipsisH,
	faEllipsisV,
	faEnvelope,
	faExternalLinkAlt,
	faFilter,
	faFire,
	faFolder,
	faGlobe,
	faHeart,
	faInfoCircle,
	faMapMarkerAlt,
	faMinus,
	faPencilAlt,
	faPhone,
	faPlus,
	faQuestion,
	faQuestionCircle,
	faSearch,
	faShare,
	faSignOutAlt,
	faSortDown,
	faSortUp,
	faTag,
	faThumbsDown,
	faThumbsUp,
	faTimes,
	faTimesCircle,
	faTrashAlt,
	faTrashAlt,
];

faIconsSolid.forEach(ic => fontawesome.library.add(ic));
faIconsRegular.forEach(ic => fontawesome.library.add(ic));
