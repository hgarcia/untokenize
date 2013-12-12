untokenize
==========

A super simple template for node, to use in simple apps and libraries

### Changelog

0.2.0 - Incorporate deep replacement for objects (or understanding dot notation)
0.1.0 - Initial release, simple replacement of prop in objects or values passed as arrays

### Purpose

This is a very simple library to use in libraries and small application that don't need a full fledge template system.

If you are planning to build large documents with it, you are out of luck. For those cases use some of the existing templating systems in node. eg: ejs, jade, mustache.

This library is mostly to template short strings or small paragraphs.

### Install

`npm install untokenize`


### Usage

Create a untokenize calling create.


    var untokenize = require('untokenize').create();


Replace tokens in code given values as an object literal (or hash) where the tokens in the string are the properties (keys) in the object.


    untokenize.render("The fox jumped over the {{barrier}}", {barrier: "fence"});
    //The fox jumped over the fence.


You can also use positional tokens and use an array to pass the values.


    untokenize.render("The {{1}} jumped over the {{0}}", ["fence", "fox"]);
    //The fox jumped over the fence.


Or nested objects (as of 0.2.0)


    untokenize.render("The fox jumped over the {{barrier.type}}", {barrier: {type: "fence"}});
    //The fox jumped over the fence.


Replaces are globals so you can use the token or position multiple times in the string and all occurrences will be replaced.

### Customizations

There is only one customization, but should be used with care. You can replace the token delimiters when creating a new untokenize.

Be careful, some characters may not work well as delimiters, so try and test before settling on a new set.


    var untokenize = require('untokenize').create({startToken: '<%', endToken: '%>'});
    untokenize.render("Using the new <%name%>", {name: "tokens"});
    //Using the new tokens

