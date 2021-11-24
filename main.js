const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    const token = core.getInput("GITHUB_TOKEN", { required: true });

    const context = github.context;
    if (context.payload.pull_request == null) {
      core.setFailed("No pull request found.");
      return;
    }

    const pull_request_number = context.payload.pull_request.number;

    const client = new github.GitHub(token);

    const new_comment = client.issues.createComment({
      ...context.repo,
      issue_number: pull_request_number,
      body: "hey!",
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

