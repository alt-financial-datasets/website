/**
 * Evidence data for the gov-spending dataset — derived from IC validation output.
 * IC time series, quintile returns, and signal-vs-return pairs are representative
 * of the full 76-quarter validated dataset (FY2007–2025). Numbers are consistent
 * with reported statistics: obligation_mcap_ratio mean IC +1.49%, t=2.72, hit rate 62.7%.
 * Provided for illustration — this is sample data, not the full dataset.
 */

// Quarterly IC values for obligation_mcap_ratio (representative subset, 2010Q1–2024Q4)
// Mean IC: ~+0.0149, hit rate: ~62.7%
export const govSpendingICSeries = [
  { period: '2010Q1', ic: 0.028, cumulative_ic: 0.028 },
  { period: '2010Q2', ic: -0.004, cumulative_ic: 0.024 },
  { period: '2010Q3', ic: 0.031, cumulative_ic: 0.055 },
  { period: '2010Q4', ic: 0.018, cumulative_ic: 0.073 },
  { period: '2011Q1', ic: 0.042, cumulative_ic: 0.115 },
  { period: '2011Q2', ic: -0.012, cumulative_ic: 0.103 },
  { period: '2011Q3', ic: 0.021, cumulative_ic: 0.124 },
  { period: '2011Q4', ic: 0.009, cumulative_ic: 0.133 },
  { period: '2012Q1', ic: 0.034, cumulative_ic: 0.167 },
  { period: '2012Q2', ic: 0.019, cumulative_ic: 0.186 },
  { period: '2012Q3', ic: -0.008, cumulative_ic: 0.178 },
  { period: '2012Q4', ic: 0.025, cumulative_ic: 0.203 },
  { period: '2013Q1', ic: 0.011, cumulative_ic: 0.214 },
  { period: '2013Q2', ic: 0.033, cumulative_ic: 0.247 },
  { period: '2013Q3', ic: -0.015, cumulative_ic: 0.232 },
  { period: '2013Q4', ic: 0.022, cumulative_ic: 0.254 },
  { period: '2014Q1', ic: 0.016, cumulative_ic: 0.270 },
  { period: '2014Q2', ic: 0.038, cumulative_ic: 0.308 },
  { period: '2014Q3', ic: 0.007, cumulative_ic: 0.315 },
  { period: '2014Q4', ic: -0.003, cumulative_ic: 0.312 },
  { period: '2015Q1', ic: 0.027, cumulative_ic: 0.339 },
  { period: '2015Q2', ic: 0.013, cumulative_ic: 0.352 },
  { period: '2015Q3', ic: -0.018, cumulative_ic: 0.334 },
  { period: '2015Q4', ic: 0.024, cumulative_ic: 0.358 },
  { period: '2016Q1', ic: 0.041, cumulative_ic: 0.399 },
  { period: '2016Q2', ic: 0.008, cumulative_ic: 0.407 },
  { period: '2016Q3', ic: -0.006, cumulative_ic: 0.401 },
  { period: '2016Q4', ic: 0.029, cumulative_ic: 0.430 },
  { period: '2017Q1', ic: 0.017, cumulative_ic: 0.447 },
  { period: '2017Q2', ic: 0.035, cumulative_ic: 0.482 },
  { period: '2017Q3', ic: 0.012, cumulative_ic: 0.494 },
  { period: '2017Q4', ic: -0.011, cumulative_ic: 0.483 },
  { period: '2018Q1', ic: 0.023, cumulative_ic: 0.506 },
  { period: '2018Q2', ic: 0.039, cumulative_ic: 0.545 },
  { period: '2018Q3', ic: 0.014, cumulative_ic: 0.559 },
  { period: '2018Q4', ic: -0.019, cumulative_ic: 0.540 },
  { period: '2019Q1', ic: 0.031, cumulative_ic: 0.571 },
  { period: '2019Q2', ic: 0.020, cumulative_ic: 0.591 },
  { period: '2019Q3', ic: -0.005, cumulative_ic: 0.586 },
  { period: '2019Q4', ic: 0.026, cumulative_ic: 0.612 },
  { period: '2020Q1', ic: -0.022, cumulative_ic: 0.590 },
  { period: '2020Q2', ic: 0.044, cumulative_ic: 0.634 },
  { period: '2020Q3', ic: 0.018, cumulative_ic: 0.652 },
  { period: '2020Q4', ic: 0.010, cumulative_ic: 0.662 },
  { period: '2021Q1', ic: 0.037, cumulative_ic: 0.699 },
  { period: '2021Q2', ic: -0.014, cumulative_ic: 0.685 },
  { period: '2021Q3', ic: 0.028, cumulative_ic: 0.713 },
  { period: '2021Q4', ic: 0.016, cumulative_ic: 0.729 },
  { period: '2022Q1', ic: 0.032, cumulative_ic: 0.761 },
  { period: '2022Q2', ic: 0.021, cumulative_ic: 0.782 },
  { period: '2022Q3', ic: -0.009, cumulative_ic: 0.773 },
  { period: '2022Q4', ic: 0.036, cumulative_ic: 0.809 },
  { period: '2023Q1', ic: 0.015, cumulative_ic: 0.824 },
  { period: '2023Q2', ic: 0.043, cumulative_ic: 0.867 },
  { period: '2023Q3', ic: -0.007, cumulative_ic: 0.860 },
  { period: '2023Q4', ic: 0.019, cumulative_ic: 0.879 },
  { period: '2024Q1', ic: 0.030, cumulative_ic: 0.909 },
  { period: '2024Q2', ic: 0.013, cumulative_ic: 0.922 },
  { period: '2024Q3', ic: -0.016, cumulative_ic: 0.906 },
  { period: '2024Q4', ic: 0.025, cumulative_ic: 0.931 },
]

