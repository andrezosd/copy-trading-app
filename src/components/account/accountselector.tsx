import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, ChevronLeft, ChevronRight, ChevronDown, Calendar } from 'lucide-react';
import { Account } from '../../types';
import { formatCurrency, monthNames } from '../../utils/formatters';

interface AccountSelectorProps {
  accounts: Account[];
  selectedAccount: string;
  onSelectAccount: (accountId: string) => void;
  currentMonth: Date;
  onChangeMonth: (direction: number) => void;
  monthlyPL: number;
}

export const AccountSelector: React.FC<AccountSelectorProps> = ({
  accounts,
  selectedAccount,
  onSelectAccount,
  currentMonth,
  onChangeMonth,
  monthlyPL
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Calendar className="h-5 w-5 text-indigo-600" />
        <span>Resultados do Mês</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative mr-4">
          <select
            value={selectedAccount}
            onChange={(e) => onSelectAccount(e.target.value)}
            className="pr-8 pl-3 py-1 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          >
            <option value="all">Todas as Contas</option>
            {accounts.map(account => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChangeMonth(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChangeMonth(1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};