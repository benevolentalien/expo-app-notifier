const schema = true ? "http://localhost:8080/graphql/schema.graphql" : "https://cool-field-4473.fly.dev/graphql/schema.graphql"

module.exports = {
  schema,
  documents: "'src/**/*.{graphql,js,ts,jsx,tsx}'"
}
