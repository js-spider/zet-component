import moment from 'moment';

/**
 *  chart 图的时间范围设置
 */
export const getDefaultTimeRange = (predictChartData, rangePicker) => {
  let defaultTimeRange = []; let initialValue = [];
  if (predictChartData) {
    if (rangePicker) {
      defaultTimeRange = [rangePicker[0].valueOf(), rangePicker[1].valueOf()];
      initialValue = [rangePicker[0], rangePicker[1]];
    } else {
      defaultTimeRange = [moment(predictChartData.begin).valueOf(), moment(predictChartData.begin).add(1, 'days').valueOf()];
      initialValue = [moment(predictChartData.begin), moment(predictChartData.begin).add(1, 'days')];
    }
  }
  return { defaultTimeRange, initialValue };
};

/**
 *  算法名称
 */
export const Threshold = '阈值计算';
export const IsolatedForests = '孤立森林';

const THException = '阈值计算异常点';
const IFException = '孤立森林异常点';
/**
 *  状态颜色 设置
 */
export const thresholdColor = (() => {
  const obj = { 0: 'green', 1: 'red', '0_0': 'green', '0_1': 'purple', '1_0': 'red', '1_1': 'red' };
  return (key) => {
    return obj[key] || 'transparent';
  };
})();

/**
 * 孤立森林 scales
 */
export const isolatedForestsScales = (y = 'y', alias) => {
  return {
    scales: {
      axisX: { key: 'x', mask: 'HH:mm:ss' },
      axisY: [
        { key: y,
          alias,
          color: ['y*prediction', (val1, val2) => { return thresholdColor(`0_${val2}`); }],
          shape: 'circle',
          type: 'point' },
      ],
    },
  };
};

/**
 * 阈值计算 scales
 */
export const thresholdScales = (y = 'y', alias) => {
  return {
    scales: {
      axisX: { key: 'x', mask: 'HH:mm:ss' },
      axisY: [
        { key: y,
          alias,
          defaultSlider: true,
          color: [`${y}*prediction`, (val1, val2) => { return thresholdColor(val2); }],
          type: 'point',
          shape: 'circle' },
        { key: 'upper', alias: '阈值计算 upper', color: 'orange', visible: false },
        { key: 'lower', alias: '阈值计算 lower', color: 'orange', visible: false },
      ],
    },
  };
};

/**
 * 模型对比 scales
 */
export const getScales = (modelTypes = [], metricName) => {
  const types = modelTypes.join('_');
  let obj = {};
  switch (types) {
    case `${Threshold}`:
      obj = { color: ['value*td_pred', (val1, val2) => { return thresholdColor(`${val2}`); }], extends: true };
      break;
    case `${IsolatedForests}`:
      obj = { color: ['value*if_pred', (val1, val2) => { return thresholdColor(`0_${val2}`); }] };
      break;
    default: {
      obj = { color: ['value*td_pred*if_pred', (val1, val2, val3) => { return thresholdColor(`${val2}_${val3}`); }], extends: true };
    }
  }
  const config = {
    axisX: { key: 'x', mask: 'HH:mm:ss' },
    axisY: [
      { key: 'value',
        defaultSlider: true,
        alias: metricName,
        type: 'point',
        shape: 'circle',
        color: obj.color,
      },
    ],
  };
  obj.extends && config.axisY.push(
    { key: 'upper', alias: '阈值计算 upper', color: 'orange', visible: false },
    { key: 'lower', alias: '阈值计算 lower', color: 'orange', visible: false }
  );
  return config;
};

/**
 *  chart legend extend  扩展chart  title
 */
export const legendExtend = (modelTypes) => (_, legendTitles = []) => {
  const titles = [...legendTitles];
  if (modelTypes.indexOf(Threshold) !== -1 && !titles.find(item => item.alias === THException)) {
    titles.push({ alias: THException, color: 'red' });
  }
  if (modelTypes.indexOf(IsolatedForests) !== -1 && !titles.find(item => item.alias === IFException)) {
    titles.push({ alias: IFException, color: 'purple' });
  }
  return titles;
};

/**
 *  sliderChart 设置 纵坐标min max 动态匹配
 */
export const autoFormat = (y = 'y') => (rows, scale) => {
  if (!scale.upper || !scale.lower) return;
  const max = Math.max.apply(null, [
    Math.max.apply(null, rows.map(i => i[y])),
    Math.max.apply(null, rows.map(i => i.lower)),
    Math.max.apply(null, rows.map(i => i.upper)),
  ]);
  const min = Math.min.apply(null, [
    Math.min.apply(null, rows.map(i => i[y])),
    Math.min.apply(null, rows.map(i => i.lower)),
    Math.min.apply(null, rows.map(i => i.upper)),
  ]);
  ['lower', 'upper', y].forEach(ii => {
    scale[ii].min = min;
    scale[ii].max = max;
  });
};
