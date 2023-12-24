// curl -m 70 -X POST https://us-central1-bookshelfmanager-406704.cloudfunctions.net/DeleteBook \
// -H "Authorization: bearer $(gcloud auth print-identity-token)" \
// -H "Content-Type: application/json" \
// -d '{}'
const axios = require('axios');
const cors = require('cors')({origin: true});

const API_KEY = process.env.API_KEY || 'r6JH5nEqPkcIyA5Ci4hDDXaqnBEVwa6zWs3trEDZiReVXYBwkcwAwHh3p7Yu7OPD';
const MONGODB_DOMAIN = process.env.MONGODB_DOMAIN || 'https://europe-west1.gcp.realm.mongodb.com/api/client/v2.0/app/bookshelf-enhmm/graphql';

exports.init = async (req, res) => {
  cors(req, res, async () => {
    try {
      const access_token = await getToken();

      const graphql_url = `${MONGODB_DOMAIN.replace("/graphql", "")}/graphql`;

      const auth_response = await axios({
        url: graphql_url,
        method: 'post',
        headers: { Authorization: `Bearer ${access_token}` },
        data: {
          query:`mutation {
            deleteOneBookShelfC(query: { BookId: "${req.body.BookId}" }) {
              Authoer
              BookId
              BookName
              NumberOfPages
            }
          }`
        }
      });

      console.log(JSON.stringify(auth_response.data));
      res.status(200).json(auth_response.data);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  });
};

async function getToken() {
  try {
    if (API_KEY === '' || MONGODB_DOMAIN === '') {
      throw 'API key or MongoDB domain cannot be empty';
    }

    const auth_url = `${MONGODB_DOMAIN.replace("/graphql", "")}/auth/providers/api-key/login`;

    const {data} = await axios.post(auth_url,{
      headers: {"content-type": "application/json"},
      'key': API_KEY
    });

    console.log(JSON.stringify({ MongoUserId: data.user_id }));
    return data.access_token;
  } catch (error) {
    throw error;
  }
}

