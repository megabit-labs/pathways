
function matchParams(where) {
    var params = [];
    Object.keys(where).forEach( function(key) {
        var str = "`" + key + "`: " + JSON.stringify( where[key] );
        params.push( str );
    });
        return params.join(", ")
}

module.exports = {
    matchParams
}
