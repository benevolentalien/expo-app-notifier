
import type { CodegenConfig } from '@graphql-codegen/cli';
import { schema } from './graphql.config.js';

const config: CodegenConfig = {
  overwrite: true,
  schema,
  documents: "src/**/*.{graphql,tsx, ts}",
  generates: {
    "src/graphql/__generated__/index.ts": {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true
      }
    }
  } 
};

export default config;
