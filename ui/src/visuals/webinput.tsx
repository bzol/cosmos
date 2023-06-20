import {
	windowWidth,
	windowHeight,
	isWeb,
	isIos,
	isAndroid,
	drawerPullZone,
} from "../constants";
import { cc } from '../utils';
// 1: left, 2: right, 3: left+right, 4: middle, 8/16: side buttons
export const handleWebInput =
	({
		_moveScreensBegin,
		_moveScreens,
		_moveScreensEnd,
		_zoom,
		_pan,
		_focusOnPortal,
		_screenLine,
		_mouseAction,
		_setMouseAction,
		_none,
		_currentDashboard,
		_addNewPortal,
		_changePortal,
		_portal
	}) =>
	(input) => {
		// console.log(_mouseAction);
		let mouseAction = _mouseAction;
		// console.log(input);
		if(input.buttons === 3 || input.buttons === 4)
			mouseAction = '_pan';
		else if(input._reactName === 'onWheel')
			mouseAction = '_zoom';
		else if(input.shiftKey && input.buttons === 1)
			mouseAction = '_portal';
		else
			mouseAction = '_none';

		_setMouseAction(mouseAction);
		cc(mouseAction, 'mouseAction');
		eval(mouseAction + "(input)");
	};

// export const webInputStore
