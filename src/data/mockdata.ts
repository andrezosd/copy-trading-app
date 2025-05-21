import { Account, HistoricalData, CalendarData, AccountCalendarData, 
         AccountsHistoricalData, User, Stats, TradeHistory } from '../types';

export const currentUser: User = {
  id: 1,
  username: 'SONETST13870670',
  apiKey: 'abc123xyz789',
  accounts: []
};

export const stats: Stats = {
  todayTrades: 12,
  todayProfit: 450.75,
  activeFollowers: 3,
  successRate: 87
};

export const calendarData: CalendarData = {
  monthlyPL: 22864.80,
  days: [
    { date: 1, profit: -1049.60, trades: 7, isLoss: true },
    { date: 2, profit: 687.00, trades: 10, isLoss: false },
    { date: 3, profit: 2843.80, trades: 4, isLoss: false },
    { date: 4, profit: 2481.20, trades: 21, isLoss: false },
    { date: 7, profit: 2524.40, trades: 2, isLoss: false },
    { date: 8, profit: 2385.40, trades: 7, isLoss: false },
    { date: 9, profit: 799.40, trades: 2, isLoss: false },
    { date: 11, profit: 1451.00, trades: 5, isLoss: false },
    { date: 12, profit: 7160.20, trades: 16, isLoss: false },
    { date: 13, profit: 2153.20, trades: 6, isLoss: false },
    { date: 14, profit: 1246.60, trades: 3, isLoss: false },
    { date: 15, profit: 407.60, trades: 8, isLoss: false },
    { date: 16, profit: 259.20, trades: 11, isLoss: false },
    { date: 17, profit: 4066.60, trades: 28, isLoss: false },
    { date: 20, profit: 1390.20, trades: 11, isLoss: false },
    { date: 21, profit: 869.40, trades: 2, isLoss: false },
    { date: 22, profit: 909.40, trades: 2, isLoss: false },
    { date: 23, profit: 1237.80, trades: 24, isLoss: false },
    { date: 24, profit: 1288.80, trades: 4, isLoss: false },
    { date: 25, profit: 5704.60, trades: 43, isLoss: false },
    { date: 29, profit: 1896.40, trades: 12, isLoss: false },
    { date: 30, profit: 1555.80, trades: 14, isLoss: false },
  ]
};

export const accountsCalendarData: AccountCalendarData = {
  'DEMO12345': {
    monthlyPL: 14232.40,
    days: [
      { date: 1, profit: -687.30, trades: 4, isLoss: true },
      { date: 2, profit: 320.50, trades: 6, isLoss: false },
      { date: 3, profit: 1765.80, trades: 2, isLoss: false },
      { date: 4, profit: 1540.80, trades: 12, isLoss: false },
      { date: 7, profit: 1567.20, trades: 1, isLoss: false },
      { date: 8, profit: 1480.60, trades: 4, isLoss: false },
      { date: 9, profit: 496.30, trades: 1, isLoss: false },
      { date: 11, profit: 901.00, trades: 3, isLoss: false },
      { date: 12, profit: 4439.40, trades: 10, isLoss: false },
      { date: 13, profit: 1337.20, trades: 3, isLoss: false },
      { date: 14, profit: 774.60, trades: 2, isLoss: false },
      { date: 15, profit: 253.20, trades: 5, isLoss: false },
      { date: 16, profit: 160.80, trades: 7, isLoss: false },
      { date: 17, profit: 2526.20, trades: 17, isLoss: false },
      { date: 20, profit: 863.60, trades: 7, isLoss: false },
      { date: 21, profit: 540.20, trades: 1, isLoss: false },
      { date: 22, profit: 564.60, trades: 1, isLoss: false },
      { date: 23, profit: 768.60, trades: 15, isLoss: false },
      { date: 24, profit: 800.40, trades: 2, isLoss: false },
      { date: 25, profit: 3542.40, trades: 27, isLoss: false },
      { date: 29, profit: 1177.40, trades: 7, isLoss: false },
      { date: 30, profit: 966.00, trades: 9, isLoss: false },
    ]
  },
  'DEMO67890': {
    monthlyPL: 5716.20,
    days: [
      { date: 1, profit: -262.40, trades: 2, isLoss: true },
      { date: 2, profit: 171.80, trades: 3, isLoss: false },
      { date: 3, profit: 710.95, trades: 1, isLoss: false },
      { date: 4, profit: 620.30, trades: 6, isLoss: false },
      { date: 7, profit: 631.10, trades: 1, isLoss: false },
      { date: 8, profit: 596.40, trades: 2, isLoss: false },
      { date: 9, profit: 199.85, trades: 1, isLoss: false },
      { date: 11, profit: 362.75, trades: 1, isLoss: false },
      { date: 12, profit: 1790.05, trades: 4, isLoss: false },
      { date: 13, profit: 538.30, trades: 2, isLoss: false },
      { date: 14, profit: 311.65, trades: 1, isLoss: false },
      { date: 15, profit: 101.90, trades: 2, isLoss: false },
      { date: 16, profit: 64.80, trades: 3, isLoss: false },
      { date: 17, profit: 1016.65, trades: 7, isLoss: false },
      { date: 20, profit: 347.55, trades: 3, isLoss: false },
      { date: 21, profit: 217.35, trades: 1, isLoss: false },
      { date: 22, profit: 227.35, trades: 1, isLoss: false },
      { date: 23, profit: 309.45, trades: 6, isLoss: false },
      { date: 24, profit: 322.20, trades: 1, isLoss: false },
      { date: 25, profit: 1426.15, trades: 11, isLoss: false },
      { date: 29, profit: 474.10, trades: 3, isLoss: false },
      { date: 30, profit: 388.95, trades: 4, isLoss: false },
    ]
  },
  'DEMO11111': {
    monthlyPL: 2916.20,
    days: [
      { date: 1, profit: -99.90, trades: 1, isLoss: true },
      { date: 2, profit: 194.70, trades: 1, isLoss: false },
      { date: 3, profit: 367.05, trades: 1, isLoss: false },
      { date: 4, profit: 320.10, trades: 3, isLoss: false },
      { date: 8, profit: 308.40, trades: 1, isLoss: false },
      { date: 12, profit: 930.75, trades: 2, isLoss: false },
      { date: 13, profit: 277.70, trades: 1, isLoss: false },
      { date: 14, profit: 160.35, trades: 0, isLoss: false },
      { date: 17, profit: 523.75, trades: 4, isLoss: false },
      { date: 20, profit: 178.95, trades: 1, isLoss: false },
      { date: 23, profit: 159.75, trades: 3, isLoss: false },
      { date: 25, profit: 736.05, trades: 5, isLoss: false },
      { date: 30, profit: 200.85, trades: 1, isLoss: false },
    ]
  }
};

