import axios from "axios";

export default async function handler(req, res) {
  console.log({ query: req.query });
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyAQlXH_lfQPVBxaO5SEifHsSVQou9d_etY&input=${req.query.input}`
    );
    console.log({ response });
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
  res.status(500).end();
}
