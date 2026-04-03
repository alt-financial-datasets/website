/**
 * Evidence data for the gov-housing dataset — derived from validation against Zillow ZHVI
 * and homebuilder backtest output.
 * permit_sf_yoy: IC +0.097 (t=5.98) at 1Q, IC +0.112 (t=6.89) at 4Q.
 * hb_contrarian_index: OOS IC +0.130, t=2.05, 68% hit rate.
 * Provided for illustration — this is sample data, not the full dataset.
 */

// Quarterly IC values for permit_sf_yoy vs Zillow ZHVI (1-quarter forward)
// Mean IC: ~+0.097, t=5.98 across 197K county-quarter observations
export const housingPermitICSeries = [
  { period: '2010Q4', ic: 0.081, cumulative_ic: 0.081 },
  { period: '2011Q2', ic: 0.094, cumulative_ic: 0.175 },
  { period: '2011Q4', ic: 0.068, cumulative_ic: 0.243 },
  { period: '2012Q2', ic: 0.112, cumulative_ic: 0.355 },
  { period: '2012Q4', ic: 0.103, cumulative_ic: 0.458 },
  { period: '2013Q2', ic: 0.087, cumulative_ic: 0.545 },
  { period: '2013Q4', ic: 0.076, cumulative_ic: 0.621 },
  { period: '2014Q2', ic: 0.099, cumulative_ic: 0.720 },
  { period: '2014Q4', ic: 0.115, cumulative_ic: 0.835 },
  { period: '2015Q2', ic: 0.091, cumulative_ic: 0.926 },
  { period: '2015Q4', ic: 0.083, cumulative_ic: 1.009 },
  { period: '2016Q2', ic: 0.107, cumulative_ic: 1.116 },
  { period: '2016Q4', ic: 0.095, cumulative_ic: 1.211 },
  { period: '2017Q2', ic: 0.118, cumulative_ic: 1.329 },
  { period: '2017Q4', ic: 0.088, cumulative_ic: 1.417 },
  { period: '2018Q2', ic: 0.074, cumulative_ic: 1.491 },
  { period: '2018Q4', ic: 0.101, cumulative_ic: 1.592 },
  { period: '2019Q2', ic: 0.092, cumulative_ic: 1.684 },
  { period: '2019Q4', ic: 0.110, cumulative_ic: 1.794 },
  { period: '2020Q2', ic: 0.086, cumulative_ic: 1.880 },
  { period: '2020Q4', ic: 0.129, cumulative_ic: 2.009 },
  { period: '2021Q2', ic: 0.141, cumulative_ic: 2.150 },
  { period: '2021Q4', ic: 0.124, cumulative_ic: 2.274 },
  { period: '2022Q2', ic: 0.108, cumulative_ic: 2.382 },
  { period: '2022Q4', ic: 0.097, cumulative_ic: 2.479 },
  { period: '2023Q2', ic: 0.083, cumulative_ic: 2.562 },
  { period: '2023Q4', ic: 0.091, cumulative_ic: 2.653 },
  { period: '2024Q2', ic: 0.102, cumulative_ic: 2.755 },
]

// Quintile HPI appreciation for permit_sf_yoy (1Q forward)
// Top quintile counties appreciate faster than bottom quintile
export const housingPermitQuintileReturns = [
  { quintile: 'Q1 (Low)', value: 0.8 },
  { quintile: 'Q2', value: 1.4 },
  { quintile: 'Q3', value: 1.9 },
  { quintile: 'Q4', value: 2.6 },
  { quintile: 'Q5 (High)', value: 3.5 },
]

// Homebuilder contrarian index: IC time series (OOS = 2020+)
// OOS IC +0.130, t=2.05, 68% hit rate
export const homebuilderContrICSeries = [
  // IS period (2010–2019) — moderate IC
  { period: '2010Q4', ic: 0.092, cumulative_ic: 0.092 },
  { period: '2011Q2', ic: -0.043, cumulative_ic: 0.049 },
  { period: '2011Q4', ic: 0.118, cumulative_ic: 0.167 },
  { period: '2012Q2', ic: 0.076, cumulative_ic: 0.243 },
  { period: '2012Q4', ic: -0.031, cumulative_ic: 0.212 },
  { period: '2013Q2', ic: 0.145, cumulative_ic: 0.357 },
  { period: '2013Q4', ic: 0.088, cumulative_ic: 0.445 },
  { period: '2014Q2', ic: -0.067, cumulative_ic: 0.378 },
  { period: '2014Q4', ic: 0.112, cumulative_ic: 0.490 },
  { period: '2015Q2', ic: 0.059, cumulative_ic: 0.549 },
  { period: '2015Q4', ic: -0.021, cumulative_ic: 0.528 },
  { period: '2016Q2', ic: 0.134, cumulative_ic: 0.662 },
  { period: '2016Q4', ic: 0.071, cumulative_ic: 0.733 },
  { period: '2017Q2', ic: 0.098, cumulative_ic: 0.831 },
  { period: '2017Q4', ic: -0.054, cumulative_ic: 0.777 },
  { period: '2018Q2', ic: 0.107, cumulative_ic: 0.884 },
  { period: '2018Q4', ic: 0.083, cumulative_ic: 0.967 },
  { period: '2019Q2', ic: 0.125, cumulative_ic: 1.092 },
  { period: '2019Q4', ic: -0.038, cumulative_ic: 1.054 },
  // OOS period (2020+) — stronger IC
  { period: '2020Q2', ic: 0.189, cumulative_ic: 1.243 },
  { period: '2020Q4', ic: 0.156, cumulative_ic: 1.399 },
  { period: '2021Q2', ic: 0.142, cumulative_ic: 1.541 },
  { period: '2021Q4', ic: -0.031, cumulative_ic: 1.510 },
  { period: '2022Q2', ic: 0.178, cumulative_ic: 1.688 },
  { period: '2022Q4', ic: 0.121, cumulative_ic: 1.809 },
  { period: '2023Q2', ic: 0.094, cumulative_ic: 1.903 },
  { period: '2023Q4', ic: 0.147, cumulative_ic: 2.050 },
  { period: '2024Q2', ic: 0.163, cumulative_ic: 2.213 },
]
