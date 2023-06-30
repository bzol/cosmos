export const expandComponent = (apis, Component) => {
	return { apis, component: () => Component };
}
