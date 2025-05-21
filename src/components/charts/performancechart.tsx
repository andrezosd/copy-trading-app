import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ChartDataPoint } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface PerformanceChartProps {
  data: ChartDataPoint[];
  selectedAccount: string;
  chartPeriod: 'month' | 'all';
  getAccountColor: (accountId: string) => string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  data, 
  selectedAccount, 
  chartPeriod,
  getAccountColor 
}) => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="periodo" 
            stroke="#888"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => {
              if (chartPeriod === 'month') {
                return `Dia ${value}`;
              } else {
                if (typeof value === 'string' && value.includes('-')) {
                  const [year, month] = value.split('-');
                  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
                  return `${months[parseInt(month) - 1]} ${year.slice(2)}`;
                }
                return String(value);
              }
            }}
          />
          <YAxis 
            stroke="#888"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => {
              if (chartPeriod === 'month') {
                return `Dia ${label}`;
              } else {
                if (typeof label === 'string' && label.includes('-')) {
                  const [year, month] = label.split('-');
                  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                  return `${months[parseInt(month) - 1]} ${year}`;
                }
                return String(label);
              }
            }}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px'
            }}
          />
          <ReferenceLine y={0} stroke="#888" strokeDasharray="3 3" />
          
          <Line 
            type="monotone" 
            dataKey="lucro" 
            stroke={selectedAccount !== 'all' ? getAccountColor(selectedAccount) : '#8884d8'}
            strokeWidth={2}
            dot={{ 
              fill: selectedAccount !== 'all' ? getAccountColor(selectedAccount) : '#8884d8', 
              strokeWidth: 2, 
              r: 4 
            }}
            activeDot={{ r: 6 }}
            name={chartPeriod === 'month' ? 'Lucro Diário' : 'Lucro Mensal'}
          />
          
          <Line 
            type="monotone" 
            dataKey="acumulado" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            name="Lucro Acumulado"
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Chart Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" 
            style={{ 
              backgroundColor: selectedAccount !== 'all' 
                ? getAccountColor(selectedAccount)
                : '#8884d8' 
            }}></div>
          <span className="text-sm text-gray-600">
            {chartPeriod === 'month' ? 'Lucro Diário' : 'Lucro Mensal'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#10b981] rounded-full"></div>
          <span className="text-sm text-gray-600">Lucro Acumulado</span>
        </div>
      </div>
    </div>
  );
};