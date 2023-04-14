export const C1 = (props) => {
	return <h1 style={styles}>{props.attr1}</h1>;
};

// have mobile specific components that behave differently to their desktop equivalent? or have the same component but the engine managing the components are different? or both?

// all components should still be able to respond well to any size allocated for them -- is this feasible? can I make this look good?

// you are building a forest of react components
// imbue should be curried?
//
// We should have typescript and have interfaces for bundles and components to specify which ones can be combined

export const C1_i1 = imbue(C1, style1, {
	attr1: s_dashboard_data1 + "_hello",
	attr2: p_dashboard_action1,
});

const style1 = () => {};
const style2 = () => {};
const defaultStyle = () => {};

const styles = [defaultStyle, style1, style2];

// a composite component should have the same style available across all levels of the tree to enable that style for the composite component.
