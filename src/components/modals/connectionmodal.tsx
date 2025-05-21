import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import {
  ChevronLeft,
  ChevronDown,
  UserPlus,
  X,
  User,
  ExternalLink,
  Key,
  Link2,
  RefreshCw,
  Info,
  Lock
} from 'lucide-react';
import { Connection, Follower, Account } from '../../types';

interface ConnectionModalProps {
  onClose: () => void;
  accounts: Account[];
  onAddConnection: (connection: Connection) => void;
  onAddFollower: (follower: Follower) => void;
}

export const ConnectionModal: React.FC<ConnectionModalProps> = ({ 
  onClose, 
  accounts, 
  onAddConnection, 
  onAddFollower 
}) => {
  const [step, setStep] = useState(1);
  const [connectionType, setConnectionType] = useState('same');
  const [apiKey, setApiKey] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [multiplier, setMultiplier] = useState('1');
  const [isConnectingExternal, setIsConnectingExternal] = useState(false);
  const [externalAccounts, setExternalAccounts] = useState<string[]>([]);
  const [copyMode, setCopyMode] = useState('all');
  const [selectedExternalAccount, setSelectedExternalAccount] = useState('');
  
  const handleConnectExternal = async () => {
    setIsConnectingExternal(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockExternalAccounts = ['EXT_001', 'EXT_002', 'EXT_003'];
      setExternalAccounts(mockExternalAccounts);
      
      if (copyMode === 'all') {
        const newConnection: Connection = {
          id: Date.now(),
          type: 'external',
          username: 'USER_' + apiKey.slice(0, 6),
          accounts: mockExternalAccounts,
          multiplier: multiplier,
          active: true,
          copyMode: 'all',
          limitsEnabled: false,
          dailyLossLimit: "500",
          dailyProfitTarget: "1000",
          enforceLimits: true
        };
        onAddConnection(newConnection);
        onClose();
        setStep(1);
        setIsConnectingExternal(false);
      } else {
        setIsConnectingExternal(false);
        setStep(3);
      }
    }, 2000);
  };
  
  const handleAddSpecificExternalAccount = () => {
    const newConnection: Connection = {
      id: Date.now(),
      type: 'external',
      username: 'USER_' + apiKey.slice(0, 6),
      accounts: [selectedExternalAccount],
      multiplier: multiplier,
      active: true,
      copyMode: 'specific',
      limitsEnabled: false,
      dailyLossLimit: "500",
      dailyProfitTarget: "1000",
      enforceLimits: true
    };
    onAddConnection(newConnection);
    onClose();
    setStep(1);
  };
  
  const handleAddLocalFollower = () => {
    const newFollower: Follower = {
      id: Date.now(),
      type: 'local',
      account: selectedAccount,
      multiplier: multiplier,
      active: true,
      limitsEnabled: false,
      dailyLossLimit: "500",
      dailyProfitTarget: "1000",
      enforceLimits: true
    };
    onAddFollower(newFollower);
    onClose();
    setStep(1);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <UserPlus className="h-6 w-6 mr-3" />
              Adicionar Conta Seguidora
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onClose();
                setStep(1);
              }}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          {step === 1 ? (
            <>
              <p className="text-gray-600 mb-6">
                Escolha como você deseja conectar a conta seguidora:
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setConnectionType('same');
                    setStep(2);
                  }}
                  className="w-full p-4 border-2 rounded-lg hover:border-blue-500 transition-all group"
                >
                  <div className="flex items-start text-left">
                    <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-900">Subconta do Mesmo Login</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Use suas outras subcontas Tradovate do mesmo login
                      </p>
                    </div>
                    <ChevronDown className="h-5 w-5 text-gray-400 mt-3" />
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    setConnectionType('different');
                    setStep(2);
                  }}
                  className="w-full p-4 border-2 rounded-lg hover:border-purple-500 transition-all group"
                >
                  <div className="flex items-start text-left">
                    <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <ExternalLink className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-900">Login Tradovate Diferente</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Conecte contas de outros logins Tradovate usando API key
                      </p>
                    </div>
                    <ChevronDown className="h-5 w-5 text-gray-400 mt-3" />
                  </div>
                </button>
              </div>
              
              <div className="mt-6 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start">
                  <Lock className="h-5 w-5 text-amber-600 mt-0.5" />
                  <p className="ml-2 text-sm text-amber-800">
                    Suas conexões são criptografadas e seguras. Nunca compartilhe sua API key.
                  </p>
                </div>
              </div>
            </>
          ) : step === 2 ? (
            // Step 2 content: Local subaccount selection or API key input
            connectionType === 'same' ? (
              // Local subaccount selection UI
              <>
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Voltar
                </button>
                
                <h3 className="text-lg font-semibold mb-4">Configurar Subconta</h3>
                
                <div className="space-y-4">
                  {/* Account selection */}
                  <div>
                    <Label>Selecione a Subconta</Label>
                    <div className="relative mt-1">
                      <select
                        value={selectedAccount}
                        onChange={(e) => setSelectedAccount(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                      >
                        <option value="">Escolha uma conta...</option>
                        {accounts
                          .filter(acc => acc.type === 'sub')
                          .map((account) => (
                            <option key={account.id} value={account.id}>
                              {account.id}
                            </option>
                          ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  {/* Multiplier input */}
                  <div>
                    <Label>Multiplicador de Posição</Label>
                    <Input
                      type="number"
                      value={multiplier}
                      onChange={(e) => setMultiplier(e.target.value)}
                      step="0.1"
                      min="0.1"
                      max="10"
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Os trades serão multiplicados por este valor
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleAddLocalFollower}
                    disabled={!selectedAccount}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Adicionar Subconta
                  </Button>
                </div>
              </>
            ) : (
              // API key input UI
              <>
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Voltar
                </button>
                
                <h3 className="text-lg font-semibold mb-4">Conectar Login Externo</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label className="flex items-center">
                      <Key className="h-4 w-4 mr-2" />
                      API Key da Plataforma
                    </Label>
                    <Input
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Insira a API Key do outro usuário"
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      O outro usuário deve gerar esta key em suas configurações
                    </p>
                  </div>
                  
                  <div>
                    <Label>Multiplicador de Posição</Label>
                    <Input
                      type="number"
                      value={multiplier}
                      onChange={(e) => setMultiplier(e.target.value)}
                      step="0.1"
                      min="0.1"
                      max="10"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Contas a Copiar</Label>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="copyMode"
                          value="all"
                          checked={copyMode === 'all'}
                          onChange={(e) => setCopyMode(e.target.value)}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium">Todas as Contas</div>
                          <div className="text-sm text-gray-600">Copiar trades de todas as contas do login</div>
                        </div>
                      </label>
                      
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="copyMode"
                          value="specific"
                          checked={copyMode === 'specific'}
                          onChange={(e) => setCopyMode(e.target.value)}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium">Conta Específica</div>
                          <div className="text-sm text-gray-600">Escolher uma conta para copiar</div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      {copyMode === 'all' 
                        ? 'Ao conectar, todas as contas do outro login serão sincronizadas automaticamente e seguirão seus trades.'
                        : 'Você poderá escolher qual conta específica deseja copiar após a conexão.'
                      }
                    </AlertDescription>
                  </Alert>
                  
                  <Button
                    onClick={handleConnectExternal}
                    disabled={!apiKey || isConnectingExternal}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isConnectingExternal ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Conectando...
                      </>
                    ) : (
                      <>
                        <Link2 className="h-4 w-4 mr-2" />
                        Conectar Login Externo
                      </>
                    )}
                  </Button>
                </div>
              </>
            )
          ) : (
            // Step 3: Select specific external account
            <>
              <button
                onClick={() => setStep(2)}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Voltar
              </button>
              
              <h3 className="text-lg font-semibold mb-4">Selecionar Conta</h3>
              
              <div className="space-y-4">
                <div>
                  <Label>Contas Disponíveis</Label>
                  <div className="mt-2 space-y-2">
                    {externalAccounts.map((account) => (
                      <label 
                        key={account}
                        className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="radio"
                          name="externalAccount"
                          value={account}
                          checked={selectedExternalAccount === account}
                          onChange={(e) => setSelectedExternalAccount(e.target.value)}
                          className="mr-3"
                        />
                        <div className="font-medium">{account}</div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <Button
                  onClick={handleAddSpecificExternalAccount}
                  disabled={!selectedExternalAccount}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Adicionar Conta Selecionada
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};