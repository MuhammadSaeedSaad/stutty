import { round } from 'mathjs';

export type chartData = {
  labels: number[];
  datasets: {}[];
};

export type TableData = {
  fileName: string | undefined;
  numOfFs: number;
  numOfDs: number;
  fRatio: number;
  dRatio: number;
  fAvgTime: number;
  dAvgTime: number;
  recordingLength: number;
  efficientSpeechScore: number;
  inefficientSpeechScore: number;
  meanStutteringDuration: number;
  numberOfSylablesPerMinute: number;
  numberOfFSylablesPerMinute: number;
  numberOfDSylablesPerMinute: number;
};

export interface Results {
  tableData: TableData;
  chartsData: {
    fluentData: chartData;
    dysFluentData: chartData;
  };
}

export interface MinSheetResults {
  dRatio: number;
  dAvgTime: number;
}

export interface TotalResults {
  first: {
    all: Results;
    min: MinSheetResults;
  };
  second: {
    all: Results;
    min: MinSheetResults;
  };
}

// const readingRangesSet = {
//   descriptingRange: [
//     { min: 1, max: 1, score: 2 },
//     { min: 2, max: 3, score: 3 },
//     { min: 4, max: 4, score: 4 },
//     { min: 5, max: 6, score: 5 },
//     { min: 7, max: 9, score: 6 },
//     { min: 10, max: 14, score: 7 },
//     { min: 15, max: 28, score: 8 },
//     { min: 29, max: 100, score: 9 },
//   ],
//   readingRange: [
//     { min: 1, max: 1, score: 2 },
//     { min: 2, max: 3, score: 4 },
//     { min: 4, max: 5, score: 5 },
//     { min: 6, max: 9, score: 6 },
//     { min: 10, max: 16, score: 7 },
//     { min: 17, max: 26, score: 8 },
//     { min: 27, max: 100, score: 9 },
//   ],
// };

// const generalRanges = [
//   { min: 1, max: 1, score: 2 },
//   { min: 2, max: 3, score: 4 },
//   { min: 4, max: 4, score: 6 },
//   { min: 5, max: 6, score: 10 },
//   { min: 7, max: 9, score: 12 },
//   { min: 10, max: 14, score: 14 },
//   { min: 15, max: 28, score: 16 },
//   { min: 29, max: 100, score: 18 },
// ];

// const durationRanges = [
//   { min: 0, max: 0.25, score: 1 },
//   { min: 0.25, max: 0.75, score: 2 },
//   { min: 0.75, max: 1.5, score: 3 },
//   { min: 1.5, max: 9.5, score: 4 },
//   { min: 9.5, max: 30.5, score: 5 },
//   { min: 30.5, max: 60.5, score: 6 },
//   { min: 60.5, max: 100, score: 7 },
// ];

// const severityRanges = [
//   { min: 0, max: 10, label: 'very simple' },
//   { min: 11, max: 12, label: 'simple' },
//   { min: 13, max: 16, label: 'mild' },
//   { min: 17, max: 18, label: 'severe' },
//   { min: 19, max: 25, label: 'very severe' },
// ];

// function loadCsvData() {
//   try {
//     const data: any[] = [];
//     window.electron.loadCsv();

//     // Do something with the data

//     return data;
//   } catch (error) {
//     console.error('Error loading CSV data:', error);
//     throw new Error('Error happend in loading the csv ranges');
//   }
// }

function getRanges(csvData: any[]) {
  // const csvData = loadCsvData();
  const readingDescriptionRange: { min: number; max: number; score: number }[] =
    [];

  const readingReadingRange: { min: number; max: number; score: number }[] = [];
  const noReadingDescriptionRange: {
    min: number;
    max: number;
    score: number;
  }[] = [];

  const durationRange: { min: number; max: number; score: number }[] = [];
  const severityRange: { min: number; max: number; label: string }[] = [];

  let rDRCount = 0;
  let rRRCount = 0;
  let noRDRCount = 0;
  let durationCount = 0;
  let severityCount = 0;
  for (let i = 0; i < csvData.length; i += 1) {
    if (i >= 3 && i <= 10) {
      readingDescriptionRange[rDRCount] = {
        min: +csvData[i][0],
        max: +csvData[i][1],
        score: +csvData[i][2],
      };
      rDRCount += 1;
    }

    if (i >= 13 && i <= 19) {
      readingReadingRange[rRRCount] = {
        min: +csvData[i][0],
        max: +csvData[i][1],
        score: +csvData[i][2],
      };
      rRRCount += 1;
    }

    if (i >= 23 && i <= 30) {
      noReadingDescriptionRange[noRDRCount] = {
        min: +csvData[i][0],
        max: +csvData[i][1],
        score: +csvData[i][2],
      };
      noRDRCount += 1;
    }

    if (i >= 34 && i <= 40) {
      durationRange[durationCount] = {
        min: +csvData[i][0],
        max: +csvData[i][1],
        score: +csvData[i][2],
      };
      durationCount += 1;
    }

    if (i >= 44 && i <= 48) {
      severityRange[severityCount] = {
        min: +csvData[i][0],
        max: +csvData[i][1],
        label: csvData[i][2],
      };
      severityCount += 1;
    }
  }

  return {
    readingDescriptionRange,
    readingReadingRange,
    noReadingDescriptionRange,
    durationRange,
    severityRange,
  };
}

