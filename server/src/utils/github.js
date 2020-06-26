const { Octokit } = require("@octokit/rest");

async function gitCommit() {

    const owner = "";
    const repo = "";
    const author_name = "";
    const author_email = ""
    const commiter_name = ""
    const commiter_email = ""
    const oauth_token = ""

    const octokit= new Octokit({
        auth: oauth_token
    });

    let ref_sha, tree_sha, blob_sha, new_tree_sha, new_commit_sha;

    // get reference to head
    await octokit.git.getRef({
        owner,
        repo,
        ref: "heads/master"
    }).then(({data}) => {
        ref_sha = data['object']['sha'];
        console.log("ref sha: ", ref_sha)
    })

    // get reference to tree
    await octokit.git.getCommit({
        owner,
        repo,
        commit_sha: ref_sha
    }).then(({data}) => {
        tree_sha = data['tree']['sha']
        console.log("tree sha: ", tree_sha)
    })

    // create a blob
    await octokit.git.createBlob({
        owner,
        repo,
        content: "Blah and \n more blah",
        encoding: "utf-8|base64"
    }).then(({data}) => {
        blob_sha = data['sha']
        console.log("blob sha: ", blob_sha)
    })

    // create new tree (relative to base) with blob
    await octokit.git.createTree({
        owner,
        repo,
        base_tree: tree_sha,
        tree: [
            {
                path: "blah.md",
                mode: "100644",
                type: "blob",
                sha: blob_sha
            }
        ]
    }).then(({data}) => {
        new_tree_sha = data['sha']
        console.log("new tree sha: ", new_tree_sha)
    })

    // create a commit with new tree
    const timestamp = new Date().toISOString();
    await octokit.git.createCommit({
        owner,
        repo,
        tree: new_tree_sha,
        parents: [ref_sha],
        message: "Add file blah.md",
        author: {
            name: author_name,
            email: author_email,
            date: timestamp,
        },
        committer: {
            name: commiter_name,
            email: commiter_email,
            date: timestamp,
        }
    }).then(({data}) => {
        new_commit_sha = data['sha']
        console.log("Successful: ", data['sha'])
    })

    // update branch reference to new tree
    await octokit.git.updateRef({
        owner,
        repo,
        ref: "heads/master",
        sha: new_commit_sha,
    }).then(({data}) => {
        console.log("Successful updated reference: ", data['ref'])
    })

    return
}

module.exports = {
    gitCommit
}
