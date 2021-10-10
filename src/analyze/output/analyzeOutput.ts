import { ScenarioResult } from "../../types";
import { OUTPUT_DIR } from "../../utils/constants";
import { convertToCSV } from "../utils/convertToCSV";
import { createOutputDir } from "../utils/createOutputDir";
import fs from "fs-extra";
import { outputResuts } from "../utils/outputResults";

class AnalyzeOutput {
  data: ScenarioResult[];
  outputDirPath: string;
  csvFileName: string;
  jsonFileName: string;
  constructor (data: ScenarioResult[]) {
    this.data = data; 
    this.outputDirPath = OUTPUT_DIR;
    this.csvFileName = "result.csv";
    this.jsonFileName = "result.json";
  }

  async createOutputDir() {
    this.outputDirPath = await createOutputDir(OUTPUT_DIR);
  }

  outputConsole() {
    outputResuts(this.data);
  }

  async outputCsv() {
    const csv = await convertToCSV(this.data);
    const filePath = `${this.outputDirPath}/${this.csvFileName}`;
    fs.writeFileSync(filePath, csv); 
    console.log(`${filePath}/${this.csvFileName} was created.`)
  }

  async outputJson() {
    const json = this.data;
    const filePath = `${this.outputDirPath}/${this.jsonFileName}`;
    fs.writeFileSync(filePath, JSON.stringify(json));
    console.log(`${filePath}/${this.jsonFileName} was created.`)
  }
}

export function createAnalyzeOutput(data: ScenarioResult[]) {
  return new AnalyzeOutput(data);
}
