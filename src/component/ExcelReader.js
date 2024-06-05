import React, { useEffect } from 'react';
import * as XLSX from 'xlsx';
import raidCSV from '../csv/Raid.csv'; // CSV 파일 경로

const ExcelReader = ({ setData }) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(raidCSV);
      const text = await response.text();
      const workbook = XLSX.read(text, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setData(data);
    };

    fetchData();
  }, [setData]);

  return <div>Loading...</div>;
};

export default ExcelReader;
