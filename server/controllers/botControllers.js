const model = require("../AI/google");

const chatBot = async (req, res) => {
    const {prompt} = req.body;

try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    const text = result.response.text();

    return res.status(200).json(text);
} catch (error) {
    console.log("Error while geanrating Prompt", error);
    return res.status(500).json("Error from AI Model");
}
    
};

module.exports = { chatBot };