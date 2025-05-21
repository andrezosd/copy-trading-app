import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, X, ChevronDown, History } from 'lucide-react';
import { TradeHistory, DateRange } from '../../types';
import { tradeHistoryData } from '../../data/mockData';

interface TradeHistoryModalProps {
  onClose: () => void;
}

export const TradeHistoryModal: React.FC<TradeHistoryModalProps> = ({ onClose }) => {
  const [tradeHistory] = useState<TradeHistory[]>(tradeHistoryData);
  const [activeTab, setActiveTab] = useState('all');
  const [expandedTrade, setExpandedTrade] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isFilteringDate, setIsFilteringDate] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  
  const filteredTrades = tradeHistory.filter(trade => {
    // Status filter
    if (filterStatus !== 'all' && 
       ((filterStatus === 'open' && trade.status !== 'OPEN') || 
        (filterStatus === 'closed' && trade.status !== 'CLOSED'))) {
      return false;
    }
    
    // Date filter
    if (isFilteringDate) {
      const tradeDate = new Date(trade.date);
      if (startDate && new Date(startDate) > tradeDate) return false;
      if (endDate && new Date(endDate) < tradeDate) return false;
    }
    
    return true;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'OPEN': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'CLOSED': return 'text-green-600 bg-green-50 border-green-200';
      case 'CANCELLED': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getActionColor = (action: string) => {
    switch(action) {
      case 'BUY': return 'text-green-600 bg-green-50';
      case 'SELL': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const totalProfitLoss = filteredTrades
    .filter(trade => trade.profitLoss !== null)
    .reduce((sum, trade) => sum + (trade.profitLoss || 0), 0);
  
  const totalCopiedTrades = filteredTrades.reduce((sum, trade) => 
    sum + trade.copies.filter(copy => copy.status === 'success').length, 0);
  
  const totalFailedCopies = filteredTrades.reduce((sum, trade) => 
    sum + trade.copies.filter(copy => copy.status === 'error').length, 0);
  
  const applyDateFilter = () => {
    setIsFilteringDate(true);
    setDatePickerVisible(false);
  };
  
  const clearDateFilter = () => {
    setStartDate('');
    setEndDate('');
    setIsFilteringDate(false);
    setDatePickerVisible(false);
  };
  
  const formatDateDisplay = () => {
    if (!isFilteringDate) return 'Todas as datas';
    if (startDate && endDate) return `${startDate} - ${endDate}`;
    if (startDate) return `A partir de ${startDate}`;
    if (endDate) return `Até ${endDate}`;
    return 'Personalizado';
  };

  const predefinedDateRanges: { label: string; getRange: () => DateRange }[] = [
    { label: 'Hoje', getRange: () => {
      const today = new Date().toISOString().split('T')[0];
      return { start: today, end: today };
    }},
    { label: 'Ontem', getRange: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      return { start: yesterdayStr, end: yesterdayStr };
    }},
    { label: 'Últimos 7 dias', getRange: () => {
      const end = new Date().toISOString().split('T')[0];
      const start = new Date();
      start.setDate(start.getDate() - 6);
      return { start: start.toISOString().split('T')[0], end };
    }},
    { label: 'Últimos 30 dias', getRange: () => {
      const end = new Date().toISOString().split('T')[0];
      const start = new Date();
      start.setDate(start.getDate() - 29);
      return { start: start.toISOString().split('T')[0], end };
    }},
    { label: 'Este mês', getRange: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      const end = new Date().toISOString().split('T')[0];
      return { start, end };
    }},
    { label: 'Mês passado', getRange: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0];
      const end = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split('T')[0];
      return { start, end };
    }}
  ];
  
  const applyPredefinedRange = (range: { getRange: () => DateRange }) => {
    const { start, end } = range.getRange();
    setStartDate(start);
    setEndDate(end);
    setIsFilteringDate(true);
    setDatePickerVisible(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <History className="h-6 w-6 mr-3" />
              Histórico de Trades Originais
            </h2>
            <div className="flex items-center space-x-2">
              <div className="bg-white bg-opacity-20 rounded-lg p-1">
                <div className="flex rounded-md overflow-hidden">
                  <button 
                    onClick={() => setFilterStatus('all')} 
                    className={`px-3 py-1 text-sm font-medium ${filterStatus === 'all' ? 'bg-white text-blue-600' : 'text-white'}`}
                  >
                    Todos
                  </button>
                  <button 
                    onClick={() => setFilterStatus('open')} 
                    className={`px-3 py-1 text-sm font-medium ${filterStatus === 'open' ? 'bg-white text-blue-600' : 'text-white'}`}
                  >
                    Abertos
                  </button>
                  <button 
                    onClick={() => setFilterStatus('closed')} 
                    className={`px-3 py-1 text-sm font-medium ${filterStatus === 'closed' ? 'bg-white text-blue-600' : 'text-white'}`}
                  >
                    Fechados
                  </button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Rest of modal content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Tabs and filters */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <div className="flex space-x-4">
              <Button
                variant={activeTab === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveTab('all')}
                className="rounded-lg"
              >
                Todos os Trades
              </Button>
              <Button
                variant={activeTab === 'copies' ? 'default' : 'outline'}
                onClick={() => setActiveTab('copies')}
                className="rounded-lg"
              >
                Cópias e Multiplicadores
              </Button>
            </div>
            
            <div className="relative ml-auto">
              <Button
                variant="outline"
                onClick={() => setDatePickerVisible(!datePickerVisible)}
                className="flex items-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDateDisplay()}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
              
              {/* Date Picker Dropdown */}
              {datePickerVisible && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-64">
                  {/* Date picker content */}
                </div>
              )}
            </div>
          </div>
          
          {/* Filtered Trades Table/List */}
          {filteredTrades.length === 0 ? (
            <div className="text-center py-10">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-700">Nenhum trade encontrado</h3>
              <p className="text-gray-500 mt-1">
                Não há trades que correspondam aos filtros selecionados.
              </p>
              <Button
                variant="outline"
                onClick={clearDateFilter}
                className="mt-4"
              >
                Limpar Filtros
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {activeTab === 'all' && (
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b text-left bg-gray-50">
                      <th className="py-3 px-3 font-medium">Data/Hora</th>
                      <th className="py-3 px-3 font-medium">Instrumento</th>
                      <th className="py-3 px-3 font-medium">Direção</th>
                      <th className="py-3 px-3 font-medium">Qtd</th>
                      <th className="py-3 px-3 font-medium">Entrada</th>
                      <th className="py-3 px-3 font-medium">Saída</th>
                      <th className="py-3 px-3 font-medium">Lucro/Perda</th>
                      <th className="py-3 px-3 font-medium">Status</th>
                      <th className="py-3 px-3 font-medium">Cópias</th>
                      <th className="py-3 px-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Trade rows would go here */}
                  </tbody>
                </table>
              )}
              
              {activeTab === 'copies' && (
                <div className="space-y-6">
                  {/* Copies view would go here */}
                </div>
              )}
            </div>
          )}
          
          {/* Summary Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total de Trades</p>
              <p className="text-xl font-bold">{filteredTrades.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total P/L</p>
              <p className={`text-xl font-bold ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${totalProfitLoss.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Cópias com Erro</p>
              <p className="text-xl font-bold text-red-600">
                {totalFailedCopies}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};