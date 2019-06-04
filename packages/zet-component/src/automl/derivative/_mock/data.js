export const data = [
  {
    id: "1",
    name: "数值型",
    desc: "数值型",
    params: [
      {
        key: 'int1',
        name: "int1",
        meaning: "Transform a Datetime feature into the year."
      },
      {
        key: 'int2',
        name: "int2",
        meaning: "Transform a Datetime feature into the year."
      },
      {
        key: 'int3',
        name: "int3",
        meaning: "Transform a Datetime feature into the year."
      },
      {
        key: 'int4',
        name: "int4",
        meaning: "Transform a Datetime feature into the year."
      }
    ]
  },
  {
    id: "2",
    name: "文本型",
    desc: "数值型",
    params: [
      {
        key: 'text1',
        name: "text1",
        meaning: "Transform a Datetime feature into the year."
      },
      {
        key: 'text2',
        name: "text2",
        meaning: "Transform a Datetime feature into the year."
      },
      {
        key: 'text3',
        name: "text3",
        meaning: "Transform a Datetime feature into the year."
      },
      {
        key: 'text4',
        name: "text4",
        meaning: "Transform a Datetime feature into the year."
      },
      {
        key: 'text5',
        name: "text1",
        meaning: "Transform a Datetime feature into the year."
      },
      {
        key: 'text6',
        name: "text2",
        meaning: "Transform a Datetime feature into the year."
      },
      {
        key: 'text7',
        name: "text3",
        meaning: "Transform a Datetime feature into the year."
      },
      {
        key: 'text8',
        name: "text4",
        meaning: "Transform a Datetime feature into the year."
      }
    ]
  },
  {
    id: "3",
    name: "时间性",
    desc: "时间性",
    params: [
      {
        key: 'time1',
        name: "time1",
        meaning: "Transform a Datetime feature into the year."
      },
      {
        key: 'time2',
        name: "time2",
        meaning: "Transform a Datetime feature into the year."
      },
      {
        key: 'time3',
        name: "time3",
        meaning: "Transform a Datetime feature into the year."
      },
      {
        key: 'time4',
        name: "time4",
        meaning: "Transform a Datetime feature into the year."
      }
    ]
  }
];

export const value = [
  {
    id: "1",
    checked: true,
    params:['int1','int3']
  },
  {
    id: "2",
    checked: true,
    params:['text2','text4']
  },
  {
    id: "3",
    checked: true,
    params:['time4',]
  }
]

export const collapseData = {
  numeric:[
    'amount -> MEAN(transactions.amount),SUM(transactions.amount),MEAN(transactions.amount),MAX，(transactions.amount),MEAN(transactions.amount)MEAN(transactions.amount),SUM(transactions.amount),MEAN(transactions.amount)',
    'amount -> MEAN(transactions.amount),SUM(transactions.amount),MEAN(transactions.amount),MAX'
  ],
  text:[
    'date_of_birth -> customers.MONTH(date_of_birth),customers.YEAR(date_of_birth),customers.DAY(date_of_birth)',
    'date_of_birth -> customers.MONTH(date_of_birth),customers.YEAR(date_of_birth),customers.DAY(date_of_birth)'
  ],
  time:[
    'date_of_birth -> customers.MONTH(date_of_birth),customers.YEAR(date_of_birth),customers.DAY(date_of_birth)',
    'date_of_birth -> customers.MONTH(date_of_birth),customers.YEAR(date_of_birth),customers.DAY(date_of_birth)'
  ]
}

export const detailData = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '3',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '4',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '5',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '6',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
]