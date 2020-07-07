const { Octokit } = require("@octokit/rest");

const owner = "";
const repo = "";
const commiter_name = "";
const commiter_email = "";
const oauth_token = "";

const octokit = new Octokit({ auth: oauth_token });

async function githubCommit({ title, content, author_name, author_email }) {
  // upload blob
  try {
    var {
      data: { sha: blob_sha },
    } = await octokit.git.createBlob({
      owner,
      repo,
      content,
      encoding: "utf-8|base64",
    });

    console.log(`Uploaded blob with sha ${blob_sha}`);
  } catch (err) {
    console.log("Failed to make blob");
    throw err;
  }

  // get reference to head commit in master
  try {
    var {
      data: { object: {sha: ref_sha} },
    } = await octokit.git.getRef({
      owner,
      repo,
      ref: "heads/master",
    });

    console.log(`Got commit reference ${ref_sha}`);
  } catch (err) {
    console.log("Failed to get ref for heads/master");
    throw err;
  }

  // get current current commit and tree data
  try {
    var {
      data: {
        tree: { sha: tree_sha },
      },
    } = await octokit.git.getCommit({
      owner,
      repo,
      commit_sha: ref_sha,
    })

    console.log(`Get current tree ${tree_sha}`);
  } catch (err) {
    console.log("Failed to get current commit and tree data");
    throw err;
  }

  // create new working tree from previous
  try {
    var file_name = slugifyTitle(title);
    var {
      data: { sha: new_tree_sha },
    } = await octokit.git.createTree({
      owner,
      repo,
      base_tree: tree_sha,
      tree: [
        {
          path: file_name,
          mode: "100644",
          type: "blob",
          sha: blob_sha,
        },
      ],
    });

    console.log(`Create new tree ${new_tree_sha}`);
  } catch (err) {
    console.log("Failed to create new working tree");
    throw err;
  }

  // create a commit with new tree
  try {
    const commit_message = `Improve contents of ${file_name}`;
    const timestamp = new Date().toISOString();
    var {
      data: { sha: new_commit_sha },
    } = await octokit.git.createCommit({
      owner,
      repo,
      tree: new_tree_sha,
      parents: [ref_sha],
      message: commit_message,
      author: {
        name: author_name,
        email: author_email,
        date: timestamp,
      },
      committer: {
        name: commiter_name,
        email: commiter_email,
        date: timestamp,
      },
    });

    console.log(`Create new commit ${new_commit_sha}`);
  } catch (err) {
    console.log("Failed make new commit");
    throw err;
  }

  // update branch reference to new tree
  try {
    var {
      data: { ref: new_ref },
    } = await octokit.git.updateRef({
      owner,
      repo,
      ref: "heads/master",
      sha: new_commit_sha,
    });

    console.log(`Update reference to master branch`);
  } catch (err) {
    console.log("Failed to update master branch");
    throw err;
  }
}

// slugify title to get file name
function slugifyTitle(title) {
  return title
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

module.exports = {
  githubCommit,
};
