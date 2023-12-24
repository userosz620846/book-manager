//https://viewbookservice-lwup2vslqa-uc.a.run.app
const express = require('express');
const axios = require('axios');

const app = express();

const API_KEY = process.env.API_KEY || 'r6JH5nEqPkcIyA5Ci4hDDXaqnBEVwa6zWs3trEDZiReVXYBwkcwAwHh3p7Yu7OPD';
const MONGODB_DOMAIN = process.env.MONGODB_DOMAIN || 'https://europe-west1.gcp.realm.mongodb.com/api/client/v2.0/app/bookshelf-enhmm/graphql';

app.get('/', async (req, res) => {
  try {
    const access_token = await getToken();
    const graphql_url = `${MONGODB_DOMAIN.replace("/graphql", "")}/graphql`;
    const auth_response = await axios.post(graphql_url, {
      query: `query {
        bookShelfCS {
          Authoer
          BookId
          BookName
          NumberOfPages
        }
      }`
    }, {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    console.log(JSON.stringify(auth_response.data));
    res.status(200).json(auth_response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getToken() {
  try {
    if (API_KEY === '' || MONGODB_DOMAIN === '') {
      throw 'API key or MongoDB domain is empty';
    }
    const auth_url = `${MONGODB_DOMAIN.replace("/graphql", "")}/auth/providers/api-key/login`;
    const { data } = await axios.post(auth_url, { 'key': API_KEY }, { headers: { "content-type": "application/json" } });
    console.log(JSON.stringify({ MongoUserId: data.user_id }));
    return data.access_token;
  } catch (error) {
    throw error;
  }
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
