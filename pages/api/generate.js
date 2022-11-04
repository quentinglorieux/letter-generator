import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    //model: "text-ada-001",
    prompt: generatePrompt(req.body.student),
    temperature: 0.7,
    max_tokens: 1000,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  
   res.status(200).json({ result: completion.data.choices[0].text });



}

function generatePrompt(student) {
  // const studentSkills= student.studentSkills;
  const capitalizedStudent =
  student.studentName[0].toUpperCase() + student.studentName.slice(1).toLowerCase();
  return `Write a very long recommendation letter from ${student.myName} for the program ${student.programName} for student based on these notes:

  Name: ${student.studentName}
  Skills: ${student.studentSkills}
  Affiliation: ${student.studentAffiliation}
  Duration: ${student.studentDuration}

  Signature: ${student.myName}
  
  Letter:`;
}




