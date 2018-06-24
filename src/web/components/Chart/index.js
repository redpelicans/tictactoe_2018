import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import OecdChart from 'oecd-charts';
import * as R from 'ramda';

const fontFamily = "'Segoe UI'";
const font = { fontFamily };
const option = { font: { family: fontFamily } };

const options = {
  base: { height: 400 },
  axis: { x: option, y: option },
  serie: { annotation: option, tooltip: option },
};

const config = {
  fonts: {
    header: { title: font, tooltip: font },
    chart: { tooltip: { primary: font, secondary: font } },
  },
};

// tools
const reduceToWinnerBy = R.reduceBy(R.inc, 0);
const dataToSerie = reduceToWinnerBy(R.pathOr('tie', ['winner', 'name']));
const formatter = (v, k) => ({ x: v, y: k });
const formatAsSerie = asRow => R.mapObjIndexed(R[asRow ? 'identity' : 'flip'](formatter));
const injectColors = R.addIndex(R.map)((v, highlightIndex) => ({ ...v, highlightIndex }));
const formatForOecd = datapoints => ({
  title: 'Results',
  subtitle: [],
  series: [{ datapoints }],
});

// composition
const toBarOrRow = ({ asRow }) =>
  R.pipe(
    dataToSerie,
    formatAsSerie(asRow),
    injectColors,
    R.values,
    formatForOecd,
  );

export default class Chart extends React.Component {
  state = { type: 'BarChart' };

  handleType = type => this.setState({ type });

  render = () => (
    <Fragment>
      <ToggleButtonGroup
        name="options"
        type="radio"
        value={this.state.type}
        onChange={this.handleType}
        style={{ marginBottom: 16 }}
      >
        <ToggleButton value="BarChart">Bars</ToggleButton>
        <ToggleButton value="RowChart">Rows</ToggleButton>
      </ToggleButtonGroup>
      <OecdChart
        type={this.state.type}
        data={toBarOrRow({ asRow: this.state.type === 'RowChart' })(this.props.history)}
        options={options}
        config={config}
      />
    </Fragment>
  );
}

Chart.propTypes = {
  history: PropTypes.array,
};

Chart.defaultProps = {
  history: [],
};
