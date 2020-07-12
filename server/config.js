// Github Oauth. 
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "8b508ba452a263f604b4"
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "16ef48033babee3d5325c03c50389ec8eed087a7"

// Github owner and repo for pathway contents
const GITHUB_OWNER = process.env.GITHUB_OWNER || "megabit-labs"
const GITHUB_REPO = process.env.GITHUB_REPO || "pathway-content"
const COMMITTER_NAME = process.env.COMMITTER_NAME || "Pathway Bot"
const COMMITTER_EMAIL = process.env.COMMITTER_EMAIL || "bot@pathway.tech"
const OAUTH_TOKEN = process.env.OAUTH_TOKEN || ""

// Neo4j
const NEO4J_CONNECTION_URI =
    process.env.NEO4J_CONNECTION_URI || "bolt://localhost:7687"
const NEO4J_USER = process.env.NEO4J_USER || "neo4j"
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || "hedonhermdev"

const NEO4J_SEARCH_INDEX =
    process.env.NEO4J_SEARCH_INDEX || "PathwaysAndContents"

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "lolmao12345"

const HOST = process.env.HOST || "0.0.0.0"
const PORT = Number(process.env.PORT) || 3003

module.exports = {
    GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    GITHUB_OWNER,
    GITHUB_REPO,
    COMMITTER_NAME,
    COMMITTER_EMAIL,
    OAUTH_TOKEN,
    NEO4J_CONNECTION_URI,
    NEO4J_SEARCH_INDEX,
    NEO4J_USER,
    NEO4J_PASSWORD,
    JWT_SECRET,
    HOST,
    PORT,
}
