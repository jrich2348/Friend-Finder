var friends = require("../data/friends");

// ROUTING
module.exports = function(app) {
  // API GET Requests
  app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
  });

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API POST Requests

  app.post("/api/friends", function(req, res) {
    // loop through all of the options
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    var userData = req.body;
    var userScores = userData.scores;

    var totalDifference;

    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDifference = 0;

      console.log(currentFriend.name);

      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }

    // save the user's data to the database 
    friends.push(userData);

    // Return a JSON with the user's bestMatch. 
    res.json(bestMatch);
  });
};