export const historicalData: HistoricalData[] = [
  { date: '2024-01', profit: 5420.50 },
  { date: '2024-02', profit: -2180.30 },
  { date: '2024-03', profit: 8956.40 },
  { date: '2024-04', profit: 3245.80 },
  { date: '2024-05', profit: 12450.20 },
  { date: '2024-06', profit: -1890.60 },
  { date: '2024-07', profit: 7834.90 },
  { date: '2024-08', profit: 4567.30 },
  { date: '2024-09', profit: 9823.70 },
  { date: '2024-10', profit: 6234.50 },
  { date: '2024-11', profit: 15678.90 },
  { date: '2024-12', profit: 8901.20 },
  { date: '2025-01', profit: 3456.70 },
  { date: '2025-02', profit: 11234.50 },
  { date: '2025-03', profit: 7890.30 },
  { date: '2025-04', profit: 9876.40 },
  { date: '2025-05', profit: 22864.80 }
];

export const accountsHistoricalData: AccountsHistoricalData = {
  'DEMO12345': [
    { date: '2024-01', profit: 3368.40 },
    { date: '2024-02', profit: -1354.40 },
    { date: '2024-03', profit: 5662.50 },
    { date: '2024-04', profit: 2015.60 },
    { date: '2024-05', profit: 7730.40 },
    { date: '2024-06', profit: -1173.60 },
    { date: '2024-07', profit: 4864.20 },
    { date: '2024-08', profit: 2835.20 },
    { date: '2024-09', profit: 6098.30 },
    { date: '2024-10', profit: 3869.80 },
    { date: '2024-11', profit: 9731.80 },
    { date: '2024-12', profit: 5526.80 },
    { date: '2025-01', profit: 2145.20 },
    { date: '2025-02', profit: 6971.60 },
    { date: '2025-03', profit: 4896.40 },
    { date: '2025-04', profit: 6128.20 },
    { date: '2025-05', profit: 14232.40 }
  ],
  'DEMO67890': [
    { date: '2024-01', profit: 1355.40 },
    { date: '2024-02', profit: -545.20 },
    { date: '2024-03', profit: 2239.10 },
    { date: '2024-04', profit: 811.50 },
    { date: '2024-05', profit: 3112.70 },
    { date: '2024-06', profit: -472.40 },
    { date: '2024-07', profit: 1959.40 },
    { date: '2024-08', profit: 1141.80 },
    { date: '2024-09', profit: 2455.90 },
    { date: '2024-10', profit: 1558.60 },
    { date: '2024-11', profit: 3919.70 },
    { date: '2024-12', profit: 2225.30 },
    { date: '2025-01', profit: 864.40 },
    { date: '2025-02', profit: 2808.60 },
    { date: '2025-03', profit: 1972.60 },
    { date: '2025-04', profit: 2469.10 },
    { date: '2025-05', profit: 5716.20 }
  ],
  'DEMO11111': [
    { date: '2024-01', profit: 696.70 },
    { date: '2024-02', profit: -280.70 },
    { date: '2024-03', profit: 1054.80 },
    { date: '2024-04', profit: 418.70 },
    { date: '2024-05', profit: 1607.10 },
    { date: '2024-06', profit: -244.60 },
    { date: '2024-07', profit: 1011.30 },
    { date: '2024-08', profit: 590.30 },
    { date: '2024-09', profit: 1269.50 },
    { date: '2024-10', profit: 806.10 },
    { date: '2024-11', profit: 2027.40 },
    { date: '2024-12', profit: 1149.10 },
    { date: '2025-01', profit: 447.10 },
    { date: '2025-02', profit: 1454.30 },
    { date: '2025-03', profit: 1021.30 },
    { date: '2025-04', profit: 1279.10 },
    { date: '2025-05', profit: 2916.20 }
  ]
};