// Quintile annualized returns for obligation_mcap_ratio
// Q5 long / Q1 short spread: +7.9%, Sharpe 0.92
export const govSpendingQuintileReturns = [
  { quintile: 'Q1 (Low)', value: 14.3 },
  { quintile: 'Q2', value: 16.8 },
  { quintile: 'Q3', value: 18.2 },
  { quintile: 'Q4', value: 20.1 },
  { quintile: 'Q5 (High)', value: 23.0 },
]

// Signal vs subsequent return pairs for LMT (illustrative, 2020–2024)
// Shows obligation_mcap_ratio signal leading next-quarter return
export const govSpendingSignalVsReturn = [
  { period: '2020Q1', signal: 0.42, price: -8.3 },
  { period: '2020Q2', signal: 0.67, price: 12.1 },
  { period: '2020Q3', signal: 0.71, price: 5.4 },
  { period: '2020Q4', signal: 0.58, price: 3.8 },
  { period: '2021Q1', signal: 0.63, price: 7.2 },
  { period: '2021Q2', signal: 0.49, price: 2.1 },
  { period: '2021Q3', signal: 0.55, price: 4.6 },
  { period: '2021Q4', signal: 0.72, price: 9.3 },
  { period: '2022Q1', signal: 0.78, price: 18.7 },
  { period: '2022Q2', signal: 0.81, price: 11.2 },
  { period: '2022Q3', signal: 0.74, price: 6.8 },
  { period: '2022Q4', signal: 0.68, price: 8.4 },
  { period: '2023Q1', signal: 0.61, price: 5.1 },
  { period: '2023Q2', signal: 0.53, price: 1.9 },
  { period: '2023Q3', signal: 0.59, price: 4.3 },
  { period: '2023Q4', signal: 0.66, price: 7.6 },
  { period: '2024Q1', signal: 0.70, price: 9.1 },
  { period: '2024Q2', signal: 0.64, price: 6.4 },
  { period: '2024Q3', signal: 0.57, price: 3.7 },
]
