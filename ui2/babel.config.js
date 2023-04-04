module.exports = function(api) {
  api.cache(true);
	console.log(api);
  return {
		// plugins: ['../xy_'],
    // presets: ['babel-preset-react-native'],
    presets: ['babel-preset-expo'],
  };
};
