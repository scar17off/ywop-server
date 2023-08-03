const CryptedJSONdb = require("../../CryptedJSONdb.js");
const worldData = new CryptedJSONdb("./worlds/worlddata.json", process.env.databaseKey)

worldData.setPlaceBucket = (world, p, s) => {
	worldData.setValue(p, world, "pixelbucket", "p");
	worldData.setValue(s, world, "pixelbucket", "s");
};
worldData.getPlaceBucket = (world) => {
	return { p: worldData.getValue(world, "pixelbucket", "p"), s: worldData.getValue(world, "pixelbucket", "s") };
};

module.exports = worldData;