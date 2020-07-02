const { Octokit } = require("@octokit/rest");

const owner = "twitu";
const repo = "test";
const commiter_name = "";
const commiter_email = "";
const oauth_token = "";

const octokit = new Octokit({ auth: oauth_token });

// create a blob
async function uploadBlob({ content }) {
  octokit.git
    .createBlob({
      owner,
      repo,
      content,
      encoding: "utf-8|base64",
    })
    .then(({ data }) => {
      console.log("blob sha: ", data["sha"]);
      return data["sha"];
    })
    .catch((err) => {
      console.log("Failed to make blob");
      throw err;
    });
}

// make a commit
async function makeCommit({
  blob_sha,
  file_name,
  commit_message,
  author_name,
  author_email,
}) {
  let ref_sha, tree_sha, new_tree_sha, new_commit_sha;

  // get reference to head commit in master
  octokit.git
    .getRef({
      owner,
      repo,
      ref: "heads/master",
    })

    // get current current commit and tree data
    .then(
      ({ data }) => {
        ref_sha = data["object"]["sha"];
        console.log("ref sha: ", ref_sha);

        return octokit.git.getCommit({
          owner,
          repo,
          commit_sha: ref_sha,
        });
      },
      (err) => {
        console.log("Failed to get ref for heads/master");
        throw err;
      }
    )

    // create new working tree from previous
    .then(
      ({ data }) => {
        tree_sha = data["tree"]["sha"];
        console.log("tree sha: ", tree_sha);

        return octokit.git.createTree({
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
      },
      (err) => {
        console.log("Failed to create new working tree");
        throw err;
      }
    )

    // create a commit with new tree
    .then(
      ({ data }) => {
        new_tree_sha = data["sha"];
        console.log("new tree sha: ", new_tree_sha);

        const timestamp = new Date().toISOString();
        return octokit.git.createCommit({
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
      },
      (err) => {
        console.log("Failed to create new working tree");
        throw err;
      }
    )

    // update master head to point to new commit
    .then(
      ({ data }) => {
        new_commit_sha = data["sha"];
        console.log("Successful: ", data["sha"]);

        // update branch reference to new tree
        return octokit.git.updateRef({
          owner,
          repo,
          ref: "heads/master",
          sha: new_commit_sha,
        });
      },
      (err) => {
        console.log("Failed to commit");
        throw err;
      }
    )

    // succesfully completed content sync with github repo
    .then(
      ({ data }) => {
        console.log("Successful updated reference: ", data["ref"]);
      },
      (err) => {
        console.log("Failed to update HEAD");
        throw err;
      }
    );
}

async function githubCommit({
  file_name,
  commit_message,
  content,
  author_name,
  author_email,
}) {
  uploadBlob({ content })
    .then(
      (blob_sha) => {
        return makeCommit({ blob_sha, file_name, commit_message, author_name, author_email });
      },
      (err) => {
        console.log(err);
        console.log("Blob upload failed, go figure");
      }
    )
    .then(
      () => {
        console.log("Successfully commited content, let's oxidise the world");
      },
      (err) => {
        console.log(err);
        console.log("Content commit failed, I'll hang up my cape and cowl");
      }
    );
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
  slugifyTitle,
};
