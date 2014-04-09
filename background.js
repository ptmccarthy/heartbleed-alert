// on navigation events, submit the domain to Filippo's heartbleed vulnerability tester
chrome.webNavigation.onCommitted.addListener(function(details) {
  var domain = details.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];  
  var response = $.getJSON("http://bleed-1161785939.us-east-1.elb.amazonaws.com/bleed/"+domain, function(response) {

  evaluateResult(response, domain);

  });
});

function evaluateResult(result, domain) {
  if (result.code == 0) {
    console.log(domain + " is vulnerable!");
    alert("The page at " + domain + " is vulnerable to the Heartbleed OpenSSL exploit.");
  }
  else if (result.code == 1) {
    console.log(domain + " is safe.");
  }
  else {
    console.log("An error occurred checking " + domain);
    console.log(result.error);
  }
}