export const tradeHistoryData: TradeHistory[] = [
  {
    id: 1,
    date: '2025-05-17',
    time: '09:45:32',
    masterAccount: 'DEMO12345',
    masterOrderId: '220472432376',
    instrument: 'ES.FUT',
    action: 'BUY',
    quantity: 2,
    orderType: 'MARKET',
    entryPrice: 5325.50,
    exitPrice: 5342.75,
    stopLoss: 5310.25,
    takeProfit: 5360.00,
    profitLoss: 34.50,
    duration: '1h 23m',
    status: 'CLOSED',
    strategy: 'Breakout',
    copies: [
      {
        accountId: 'SONETST13745974',
        accountName: 'Conta Principal',
        orderId: '221422280257',
        multiplier: 1.0,
        quantity: 2,
        entryPrice: 5325.75,
        exitPrice: 5342.50,
        profitLoss: 33.50,
        status: 'success',
        slippage: 0.25
      },
      {
        accountId: 'SONETST13663260',
        accountName: 'Conta Secundária',
        orderId: 'N/A',
        multiplier: 0.5,
        quantity: 1,
        entryPrice: null,
        exitPrice: null,
        profitLoss: null,
        status: 'error',
        message: 'Entry Id Not Found, Please verify if the Account ID is correct.'
      }
    ]
  },
  {
    id: 2,
    date: '2025-05-17',
    time: '11:22:05',
    masterAccount: 'DEMO12345',
    masterOrderId: '220472432366',
    instrument: 'NQ.FUT',
    action: 'SELL',
    quantity: 1,
    orderType: 'LIMIT',
    entryPrice: 19250.75,
    exitPrice: 19180.50,
    stopLoss: 19290.00,
    takeProfit: 19150.00,
    profitLoss: 70.25,
    duration: '45m',
    status: 'CLOSED',
    strategy: 'Reversal',
    copies: [
      {
        accountId: 'SONETST13745974',
        accountName: 'Conta Principal',
        orderId: '221422280251',
        multiplier: 1.0,
        quantity: 1,
        entryPrice: 19251.00,
        exitPrice: 19181.25,
        profitLoss: 69.75,
        status: 'success',
        slippage: 0.25
      },
      {
        accountId: 'SONETST13663260',
        accountName: 'Conta Secundária',
        orderId: 'N/A',
        multiplier: 0.5,
        quantity: 0.5,
        entryPrice: null,
        exitPrice: null,
        profitLoss: null,
        status: 'error',
        message: 'Entry Id Not Found, Please verify if the Account ID is correct.'
      }
    ]
  },
  {
    id: 3,
    date: '2025-05-12',
    time: '08:15:43',
    masterAccount: 'DEMO12345',
    masterOrderId: '220472433582',
    instrument: 'CL.FUT',
    action: 'BUY',
    quantity: 3,
    orderType: 'MARKET',
    entryPrice: 82.45,
    exitPrice: 83.20,
    stopLoss: 81.90,
    takeProfit: 83.50,
    profitLoss: 2250.00,
    duration: '2h 35m',
    status: 'CLOSED',
    strategy: 'Trend Following',
    copies: [
      {
        accountId: 'SONETST13745974',
        accountName: 'Conta Principal',
        orderId: '221422281153',
        multiplier: 1.0,
        quantity: 3,
        entryPrice: 82.48,
        exitPrice: 83.18,
        profitLoss: 2100.00,
        status: 'success',
        slippage: 0.03
      },
      {
        accountId: 'SONETST13663260',
        accountName: 'Conta Secundária',
        orderId: '221422281155',
        multiplier: 0.5,
        quantity: 1.5,
        entryPrice: 82.47,
        exitPrice: 83.19,
        profitLoss: 1080.00,
        status: 'success',
        slippage: 0.02
      }
    ]
  },
];