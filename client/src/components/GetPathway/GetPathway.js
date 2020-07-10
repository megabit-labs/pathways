import React from 'react'
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Pathway from '../../containers/Pathway/Pathway';

const GetPathway = props => {

    const GET_PATHWAY = gql`
        query {
            Pathway(id: "React") {
                id
                name
                steps {
                id
                name
                }
            }
        }
    `
    return (
        <Query query={GET_PATHWAY}>
            {({ loading, error, data }) => {
                if (loading) return <div>Loading</div>;
                if (error) return `Error! ${error.message}`;
                else {
                    console.log(data);
                    return <Pathway pathway={data.Pathway[0]} />
                }
            }}
        </Query>
    );
}

export default GetPathway;