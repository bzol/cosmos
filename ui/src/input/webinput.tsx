import {
	windowWidth,
	windowHeight,
	isWeb,
	isIos,
	isAndroid,
} from "../common/constants";
import { cc } from '../common/utils';
// 1: left, 2: right, 3: left+right, 4: middle, 8/16: side buttons

const isDragPortal = (input) => false;

const isResizePortal = (input) => false;

export const handleWebInput =
	({
		_zoom,
		_pan,
		_mouseAction,
		_setMouseAction,
		_none,
		_currentDimension,
		_openSpellBook,
		_addPortal,
		_dragPortal,
		_changePortal,
		_finishChangePortal,
	}, portal) =>
	(input) => {
		let mouseAction = _mouseAction;
		if(input.type === 'keyup' && input.key === 'Shift') {
			eval("_finishChangePortal(input)(portal)");
		}
		else if(input.buttons === 3 )
			mouseAction = '_pan';
		else if(input.type === 'keyup' || input.altKey)
			mouseAction = '_openSpellBook';
		else if(input._reactName === 'onWheel' && !input.shiftKey)
			mouseAction = '_zoom';
		else if(input.shiftKey && portal !== null) {
			eval("_changePortal(input)(portal)");
		}

		eval(mouseAction + "(input)");
	};

export const handlePortalInput =
	({
		_dragPortal,
		_changePortal,
		_finishChangePortal,
		_mouseActionPortal,
		_noPortal
	}, portal) =>
		(input) => {
		let mouseAction = _mouseActionPortal;

		// _setMouseAction(mouseAction);
		eval(mouseAction + "(input)(portal)");
	};
