const request = require("request");
const core = require("@actions/core");
const github = require("@actions/github");

const url = "https://libraryofbabel.info/search.cgi";

async function run() {
  try {
    // setup github stuff
    const token = process.env.GITHUB_TOKEN;

    const context = github.context;
    if (context.payload.pull_request == null) {
      core.setFailed("No pull request found.");
      return;
    }

    const pull_request_number = context.payload.pull_request.number;

    const client = new github.GitHub(token);

    // get bable prophecy

    const url = await getBabel(client, context.payload.pull_request.diff_url);
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function getBabel(diff) {
  return request.get(diff, function (e, r, b) {
    if (e || !r || r.statusCode >= 400)
      core.setFailed(
        "The Library of Babel is busy at the moment! Please look around the gift shop for a bit."
      );
    const data = {
      find: b,
      btnSubmit: "Search",
      method: "x",
    };
    return request.post(
      { url: url, formData: data },
      function (err, res, body) {
        if (err || !res || res.statusCode >= 400)
          core.setFailed(
            "The Library of Babel is busy at the moment! Please look around the gift shop for a bit."
          );
        var data = body
          .split(
            `<a class = "intext" style = "cursor:pointer" title = "" onclick = "postform('`
          )[1]
          .split(`)">`)[0]
          .replace(/'/g, "")
          .split(",");
        const hex = data[0];
        const wall = data[1];
        const shelf = data[2];
        const volume = data[3];
        const page = data[4];
        var url =
          "https://libraryofbabel.info/book.cgi?" +
          hex +
          "-w" +
          wall +
          "-s" +
          shelf +
          "-v" +
          volume +
          ":" +
          page;

        // post content! :)
        client.issues.createComment({
          ...context.repo,
          issue_number: pull_request_number,
          body: "hey! check out " + url,
        });
      }
    );
  });
}

run();
