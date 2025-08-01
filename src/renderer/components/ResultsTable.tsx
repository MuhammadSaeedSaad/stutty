import React from 'react';

export default function ResultsTable({
  fileName,
  numOfDs,
  numOfFs,
  fRatio,
  dRatio,
  fAvgTime,
  dAvgTime,
  recordingLength,
  efficientSpeechScore,
  inefficientSpeechScore,
  meanStutteringDuration,
  numberOfSylablesPerMinute,
  numberOfFSylablesPerMinute,
  numberOfDSylablesPerMinute,
}) {
  return (
    <table>
      <thead id="tableFirstHeader" />
      <tbody>
        <tr>
          <td>File name</td>
          <td id="fileName">{fileName}</td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {/* <tr>
          <td>Number of Ds</td>
          <td id="dNum">{numOfDs}</td>
        </tr>
        <tr>
          <td>Number of Fs</td>
          <td id="fNum">{numOfFs}</td>
        </tr> */}
        <tr>
          <td>Frequency of Stuttering</td>
          <td id="dRatio">{dRatio}</td>
        </tr>
        {/* <tr>
          <td>Percent. of Fs</td>
          <td id="fRatio">{fRatio}</td>
        </tr> */}
        <tr>
          {/* <td>Mean of 3 Maximum Ds (s)</td> */}
          <td>MDTLSS (s)</td>
          <td id="dAvgTime">{dAvgTime}</td>
        </tr>
        <tr>
          <td>Speech Rate (WPM)</td>
          <td id="sylMins">{numberOfSylablesPerMinute}</td>
        </tr>
        <tr>
          {/* <td>Number of dysfluent syllabes per minute</td> */}
          <td>Disfluent Speech Rate (DWPM)</td>
          <td id="dSylMins">{numberOfDSylablesPerMinute}</td>
        </tr>
        <tr>
          <td>Speech Efficiency Score (SES) %</td>
          <td id="efficientSpeechScore">{efficientSpeechScore}</td>
        </tr>
        {/* <tr> */}
        {/*   <td>Inefficient speech score (ISS) %</td> */}
        {/*   <td id="inefficientSpeechScore">{inefficientSpeechScore}</td> */}
        {/* </tr> */}
        <tr>
          <td>Mean stuttering duration (MSD) (s)</td>
          <td id="meanStutteringDuration">{meanStutteringDuration}</td>
        </tr>
        {/* <tr>
          <td>Mean of 3 Maximum Fs (s)</td>
          <td id="fAvgTime">{fAvgTime}</td>
        </tr> */}
        <tr>
          <td>Total Speech Time (T, s)</td>
          <td id="recordingLength">{recordingLength}</td>
        </tr>
        {/* <tr>
          <td>Number of fluent syllabes per minute</td>
          <td id="fSylMins">{numberOfFSylablesPerMinute}</td>
        </tr> */}
      </tbody>
    </table>
  );
}
