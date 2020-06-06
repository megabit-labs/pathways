// Github Oauth. 
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "Insert Client ID Here "
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "Insert Client Secret Here"

// Neo4j 
const NEO4J_USER = process.env.NEO4J_USER || "neo4j"
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || "lolmao12345"

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'lolmao12345'

const HOST = process.env.HOST || '0.0.0.0'
const PORT = Number(process.env.PORT) || 3003

module.exports = {
    GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    NEO4J_USER,
    NEO4J_PASSWORD,
    JWT_SECRET,
    HOST,
    PORT,
}
