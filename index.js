import express from "express";
import bodyParser from "body-parser";
import Sentiment from "sentiment";

const app = express();
const port = 3002;
const sentiment = new Sentiment();

app.use(express.json());

app.post("/analyze", (req, res) => {
  const { text } = req.body;
  console.log(text);
  // this will be article.descrption or article.content

  if (!text) {
    return res.status(400).json({ error: "Text is required." });
  }

  // analyze the text
  const result = sentiment.analyze(text);
  console.log(result);
  const response = {
    sentiment:
      result.score > 0 ? "positive" : result.score < 0 ? "negative" : "neutral",
    score: result.score,
    comparative: result.comparative,
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Sentiment analysis service listening on port ${port}`);
});
