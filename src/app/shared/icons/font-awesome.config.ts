

// Icons should be imported individually to keep bundle size down
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons/faArrowCircleDown';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';
import { faBolt } from '@fortawesome/free-solid-svg-icons/faBolt';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons/faCaretLeft';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';
import { faChartBar } from '@fortawesome/free-solid-svg-icons/faChartBar';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons/faCheckSquare';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { faFire } from '@fortawesome/free-solid-svg-icons/faFire';
import { faFolder } from '@fortawesome/free-solid-svg-icons/faFolder';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faShare } from '@fortawesome/free-solid-svg-icons/faShare';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';
import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp';
import { faTag } from '@fortawesome/free-solid-svg-icons/faTag';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons/faThumbsDown';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons/faThumbsUp';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt';

import { library, dom } from '@fortawesome/fontawesome-svg-core';


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

faIconsSolid.forEach(ic => library.add(ic));
faIconsRegular.forEach(ic => library.add(ic));

dom.watch();