function getScore(value: number, ranges: any[]): number {
  const range = ranges.find((r) => value >= r.min && value <= r.max);
  return range ? range.score : 0;
}

export function getSeverity(totalScore: number, csvData: any[]): string {
  const { severityRange } = getRanges(csvData);
  const range = severityRange.find(
    (r) => totalScore >= r.min && totalScore <= r.max,
  );
  return range ? range.label : 'out of range';
}

export function calculateTotalScore(
  results: TotalResults,
  csvData: any[],
): number {
  const {
    readingDescriptionRange,
    readingReadingRange,
    noReadingDescriptionRange,
    durationRange,
  } = getRanges(csvData);
  console.log('readingDescriptionRange', readingDescriptionRange);
  console.log('readingReadingRange', readingReadingRange);
  console.log('noReadingDescriptionRange', noReadingDescriptionRange);
  console.log('durationRange', durationRange);

  let dRatioScore: number;
  const dAvgTimeScore: number = getScore(
    results.first.min.dAvgTime,
    durationRange,
  );
  let totalScore;

  if (results.second?.min.dRatio) {
    dRatioScore = getScore(results.first.min.dRatio, readingDescriptionRange);
    dRatioScore += getScore(results.second.min.dRatio, readingReadingRange);
    totalScore = dRatioScore + dAvgTimeScore;
    return totalScore;
  }

  dRatioScore = getScore(results.first.min.dRatio, noReadingDescriptionRange);
  totalScore = dRatioScore + dAvgTimeScore;
  return totalScore;
}

export function parseCSV(csvData: string): [number, string][] {
  const lines = csvData.split('\r\n');
  const dataArray: [number, string][] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const cells = lines[i].split(',');
    // if x is string +x is a number
    dataArray.push([+cells[0], cells[1]]);
  }

  return dataArray;
}

export function splitDsFs(dataArray: [number, string][]) {
  const Ds: { data: number[]; labels: string[]; occurrence: number[] } = {
    data: [],
    labels: [],
    occurrence: [],
  };
  const Fs: { data: number[]; labels: string[]; occurrence: number[] } = {
    data: [],
    labels: [],
    occurrence: [],
  };

  for (let i = 0; i < dataArray.length; i += 2) {
    if (i !== dataArray.length - 1) {
      if (dataArray[i][1] === 'D') {
        //  Ds.data.push(dataArray[i + 1][0] - dataArray[i][0]);
        // why we are rounding them
        Ds.data.push(
          round((dataArray[i + 1][0] - dataArray[i][0]) * 100) / 100,
        );
        Ds.labels.push(dataArray[i][1]);
      }

      if (dataArray[i][1] === 'F') {
        Fs.data.push(
          Math.round((dataArray[i + 1][0] - dataArray[i][0]) * 100) / 100,
        );
        Fs.labels.push(dataArray[i][1]);
      }
    }
  }
  Ds.data.sort();
  Fs.data.sort();
  // Ds.data.map((interval, key) => {
  //   let occuerance = 1;
  //   while (Ds.data[key + occuerance] === interval) {
  //     occuerance++;
  //   }
  //   console.log("element: " + interval + " occurence: " + occuerance);
  //   return [interval, occuerance];
  // });
  for (let i = 0; i < Ds.data.length; i++) {
    let occurrence = 1;
    const movingIndex = 1;
    while (Ds.data[i + movingIndex] === Ds.data[i]) {
      Ds.data.splice(i, 1);
      occurrence++;
    }
    Ds.occurrence[i] = occurrence;
  }

  for (let i = 0; i < Fs.data.length; i++) {
    let occurrence = 1;
    const movingIndex = 1;
    while (Fs.data[i + movingIndex] === Fs.data[i]) {
      Fs.data.splice(i, 1);
      occurrence++;
    }
    Fs.occurrence[i] = occurrence;
    // Ds.data[i] = [Ds.data[i], occuerance];
  }
  return { Ds, Fs };
}

