import { windowWidth, windowHeight } from "../constants";
import { matrix, index, subset, multiply, subtract } from "mathjs";

export const getIdx = (mtx, idx) => subset(mtx, index(idx));

export const calculatePortalPosition = (store, coordinates) => {
	const c1 = subtract(
		multiply(matrix([coordinates.x1, coordinates.y1, 1]), store._tMatrix),
		store._camera
	);
	const c2 = subtract(
		multiply(matrix([coordinates.x2, coordinates.y2, 1]), store._tMatrix),
		store._camera
	);
	return {
		left: getIdx(c1, 0),
		top: getIdx(c1, 1),
		// width: coordinates.w*(windowWidth/store._camera.w),
		// height: coordinates.h*(windowHeight/store._camera.h),
		width: pointToWidthHeight(c1, c2).width,
		height: pointToWidthHeight(c1, c2).height,
		// width: coordinates.w*2,
		// height: coordinates.h*2,
	};
};

export const pointToWidthHeight = (c1, c2) => {
	const wh = subtract(c2,c1);
	return { width: getIdx(wh,0), height: getIdx(wh,1) };
};

export const isInsidePortal = () => {
	return false;
};
export const isOnPortalBorder = () => {
	return false;
};
export const isOnEmptySpace = () => {
	return true;
};
