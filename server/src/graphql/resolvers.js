const { fileLoader, mergeResolvers } = require("merge-graphql-schemas");
const { join } = require("path");

const resolversArray = fileLoader(join(__dirname, "./resolvers"));

const resolvers = mergeResolvers(resolversArray);

module.exports = resolvers;
