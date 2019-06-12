
export const groupConfig = [
  { key:'featureEngineering' , title: 'featureEngineering', itemContent:['mem','cpu'] },
  { key:'train', title: 'sourceAlgorithm'},
  // { key:'evaluate', title :'sourceEvaluate'},
]; 
export const standalone = {
  train:{"gpu":0,"cpu":1,"mem":1024},
  featureEngineering:{"gpu":0,"cpu":1,"mem":1024},
  evaluate:{"cpu":1,"mem":1024,"gpu":0}
};
export const userResource = {
  cpus:{"max":24,"min":1,"step":1},
  mem:{"max":40960,"min":1024,"step":1024},
  gpus:{"max":0,"min":0,"step":1}
};