export function getNumsAndRatios(dsAndFs: {
  Ds: {
    data: number[];
    labels: string[];
    occurrence: number[];
  };
  Fs: {
    data: number[];
    labels: string[];
    occurrence: number[];
  };
}) {
  const numOfDs = dsAndFs.Ds.labels.length;
  const numOfFs = dsAndFs.Fs.labels.length;
  let dRatio = (numOfDs * 100) / (numOfDs + numOfFs);
  let fRatio = (numOfFs * 100) / (numOfDs + numOfFs);
  dRatio = Math.round(dRatio * 100) / 100;
  fRatio = Math.floor(fRatio * 100) / 100;

  const dAvgTime =
    (dsAndFs.Ds.data[dsAndFs.Ds.data.length - 1] +
      dsAndFs.Ds.data[dsAndFs.Ds.data.length - 2] +
      dsAndFs.Ds.data[dsAndFs.Ds.data.length - 3]) /
    3;
  const fAvgTime =
    (dsAndFs.Fs.data[dsAndFs.Fs.data.length - 1] +
      dsAndFs.Fs.data[dsAndFs.Fs.data.length - 2] +
      dsAndFs.Fs.data[dsAndFs.Fs.data.length - 3]) /
    3;

  return { numOfDs, numOfFs, dRatio, fRatio, dAvgTime, fAvgTime };
}

export function handleFileSelect(
  event: { preventDefault: () => void; readonly defaultPrevented: boolean },
  { filePath, data }: { filePath: string; data: string },
): Results {
  const fileName = filePath.split('/').pop();
  const dataArray = parseCSV(data);
  // console.log(dataArray);
  // fix typos in var identifires
  let recordingLength = 0;
  for (let i = 0; i < dataArray.length; i += 2) {
    const syllableDuartion = dataArray[i + 1][0] - dataArray[i][0];
    recordingLength += syllableDuartion;
  }

  let fSyllablesDuration = 0;
  let dSyllablesDuration = 0;
  // the following 2 variables are repeates .. fix by using dsAndFs array
  let fSyllablesNumber = 0;
  let dSyllablesNumber = 0;
  for (let i = 0; i < dataArray.length; i += 2) {
    const syllableDuartion = dataArray[i + 1][0] - dataArray[i][0];
    if (dataArray[i][1] === 'F') {
      fSyllablesNumber++;
      fSyllablesDuration += syllableDuartion;
    } else {
      dSyllablesNumber++;
      dSyllablesDuration += syllableDuartion;
    }
  }

  let inefficientSpeechScore: number =
    (dSyllablesDuration / recordingLength) * 100;
  inefficientSpeechScore = Math.round(inefficientSpeechScore * 100) / 100;
  let efficientSpeechScore: number =
    (fSyllablesDuration / recordingLength) * 100;
  efficientSpeechScore = Math.round(efficientSpeechScore * 100) / 100;

  let meanStutteringDuration = dSyllablesDuration / dSyllablesNumber;
  meanStutteringDuration = Math.round(meanStutteringDuration * 100) / 100;

  let numberOfSylablesPerMinute = (dataArray.length / recordingLength) * 30;
  numberOfSylablesPerMinute = round(numberOfSylablesPerMinute * 100) / 100;
  const dsAndFs = splitDsFs(dataArray);
  let numberOfFSylablesPerMinute =
    ((dsAndFs.Fs.labels.length * 2) / recordingLength) * 30;
  numberOfFSylablesPerMinute = round(numberOfFSylablesPerMinute * 100) / 100;
  let numberOfDSylablesPerMinute =
    ((dsAndFs.Ds.labels.length * 2) / recordingLength) * 30;
  numberOfDSylablesPerMinute = round(numberOfDSylablesPerMinute * 100) / 100;
  recordingLength = round(recordingLength * 100) / 100;

  let { numOfDs, numOfFs, dRatio, fRatio, dAvgTime, fAvgTime } =
    getNumsAndRatios(dsAndFs);

  fAvgTime = round(fAvgTime * 100) / 100;
  dAvgTime = round(dAvgTime * 100) / 100;

  // round(numberOfSylablesPerMinute * 100) / 100;
  const dysFluentData = {
    labels: dsAndFs.Ds.data,
    datasets: [
      {
        label: 'Dysfluent',
        data: dsAndFs.Ds.occurrence,
        borderWidth: 1,
        // borderColor: "#3e95cd",
        backgroundColor: 'rgba(255, 0, 0, 0.7  )',
      },
    ],
  };

  const fluentData = {
    labels: dsAndFs.Fs.data,
    datasets: [
      {
        label: 'Fluent',
        data: dsAndFs.Fs.occurrence,
        borderWidth: 1,
        // borderColor: "#3e95cd",
        backgroundColor: 'rgba(0, 0, 255, 0.7  )',
      },
    ],
  };

  return {
    tableData: {
      fileName,
      numOfFs,
      numOfDs,
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
    },
    chartsData: {
      fluentData,
      dysFluentData,
    },
  };
}
