const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const models = require("../../models/index");
const UserType = require("./user_type");
const User = mongoose.model("user");
const RouteType = require("./route_type");
const Route = mongoose.model("route");

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return User.find({});
            }
        },
        user: {
            type: UserType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return User.findById(args._id);
            }
        },
        routes: {
            type: new GraphQLList(RouteType),
            resolve() {
                return Route.find({});
            }
        },
        route: {
            type: RouteType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return Route.findById(args._id);
            }
        }
    })
});

module.exports = RootQueryType;