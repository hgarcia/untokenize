var should = require("should");
var untokenize = require('../index');

describe('untokenize', function() {

  describe('.create', function () {

    it('should create a new untokenize', function () {
      var s = untokenize.create();
      s.should.have.property('render');
    });

    it('should change the token delimiters', function () {
      var s = untokenize.create({startToken: "<%", endToken: "%>"});
      var result = s.render("With <%0%>", ["other tokens"]);
      result.should.equal("With other tokens");
    });
  });

  describe('.render("str", {value: })', function () {

    var s = untokenize.create();

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


  describe('.render("str", {value: {another: } })', function () {

    var s = untokenize.create();

    it('should interpolate the nested value', function () {
      var result = s.render("String with {{token.message}}", {token: {message: "a nested message"}});
      result.should.equal("String with a nested message");
    });

    it('should replace all occurrences', function () {
      var result = s.render("String {{token.message}} with {{token.message}}", {token: {message: "a nested message"}});
      result.should.equal("String a nested message with a nested message");
    });
  });

  describe('.render("str", [values])', function () {

    var s = untokenize.create();

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