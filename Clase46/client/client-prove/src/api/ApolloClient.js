import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
    clientState: {
        defaults: {
            selectedId: null,
            previewId: null,
            selectedComplaintId: null,
        }, resolvers: {}
    }
});

export default client