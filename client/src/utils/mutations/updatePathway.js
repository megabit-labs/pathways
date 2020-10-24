import { gql } from '@apollo/client'

export const CREATE_UPDATE_PATHWAY = gql`
mutation ($id: String!, $name: String!, $steps: [StepPayload]!, $tags: [String], $description: String!) {
    createUpdatePathway (
        id: $id,
        name: $name,
        steps: $steps,
        tags: $tags,
        description: $description
    ) {
        status,
        message
    }
}
`;