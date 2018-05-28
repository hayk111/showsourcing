import gql from 'graphql-tag';

export class FilterDataQueries {
    static suppliers = gql`
        subscription suppliers {
            suppliers {
                id,
                name
            }
        }`;

    // event
    static events = gql`
        subscription events {
            events {
                id,
                name
            }
        }`;

    // category
    static categories = gql`
        subscription categories {
            categories {
                id,
                name
            }
        }`;

    // tag
    static tags = gql`
        subscription tags {
            tags {
                id,
                name
            }
        }`;

    // project
    static projects = gql`
        subscription projects {
            projects {
                id,
                name
            }
        }`;

    // created by
    static createdBy = gql`
        subscription suppliers {
            suppliers {
                id,
                name
            }
        }`;

    // status
    static statuses = gql`
    subscription statuses {
        statuses {
                id,
                name
            }
        }`;
        
    // favorite
}
