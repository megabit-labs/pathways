import { gql } from '@apollo/client'

const UPDATE_STEP = gql`
    mutation($id: String!, $title: String, $content: String) {
        createUpdateContent(id: $id, title: $title, content: $content) {
            status
            message
        }
    }
`

export default UPDATE_STEP