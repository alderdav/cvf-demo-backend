var xml2js = require('xml2js');

var parser = new xml2js.Parser({"cdata":true});
var fs = require("fs");

class XMLUtils {
    getQueryFromXML(xmlPath, queryId, callback)
    {
        var content = fs.readFileSync(xmlPath);
        parser.parseString(content, function(err, result){
            if(err)
            {
                callback("Error while parsing query from xml => " + xmlPath + ". Error => " + err);
            }
            else
            {
                var queries = result["sql-requests"]["sql-request"];

                queries.forEach(query => {
                    if(query.$.id == queryId)
                    {
                        callback(null, query._.trim());
                    }
                })
            }
        })
    }
}
module.exports = XMLUtils;