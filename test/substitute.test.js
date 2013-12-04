var should = require("should");
var substitute = require('../index');

describe('substitute', function() {

  describe('.render("str", {value: })', function () {
    it('should interpolate the value', function () {
      var result = substitute.render("String with {{token}}", {token: "a token"});
      result.should.equal("String with a token");
    });

    it('should replace all occurrences', function () {
      var result = substitute.render("String {{token}} with {{token}}", {token: "a token"});
      result.should.equal("String a token with a token");
    });

    it("should replace more than one value", function () {
      var result = substitute.render("{{obj}} with {{token}}", {token: "a token", obj: "The string"});
      result.should.equal("The string with a token");
    });
  });

  describe('.render("str", [values])', function () {
    it('should interpolate values per index', function () {
      var result = substitute.render("String with {{0}}", ["a token"]);
      result.should.equal("String with a token");
    });

    it('should replace all occurrences', function () {
      var result = substitute.render("String {{0}} with {{0}}", ["a token"]);
      result.should.equal("String a token with a token");
    });

    it("should replace more than one value", function () {
      var result = substitute.render("{{1}} with {{0}} in {{1}}", ["a token", "The string"]);
      result.should.equal("The string with a token in The string");
    });
  });

});