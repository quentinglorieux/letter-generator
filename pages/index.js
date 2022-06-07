import Head from "next/head";
import { useState, CSSProperties } from "react";
import styles from "./index.module.css";
import React from 'react';
import DotLoader from "react-spinners/DotLoader";



  

export default function Home() {
  const [studentName, setStudentInput] = useState("");
  const [studentSkills, setStudentInput2] = useState("");
  const [result, setResult] = useState("");
  const [studentAffiliation, setStudentInput4] = useState("");
  const [programName, setStudentInput3] = useState("");
  const [myName, setStudentInput5]  = useState("");
  const [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#123123");


  
  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setResult();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student: {studentName, studentSkills, studentAffiliation, programName, myName} }),
    });

    const data = await response.json();
    setResult(data.result);
    setLoading(false);
  }


  
  return (
    <div>
      <Head>
        <title>OpenAI Generate Letter</title>
        
      </Head>


      <div className={styles.city}>
        <h3>Letter Generator</h3> 
      </div>

     
      <main className={styles.main}>
        
        <form onSubmit={onSubmit}>
          Name: <input
            type="text"
            name="studentname"
            placeholder="Name of the student"
            value={studentName}
            onChange={(e) => setStudentInput(e.target.value)}
          />
          Program Name: <input
            type="text"
            name="programName"
            placeholder="Program Name"
            value={programName}
            onChange={(e) => setStudentInput3(e.target.value)}
          />
          Affiliation: <input
            type="text"
            name="studentAffiliation"
            placeholder="Affiliation"
            value={studentAffiliation}
            onChange={(e) => setStudentInput4(e.target.value)}
          />
          Skills: <textarea
            name="studentskills"
            placeholder="Skills of the student"
            value={studentSkills}
            onChange={(e) => setStudentInput2(e.target.value)}
          />
          Your Name: <input
            type="text"
            name="myName"
            placeholder="Your Name"
            value={myName}
            onChange={(e) => setStudentInput5(e.target.value)}
          />
          <input type="submit" value="Generate Letter" />
        </form>
        

<div className={styles.loader}> <DotLoader
        color={color}
        loading={loading}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
        color="#10a37f"
      />
      </div>


    <div className={styles.result}>    {result}</div>

      </main>

      </div>
  );
}
