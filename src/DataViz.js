import React from 'react'
import { XYFrame } from 'semiotic'
import { scaleTime, scaleLog } from 'd3-scale'
import moment from 'moment'

import { covidByState } from './covid-by-state-data'

const sample = {
  // meta
  date: 20200331,
  state: 'AK',
  // cumulative
  positive: 119,
  negative: 3594,
  hospitalized: 7,
  death: 3,
  // increase
  deathIncrease: 0,
  hospitalizedIncrease: 0,
  
  pending: null,
  hash: '5339d73f78797a2174fe32109c081c80915f8378',
  dateChecked: '2020-03-31T20:00:00Z',
  fips: '02',
  totalTestResults: 3713,
  negativeIncrease: 54,
  positiveIncrease: 5,
  totalTestResultsIncrease: 59,
  
  // total: 3713,
}

const processDataForViz = (covidByState) => {
  return covidByState
    .slice(0, 300)
    .filter(({ positive }) => positive > 0)
    .map(({ date, ...rest }) => ({
      ...rest,
      date: new Date(date),
      // positive: positive === 0 ? 0.0001 : positive,
    }))
}

const getLineFormat = (data) => {
  return data
    .map(d => d)
}

const DataViz = () => {
  const processedData = processDataForViz(covidByState)
  
  const frameProps = {
    /* --- Data --- */
    points: processedData,
    
    /* --- Size --- */
    margin: { left: 55, right: 15, top: 50, bottom: 75 },
    
    /* --- Process --- */
    xAccessor: 'date',
    yAccessor: 'positive',
    
    xScaleType: scaleTime(),
    yScaleType: scaleLog(),
    
    /* --- Customize --- */
    pointStyle: { fill: '#E0488B', r: 4 },
    axes: [
      { orient: "left" },
      { orient: "bottom", tickFormat: d => moment(d).format("MM/DD") }
    ],
    
    /* --- Interact --- */
    hoverAnnotation: true,
    tooltipContent: d => (
      <div className="tooltip-content">
        <p>State: {d.state}</p>
        <p>Total cases: {d.positive}</p>
        <p>Total deaths: {d.death}</p>
      </div>
    ),
  }
  
  return (
    <div>
      <h2>Non-zero total cases over time (log scale)</h2>
      <XYFrame {...frameProps} />
    </div>
  )
}

export default DataViz
