export interface User {
  id: number;
  username: string;
  apiKey: string;
  accounts: Account[];
}

export interface Account {
  id: string;
  name: string;
  type: 'main' | 'sub';
}

export interface Stats {
  todayTrades: number;
  todayProfit: number;
  activeFollowers: number;
  successRate: number;
}

export interface CalendarDay {
  date: number;
  profit: number;
  trades: number;
  isLoss: boolean;
}

export interface CalendarData {
  monthlyPL: number;
  days: CalendarDay[];
}

export interface AccountCalendarData {
  [accountId: string]: CalendarData;
}

export interface HistoricalData {
  date: string;
  profit: number;
}

export interface AccountsHistoricalData {
  [accountId: string]: HistoricalData[];
}

export interface ChartDataPoint {
  periodo: string | number;
  lucro: number;
  acumulado: number;
}

export interface Follower {
  id: number;
  type: 'local';
  account: string;
  multiplier: string;
  active: boolean;
  limitsEnabled: boolean;
  dailyLossLimit: string;
  dailyProfitTarget: string;
  enforceLimits: boolean;
}

export interface Connection {
  id: number;
  type: 'external';
  username: string;
  accounts: string[];
  multiplier: string;
  active: boolean;
  copyMode: 'all' | 'specific';
  limitsEnabled: boolean;
  dailyLossLimit: string;
  dailyProfitTarget: string;
  enforceLimits: boolean;
}

export interface TradeCopy {
  accountId: string;
  accountName: string;
  orderId: string;
  multiplier: number;
  quantity: number;
  entryPrice: number | null;
  exitPrice: number | null;
  profitLoss: number | null;
  status: 'success' | 'error';
  slippage?: number;
  message?: string;
}

export interface TradeHistory {
  id: number;
  date: string;
  time: string;
  masterAccount: string;
  masterOrderId: string;
  instrument: string;
  action: 'BUY' | 'SELL';
  quantity: number;
  orderType: string;
  entryPrice: number;
  exitPrice: number | null;
  stopLoss: number;
  takeProfit: number;
  profitLoss: number | null;
  duration: string | null;
  status: 'OPEN' | 'CLOSED';
  strategy: string;
  copies: TradeCopy[];
}

export interface DateRange {
  start: string;
  end: string;
}