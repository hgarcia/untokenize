var should = require("should");
var substitute = require('../index');

describe('substitute', function() {

  describe('.create', function () {

    it('should create a new substitute', function () {
      var s = substitute.create();
      s.should.have.property('render');
    });

    it('should change the token delimiters', function () {
      var s = substitute.create({startToken: "<%", endToken: "%>"});
      var result = s.render("With <%0%>", ["other tokens"]);
      result.should.equal("With other tokens");
    });
  });

  describe('.render("str", {value: })', function () {

    var s = substitute.create();

    it('should interpolate the value', function () {
      var result = s.render("String with {{token}}", {token: "a token"});
      result.should.equal("String with a token");
    });

    it('should replace all occurrences', function () {
      var result = s.render("String {{token}} with {{token}}", {token: "a token"});
      result.should.equal("String a token with a token");
    });

    it("should replace more than one value", function () {
      var result = s.render("{{obj}} with {{token}}", {token: "a token", obj: "The string"});
      result.should.equal("The string with a token");
    });
  });

  describe('.render("str", [values])', function () {

    var s = substitute.create();

    it('should interpolate values per index', function () {
      var result = s.render("String with {{0}}", ["a token"]);
      result.should.equal("String with a token");
    });

    it('should replace all occurrences', function () {
      var result = s.render("String {{0}} with {{0}}", ["a token"]);
      result.should.equal("String a token with a token");
    });

    it("should replace more than one value", function () {
      var result = s.render("{{1}} with {{0}} in {{1}}", ["a token", "The string"]);
      result.should.equal("The string with a token in The string");
    });
  });

});